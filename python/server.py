import firebase_admin
from firebase_admin import credentials, db
import math

cred = credentials.Certificate("python/epidemic-portal-firebase-adminsdk-ub9xy-7228fbc046.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://epidemic-portal-default-rtdb.firebaseio.com/'
})

ref = db.reference('requests')

def listener(event):
    
    print("Database Updated")
    print(event.event_type)
    print(event.path)
    
    if event.path.find("/r-") != -1 and event.path.find("/response") == -1:
        print("Request Found")
        parseRequest(event.data, event.path)
        
def sanitize(data_list):
    return [x if (isinstance(x, float) and not (math.isnan(x) or math.isinf(x))) else None for x in data_list]

def parseRequest(requestData, fromPath):
    dataFromWeb = requestData['data']
    
    parsedData = {}
    parsedData['n'] = len(dataFromWeb['nodeArray'])
    
    parsedData['beta'] = [[0 for k in range(parsedData['n'])] for j in range(parsedData['n'])]
    
    betaValues = dataFromWeb['edgeParameters']['beta']
    
    
    for pointId in betaValues:
        nodeIndexes = pointId.split("-")
        node1 = int(nodeIndexes[0])
        node2 = int(nodeIndexes[1])
        parsedData['beta'][node1][node2] = betaValues[pointId]
        
    gammaValues = dataFromWeb['nodeParameters']['gamma']
    
    parsedData['gamma'] = gammaValues
    parsedData['startTime'] = dataFromWeb['startingTime']
    parsedData['endTime'] = dataFromWeb['endingTime']
    parsedData['percentageSusceptibleInStartingNode'] = dataFromWeb['percentageSusceptibleInStartingNode']
    
    parsedData['nodeList'] = dataFromWeb['nodeArray']
    parsedData['startingNode'] = dataFromWeb['nodeArray'].index(dataFromWeb['startingNode'])
    # print(parsedData)
    runModel(parsedData, writeBackToPath=fromPath)
    


# This notebook generates state trajectories for Networked Epidemic Processes
import numpy as np

class NetworkedEpi():
    # default number of nodes in process
    n = 2

    def __init__(self):
        self.options = NetworkedEpi.__options__(self.n)
        self.data = NetworkedEpi.__data__(self.n)

    class __options__():
        # default param generation specs
        beta_low = 0.04
        beta_rng = 0.06
        gamma_low = 0.03
        gamma_rng = 0.03

        def __init__(self, n):
            # Default initialization
            ## for non-pseudorandom parameters
            np.random.seed(0)

            ## infection rate adjacency matrix
            self.beta = self.beta_low \
                + np.random.rand(n,n)*self.beta_rng
            
            ## recovery rate vector
            self.gamma = self.gamma_low \
                + np.random.rand(n,)*self.gamma_rng
            
            ## timestep width
            self.h = 0.5

            ## epidemic type (TODO: implement this)
            # self.epi_type = 'SIR'

            ## default initial conditions
            self.origin = 0
            self.s_init = np.random.ranf()*0.1+0.4

    # class to store generated data
    class __data__():
        def __init__(self, n):
            self.n = n
            self.T_array = np.array([])
            self.I_array = None
            self.R_array = None

    def clear(self):
        self.data = NetworkedEpi.__data__(self.n)

    def generate(self, t0, tf):
        n = self.n
        beta = self.options.beta
        gamma = self.options.gamma
        h = self.options.h
        origin = self.options.origin

        # dimensions of gamma, beta, and the no. of nodes 
        # must make sense together. Here, the no. of nodes
        # will always take priority. beta and gamma are replaced
        # with correct dimensions.
        # TODO: retain beta and gamma values partially when n is changed
        try:
            assert beta.shape[0] == gamma.shape[0] == n
        except:
            print("Conflicting specifications, reinitializing.")
            self.options = NetworkedEpi.__options__(n)
            beta = self.options.beta
            gamma = self.options.gamma

        try:
            assert self.data.I_array.shape[0] == n
        except:
            self.data = NetworkedEpi.__data__(n)

        T = int((tf-t0)/h)

        # state data array (access format: timestep, node_ID, state)
        # where state may be {0: susceptible, 1: infected, 2: recovered}
        X = np.zeros((T, n, 3))
        if self.data.I_array is None:
            # all nodes initially fully susceptible
            X[0, :, 0] = 1
            # seeding infection at origin node
            X[0, origin, 0] = self.options.s_init
            X[0, origin, 1] = 1 - X[0, origin, 0]
        else:
            X[0, :, 1] = self.data.I_array[:, -1]
            X[0, :, 2] = self.data.R_array[:, -1]
            X[0, :, 0] = 1 - X[0, :, 1] - X[0, :, 2]

        # discrete dynamics: state propagation
        for k in range(T-1):
            for j in range(n):
                X[k+1, j, 0] = X[k, j, 0]\
                    - h * X[k, j, 0] * (np.sum([beta[j,i]*X[k, i, 1] \
                                                for i in range(n)]))

                X[k+1, j, 1] = X[k, j, 1]\
                    + h * (X[k, j, 0] * np.sum([beta[j,i]*X[k, i, 1] \
                            for i in range(n)])- gamma[j] * X[k, j, 1])
                                
                X[k+1, j, 2] = 1 - X[k+1, j, 0] - X[k+1, j, 1]

        # data storage
        self.data.T_array = np.hstack([self.data.T_array, \
                                       np.linspace(t0, tf, T)])
        if self.data.I_array is None:
            self.data.I_array = X[:,:,1].T
            self.data.R_array = X[:,:,2].T
        else:
            self.data.I_array = np.hstack([self.data.I_array, X[:,:,1].T])
            self.data.R_array = np.hstack([self.data.R_array, X[:,:,2].T])

        return X


def runModel(parsedData, writeBackToPath="/"):
    # Create epidemic object
    epi = NetworkedEpi()
    n = parsedData['n']

    # A bunch of parameters and the time they come into force
    beta = np.array(parsedData['beta'])
    gamma = np.array(parsedData['gamma'])

    t0 = int(parsedData['startTime'])
    tf = (parsedData['endTime'])

    # setting parameters
    epi.n = n
    epi.options.h = 0.5
    epi.options.beta = beta
    epi.options.gamma = gamma
    epi.options.origin = parsedData['startingNode']
    epi.options.s_init = parsedData['percentageSusceptibleInStartingNode']

    ## call epi.generate with start and end times to generate data.
    ## access generated data for this time window from the return value
    ## or access cumulative state trajectory via members of epi.data
    epi.generate(t0, tf)
    
    print(epi.data.T_array)
    print(1 - epi.data.I_array.T - epi.data.R_array.T)
    # print(epi.data.I_array.T)
    # print(epi.data.R_array.T)
    
    writeRef = db.reference("requests/" + writeBackToPath + "/response")

    # Writing data to the reference
    data = {
        'tArray': sanitize(epi.data.T_array.tolist()),
        'sArray': sanitize((1 - epi.data.I_array.T - epi.data.R_array.T).tolist())
    }
    
    writeRef.set(data)
    
    
    

# Add a listener to the database reference
ref.listen(listener)

# Keep the script running
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Terminating...")


