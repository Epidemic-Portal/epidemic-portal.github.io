# Basic Module

## Simulation Module API Request and Response Documentation

## Request Details

When the simulation is initiated, the following data is structured and sent to the backend server:

### Parameters

- **model**: Specifies the epidemic model to be used (e.g., "SIR Model").
- **startingTime**: The beginning time step of the simulation (default is 1).
- **endingTime**: The ending time step of the simulation (default is 40).
- **percentageSusceptibleInStartingNode**: The percentage of the population that is susceptible at the start in the designated node.
- **startingNode**: Identifier for the node where the simulation starts.
- **nodeArray**: An array containing identifiers of all nodes in the simulation graph.
- **nodeParameters**: Object containing arrays of node-specific parameters grouped by parameter name.
- **edgeParameters**: Object containing edge-specific parameters stored in a structure that maps node pairs to their interaction parameters.
- **requestID**: A unique identifier for the request generated to track the request and handle responses.

### Sending Method

The data is sent via a POST request to the server endpoint. The endpoint URL and required request headers are as follows:

- **Endpoint**: `https://prajwalsouza.pythonanywhere.com/calculate`
- **Content-Type**: `application/json`

The body of the request is a JSON object containing all the parameters listed above.

## Response Handling

Responses from the server are expected in JSON format. The response contains results from the simulation which are then used to update the simulation states and plot data.

### Expected JSON Structure

The JSON response typically contains arrays representing different epidemiological states (e.g., Susceptible, Infected, Recovered) over time:

- **iArray**: Array of infection counts over time.
- **sArray**: Array of susceptible counts over time.
- **rArray**: Array of recovered counts over time.
- **eArray**: Array of exposed counts over time (if applicable).
- **tArray**: Array of time steps.


# Workflows


## Testing Parameters

- **requestID**: Unique identifier for the request, used to track and handle responses.
- **userDetails**: User-specific details, fetched by calling `getUserDetails()`.
- **policyChosen**: The testing policy selected for the simulation.
- **numberOfTests**: The total number of tests to be conducted.
- **testDistribution**: The distribution strategy of tests among the nodes.
- **specificity**: The specificity of the tests used.
- **startingTime**: Inherits from the main simulation configuration.
- **endingTime**: Inherits from the main simulation configuration.
- **nodeArray**: Inherits the node identifiers from the main simulation setup.
- **nodeParameters**: Inherits node-specific parameters from the main simulation setup.
- **edgeParameters**: Inherits edge-specific parameters from the main simulation setup.
- **model**: Inherits the epidemic model used in the main simulation.
-**Arrays**: 
- **iArray**: Array of infection counts over time.
- **sArray**: Array of susceptible counts over time.
- **rArray**: Array of recovered counts over time.
- **eArray**: Array of exposed counts over time (if applicable).
- **tArray**: Array of time steps.