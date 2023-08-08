var app = angular.module('myApp', ['ngRoute'])

app.config(['$routeProvider','$sceProvider', '$locationProvider', function($routeProvider, $sceProvider, $locationProvider) {
    $routeProvider.
        when('/:param1', {
            templateUrl: function(urlParams) {
                if (urlParams.param1 == 'dash') {
                    return 'views/dash.html';
                }
            }
        }).
        when('/:param1/:param2', {
            templateUrl: function(urlParams) {
                if (urlParams.param1 == 'dash') {
                    return 'views/dash.html';
                }
                else {
                    return 'views/dash.html';
                }
            }
        }).
        when('/', {
            templateUrl: function(urlParams) {
                return 'views/dash.html';
            }
        }).
        otherwise({
            redirectTo: '/'
        });
        // $sceProvider.enabled(false);
        // $locationProvider.html5Mode(true);
    }]);
    


app.controller('theMainController', ['$scope','$routeParams', '$timeout', '$interval', function($scope, $routeParams, $timeout, $interval) {








    // A lot of interesting and useful functions 

    $scope.isNaN = function(value) {
        return isNaN(value);
    }

    $scope.substring = function(stringX, a, b) {
        return stringX.substring(a, b);
    }

    $scope.stringLength = function(stringX) {
        return stringX.length;
    }

    $scope.length = function(obj) {
        if (typeof obj == 'object' && obj !== null) {
            return Object.keys(obj).length;
        }
        else {
            return obj.length;
        }
    }

    $scope.parseInt = function(somevalue) {
        return parseInt(somevalue)
    }

    $scope.uniqueCodeGen = function() {
        sevenZBit = 78364164096;
        randomString = sevenZBit + parseInt(Math.random() * sevenZBit * 35)
        dateStringGen = new Date().getTime().toString(36)
        return (dateStringGen + "-" + randomString.toString(36))
    }

    $scope.filterURL = function(url) {
        // return url.split('/#!')[1]
        return url
    }

    $scope.serverTime = 0;

    $scope.getServerTime = function() {
        $scope.serverTime = Date.parse($.ajax({async: false}).getResponseHeader('Date'));
    }

    $scope.getLocalTime = function() {
        $scope.localTime = new Date().getTime();
    }

    $scope.runningCurrentTimeInterval = false;
    $scope.recordCurrentTimeEverySecond = function() {
        if ($scope.runningCurrentTimeInterval == false) {
            $interval($scope.findCurrentTime, 999)
            $scope.runningCurrentTimeInterval = true;
        }
        
        
    }

    $scope.linearValue = function(value, valuesAreBetween=[0, 1], needValuesBetween=[0, 100]) {
        if (valuesAreBetween[1] - valuesAreBetween[0] > 0) {
            return ((value - valuesAreBetween[0])*(needValuesBetween[1] - needValuesBetween[0])/(valuesAreBetween[1] - valuesAreBetween[0])) + needValuesBetween[0]
        }
        else {
            return (needValuesBetween[1] + needValuesBetween[0])/2
        }
       
        
        
    }


    $scope.timeFindingCount = 0;
    $scope.findCurrentTime = function() {
        // console.clear()
        $scope.getLocalTime();
        if ($scope.timeFindingCount % 120 == 0) {
            $scope.getServerTime();
            $scope.localServerTimeDifference = $scope.localTime - $scope.serverTime;
        }
        $scope.timeFindingCount = $scope.timeFindingCount + 1
        $scope.currentTime = $scope.localTime - $scope.localServerTimeDifference
    }


    $scope.msToString = function(ms) {
        seconds = ms/1000
        minutes = seconds/60
        hours = minutes/60
        days = hours/24

        dayString = ''
        if (days > 0) {
           daysValue = parseInt(days)
           dayString = (daysValue == 1 ? '1 day': (daysValue == 0 ? '': daysValue + ' days'))
        }
        hourString = ''
        if (hours > 0) {
            hoursValue = parseInt(hours) - (24*parseInt(days))
            hourString = (hoursValue == 1 ? '1 hour': (hoursValue == 0 ? '': hoursValue + ' hours'))
        }
        minuteString = ''
        if (minutes > 0) {
            minutesValue = parseInt(minutes) - (60*parseInt(hours))
            minuteString = (minutesValue == 1 ? '1 minute': (minutesValue == 0 ? '': minutesValue + ' minutes'))
        }
        secondString = ''
        if (seconds > 0) {
            secondsValue = parseInt(seconds) - (60*parseInt(minutes))
            secondString = (secondsValue == 1 ? '1 second': (secondsValue == 0 ? '': secondsValue + ' seconds'))
        }

        finalString = (dayString == '' ? '': dayString +  ", ")
        finalString = finalString + (hourString == '' ? '': hourString +  ", ")
        finalString = finalString + (minuteString == '' ? '': minuteString +  ", ")
        finalString = finalString + (secondString == '' ? '': secondString +  ", ")

        finalString = finalString.substring(0, finalString.length - 2)
        if (ms == 0) {
            finalString = '0 sec'
        }
        return finalString;
    }

    $scope.secondsToDate = function(date) {
        return new Date(date)
    }

    $scope.twentyFourToTwelveString = function(date) {
        if (date != 'Invalid Date') {
            if (date.getHours() < 12) {
                meridian = 'am'
            }
            else {
                meridian = 'pm'
            }
            if (date.getMinutes() >= 10) {
                min = date.getMinutes()
            }
            else {
                min = '0' + date.getMinutes()
            }
            if (date.getHours() >= 1 && date.getHours() < 13) {
                hr = date.getHours()
            }
            else if (date.getHours() == 0) {
                hr =12
            }
            else if (date.getHours() >= 13) {
                hr = date.getHours() - 12
            }
            return hr + "." +  min + " " + meridian
        }
       
    }

    $scope.secondsToDateString = function(date) {
        d = new Date(date)
        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
        
        return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " at " + $scope.twentyFourToTwelveString(d) 
        // return $filter('date')(Date.parse(d), 'EEE, MMM dd, yyyy') + ' at ' + $filter('date')(Date.parse(d), 'h.mm a')
    }

    $scope.secondsToDateStringLocal = function(date) {
        d = new Date(date)
        return d.toLocaleString()
    }


    $scope.secondsFromToDateString = function(theStartDate, theEndDate) {
        theEndDate = new Date(theEndDate)
        theStartDate = new Date(theStartDate)
        if (theStartDate != null && theEndDate != null) {
            
            var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

            if (theStartDate.getDate() + "-" + theStartDate.getMonth() + "-" + theStartDate.getFullYear() == theEndDate.getDate() + "-" + theEndDate.getMonth() + "-" + theEndDate.getFullYear()) {
                return "On " + days[theStartDate.getDay()] + ", " + months[theStartDate.getMonth()] + " " + theStartDate.getDate() + ", " + theStartDate.getFullYear() + " from " + $scope.twentyFourToTwelveString(theStartDate) + " to " + $scope.twentyFourToTwelveString(theEndDate)
                // return 'on ' + $filter('date')(Date.parse(theStartDate), 'EEE, MMM dd, yyyy') + ' from ' + $filter('date')(Date.parse(theStartDate), 'h.mm a') + ' to ' + $filter('date')(Date.parse(theEndDate), 'h.mm a.')
            } else {
                return "From " + $scope.twentyFourToTwelveString(theStartDate) + ", " + days[theStartDate.getDay()] + ", " + months[theStartDate.getMonth()] + " " + theStartDate.getDate() + ", " + theStartDate.getFullYear() + " to " + $scope.twentyFourToTwelveString(theEndDate) + ", " + days[theEndDate.getDay()] + ", " + months[theEndDate.getMonth()] + " " + theEndDate.getDate() + ", " + theEndDate.getFullYear()
                // return 'from ' + $filter('date')(Date.parse(theStartDate), 'h.mm a, EEE, MMM dd, yyyy') + ' to ' + $filter('date')(Date.parse(theEndDate), 'h.mm a, EEE, MMM dd, yyyy')
            }
        }

    }

    $scope.convertHHMMSStoString = function(hhmmss) {
        // console.log(hhmmss)
        sec = (parseInt(hhmmss.split(':')[0])*60 + parseInt(hhmmss.split(':')[1]))*60 + parseInt(hhmmss.split(':')[2])
        return $scope.msToString(sec*1000);
    }

    $scope.convertHHMMSStoSeconds = function(hhmmss) {
        // console.log(hhmmss)
        sec = (parseInt(hhmmss.split(':')[0])*60 + parseInt(hhmmss.split(':')[1]))*60 + parseInt(hhmmss.split(':')[2])
        return sec;
    }

    $scope.convertSecondstoHHMMSS = function(seconds) {
        // console.log(hhmmss)
        ss = seconds % 60;
        minutes = (seconds - ss)/60;
        mm = minutes % 60;
        hh = (minutes - mm)/60;
        return hh + ":" + mm + ":" + ss;
    }

    $scope.runFunctionByName = function(functionName, args) {
        var parts = functionName.split('.');
        var context = $scope;
    
        for (var i = 0; i < parts.length - 1; i++) {
            context = context[parts[i]];
        }
    
        return context[parts[parts.length - 1]].apply(context, args);
    };

    // https://stackoverflow.com/a/44932690

    $scope.insertAndShiftInArray = function(arr, from, to) {
        let cutOut = arr.splice(from, 1)[0];
        arr.splice(to, 0, cutOut);
    }

    $scope.visit = function (url) {
        window.open(url,'_self')
    }

    $scope.visitWithTarget = function (url, target) {
        window.open(url,target)
    }

    $scope.visitInternally = function(url) {
        $location.path(url);
    }


    



    
    $scope.appName = "Epidemic Portal";



    $scope.urlParameters = {}


    $scope.view = function() {
        $scope.urlParameters[1] = $routeParams.param1
        $scope.urlParameters[2] = $routeParams.param2

        // if ($routeParams.param1 == 'task' && $routeParams.param2 !== undefined) {
        //     $scope.loadApp();
        // }

        $scope.loadApp();
        // console.log($scope.urlParameters)
    }


    $scope.loadApp = function() {

        $scope.text = {
            heading: "Epidemic Simulation",
            subheading: "By IITK and Purdue University, and some more information that good if it's two lines.",
    
        }
        
        $scope.networkGraph.nodesAdded = 0
        $scope.networkGraph.nodeOptionsMenu = {}
        $scope.networkGraph.nodeOptionsMenu.top = -1000
        $scope.networkGraph.nodeOptionsMenu.left = -1000

        $scope.networkGraph.edge.optionMenu = {
            top: -1000,
            left: -1000
        }
        

        


        $scope.networkGraph.addGraph()


        $scope.networkGraph.edge.editContext()

        $scope.networkGraph.edge.loopRadius = 0.1

        $scope.networkGraph.additionMenu = {};
        $scope.networkGraph.additionMenu.available = false;
        $scope.networkGraph.additionMenu.options = {
            "addNode": {
                "name": "Add Node",
                "menuFunction": function() {
                    $scope.networkGraph.addNode();
                },
                "icon": "circle"
            },
            "addEdge": {
                "name": "Add an Edge",
                "menuFunction": function() {
                    $scope.networkGraph.edge.startEditContext();
                },
                "icon": "arrow-up"
            }
        }

        $scope.networkGraph.generateStylesForNodeEdgeSliders()

        $scope.networkGraph.additionMenu.hoveringMenu = ""

        $scope.networkGraph.edge.highlighted = ""

        $scope.networkGraph.nodes = {}
        $scope.networkGraph.edge.edges = {}

        $scope.networkGraph.configurations.random()

        // $scope.networkGraph.selectedNode = ""

        recentNode = $scope.networkGraph.selectedNode
        $scope.networkGraph.unselectNode($scope.networkGraph.selectedNode)
        $scope.networkGraph.selectNode(recentNode)

    }

    $scope.networkGraph = {}

    $scope.networkGraph.addGraph = function() {
        graphH = document.getElementById('main-graph-holder')
        viewX.addGraph(graphH, "main-graph", epidemicApp.defaultGraphOptions)


        viewX.addCircle("main-graph", "highlightNodeRing1", {x: 1, y: 1, radius: 0.042, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 0.1)" : "hsla(var(--themeColorHue), 100%, 45%, 0.1)")})
        viewX.addCircle("main-graph", "highlightNodeRing2", {x: 1, y: 1, radius: 0.055, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 0.1)" : "hsla(var(--themeColorHue), 100%, 45%, 0.1)")})
    }


    $scope.networkGraph.removeGraph = function() {
        viewX.removeGraph("main-graph")
    }


    $scope.networkGraph.toggleAddMenu = function() {
        if ($scope.networkGraph.additionMenu.available) {
            $scope.networkGraph.additionMenu.available = false;
        }
        else {
            $scope.networkGraph.additionMenu.available = true;

        }
    }

    $scope.networkGraph.nodeParameters = {
        "recoveryRate": {
            default: 0.25,
            min: 0,
            max: 1,
            step: 0.01,
            name: "Recovery Rate",
            description: "The rate at which the node recovers from the disease",
            internalName: "gamma"
        }
    }

    $scope.networkGraph.edgeParameters = {
        "betaParameter": {
            default: 0.75,
            min: 0,
            max: 1,
            step: 0.01,
            name: "Infection Rate",
            description: "Infection rate in the node where the edge begins, due to the infected population in the node where the edge ends (arrow points to)",
            internalName: "beta"
        }
    }

    $scope.networkGraph.parameterDisplayedOnNode = "recoveryRate"


    $scope.networkGraph.parameterRandom = function(from='node', parameter='recoveryRate') {
        if (from == 'node') {
            return viewX.linearValue(0, 1, $scope.networkGraph.nodeParameters[parameter].min, $scope.networkGraph.nodeParameters[parameter].max, Math.random())
        }
        else {
            viewX.linearValue(0, 1, $scope.networkGraph.edgeParameters[parameter].min, $scope.networkGraph.edgeParameters[parameter].max, Math.random())
        }
    }

    
    $scope.networkGraph.generateStylesForNodeEdgeSliders = function() {
        for (var key in $scope.networkGraph.nodeParameters) {
            var sliderProperties = {
                minwidth: '200px',
                width: '50%',
                height: 5,
                trackColor: "hsla(280, 0%, 20%, 0.7)",
                trackFillColor: "hsla(var(--themeColorHue), 100%, 70%, 1)",
                thumbWidth: 15,
                thumbHeight: 15,
                thumbColor: "hsla(var(--themeColorHue), 100%, 70%, 1)",
                opacity: 0.7
            };

            viewX.generateSliderStyles(sliderProperties, "node-slider-" + key);
        }

        for (var key in $scope.networkGraph.edgeParameters) {
            var sliderProperties = {
                minwidth: '200px',
                width: '50%',
                height: 5,
                trackColor: "hsla(280, 0%, 20%, 0.7)",
                trackFillColor: "hsla(var(--themeColorHue), 100%, 70%, 1)",
                thumbWidth: 15,
                thumbHeight: 15,
                thumbColor: "hsla(var(--themeColorHue), 100%, 70%, 1)",
                opacity: 0.7
            };

            viewX.generateSliderStyles(sliderProperties, "edge-slider-" + key);
        }

    }

    
    $scope.networkGraph.clear = function() {

        for (nodeID in $scope.networkGraph.nodes) {
            node = $scope.networkGraph.nodes[nodeID]
            viewX.removeCircle("main-graph", "node-" + nodeID)
        }

        for (edgeID in $scope.networkGraph.edge.edges) {
            if ($scope.networkGraph.edge.edges[edgeID].from != $scope.networkGraph.edge.edges[edgeID].to) {
                viewX.removeArrow("main-graph", "edgeArrow-" + edgeID)
                viewX.removeLine("main-graph", "edgeLine-" + edgeID)
                
            }
            else {
                viewX.removeCircle("main-graph", "edgeLine-" + edgeID)
                viewX.removeArrow("main-graph", "edgeArrow-" + edgeID)
            }
        }
    }

    $scope.networkGraph.render = function() {
        $scope.networkGraph.clear()
        $scope.networkGraph.uncleanRender()
    }

    $scope.networkGraph.uncleanRender = function() {
        
        for (edgeID in $scope.networkGraph.edge.edges) {

            if ($scope.networkGraph.edge.edges[edgeID].from != $scope.networkGraph.edge.edges[edgeID].to) {
                firstNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].from]
                secondNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].to]


                midPoint = viewX.scalarMultiplyVec(0.5, viewX.addVec([firstNode.x, firstNode.y], [secondNode.x, secondNode.y]))
                edgeArrowOptions = {from: [firstNode.x, firstNode.y], to: midPoint, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 0.5}
                viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)

                edgeLineOptions = {x1: firstNode.x, y1: firstNode.y, x2: secondNode.x, y2: secondNode.y,linecolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 3}
                lineAdded = viewX.addLine("main-graph", "edgeLine-" + edgeID, edgeLineOptions)

                lineAdded[0].style.cursor = "pointer"
                lineAdded[0].style.pointerEvents = "auto"
            }
            else {
                nodeFromTo = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].from]

                loopDirection = $scope.networkGraph.edge.loopCreationDirection($scope.networkGraph.edge.edges[edgeID].from)

                constructionValues = $scope.networkGraph.edge.loopCreation([nodeFromTo.x, nodeFromTo.y], loopDirection)

                
                $scope.networkGraph.edge.edges[edgeID].loopDirection = loopDirection
                $scope.networkGraph.edge.edges[edgeID].loopConstructionValues = constructionValues

                edgeCircleOptions = {x: constructionValues.center[0], y: constructionValues.center[1], radius: $scope.networkGraph.edge.loopRadius, stroke: "hsla(var(--themeColorHue), 30%, 40%, 1)", circlecolor: "transparent", strokewidth: 3}
                
                circleAdded = viewX.addCircle("main-graph", "edgeLine-" + edgeID, edgeCircleOptions)
                circleAdded[0].style.cursor = "pointer"
                circleAdded[0].style.pointerEvents = "auto"

                edgeArrowOptions = {from: constructionValues.arrowLocation , to: constructionValues.arrowTo, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 0.5}
                viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)
                
                // viewX.addLine("main-graph", "edgeLine-" + edgeID, edgeLineOptions)
            }
        }

        for (nodeID in $scope.networkGraph.nodes) {
            node = $scope.networkGraph.nodes[nodeID]
            saturationForNode = $scope.networkGraph.nodeColoring()
            nodeOptions = {x: node.x, y: node.y, radius: 0.03, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), " + saturationForNode + "%, 70%, 1)" : "hsla(var(--themeColorHue), " + saturationForNode + "%, 45%, 1)")}
            viewX.addCircle("main-graph", "node-" + node.id, nodeOptions)
        }


    }
    











    $scope.networkGraph.addNode = function(nodeDetails=null) {
        node = {}
        node.id = $scope.uniqueCodeGen()

        if (nodeDetails == null) {
            nodeDetails = {}
        }

        node.x = (nodeDetails.x == null ?  Math.random() : nodeDetails.x)
        node.y = (nodeDetails.y == null ?Math.random() : nodeDetails.y)

        node.name = (nodeDetails.name == null ?  "Node " + $scope.networkGraph.nodesAdded : nodeDetails.name)
        node.editableName = (nodeDetails.editableName == null ?  "Gotham City "  + $scope.networkGraph.nodesAdded : nodeDetails.editableName)

        node.displayInfo = (nodeDetails.displayInfo == null ?  "A Node in the graph" : nodeDetails.displayInfo)
        
        
        if (nodeDetails.edges == null) {
            nodeDetails.edges = {leaving: {}, arriving: {}}
        }

        node.edges = nodeDetails.edges
        node.edges.leaving = (nodeDetails.edges.leaving == null ?  {} : nodeDetails.edges.leaving)
        node.edges.arriving = (nodeDetails.edges.arriving == null ?  {} : nodeDetails.edges.arriving)

        if (nodeDetails.parameters == null) {
            nodeDetails.parameters = {}
        }

        node.parameters = nodeDetails.parameters

        node.editing = {}
        node.editing.name = false

        for (parameter in $scope.networkGraph.nodeParameters) {
            node.parameters[parameter] = (nodeDetails.parameters[parameter] == null ?  {} : nodeDetails.parameters[parameter])
            node.parameters[parameter].value = (nodeDetails.parameters[parameter].value == null ?  $scope.networkGraph.nodeParameters[parameter].default : nodeDetails.parameters[parameter].value)
            node.parameters[parameter].editing = false
        }

        knobOptions = {x: node.x, y:node.y, pointcolor: 'transparent', pointsize: 2, draggability: "yes", runFunctionDuringDrag: 'epidemicApp.networkGraph.nodeMove()'}
        viewX.addPoint("main-graph", "node-moving-knob-" + node.id, knobOptions)

        $scope.networkGraph.nodes[node.id] = node

        $scope.networkGraph.nodesAdded = $scope.networkGraph.nodesAdded + 1

        $scope.networkGraph.render()

        $scope.networkGraph.selectNode(node.id)

        
        return node.id

    }

    $scope.networkGraph.nodeColoring = function() {
        saturationForNode = 100

        if ($scope.networkGraph.parameterDisplayedOnNode != null) {
            variation = viewX.linearValue($scope.networkGraph.nodeParameters[$scope.networkGraph.parameterDisplayedOnNode].min , $scope.networkGraph.nodeParameters[$scope.networkGraph.parameterDisplayedOnNode].max, 0, 1, node.parameters[$scope.networkGraph.parameterDisplayedOnNode].value)

            if (variation > 0.7) {
                saturationForNode = 100
            }
            else {
                saturationForNode = viewX.linearValue(0, 0.7, 10, 100, variation)
            }
        }

        return saturationForNode
    }

    $scope.networkGraph.selectNode = function(nodeID) {
        if ($scope.networkGraph.edge.editContextStarted == false) {
            $scope.networkGraph.selectedNode = nodeID
            node = $scope.networkGraph.nodes[nodeID]
            viewX.updateCircle("main-graph", "node-" + node.id, {circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 1)" : "hsla(var(--themeColorHue), 100%, 45%, 1)")})

            viewX.updateCircle("main-graph", "highlightNodeRing1", {x: node.x, y: node.y})
            viewX.updateCircle("main-graph", "highlightNodeRing2", {x: node.x, y: node.y})
            
            circleBoundingRect = viewX.graphData["main-graph"].circleData["highlightNodeRing2"][0].getBoundingClientRect()
            if (circleBoundingRect.left + circleBoundingRect.width + 20 < window.innerWidth - 350) {
                $scope.networkGraph.nodeOptionsMenu.left = circleBoundingRect.left + circleBoundingRect.width + 20
            }
            else {
                $scope.networkGraph.nodeOptionsMenu.left = circleBoundingRect.left - 300 - 40
            }

            if (document.getElementById("node-property-menu") != null) {
                if (circleBoundingRect.top + document.getElementById("node-property-menu").getBoundingClientRect().height + 20 < window.innerHeight) {
                    $scope.networkGraph.nodeOptionsMenu.top = circleBoundingRect.top
                }
                else {
                    $scope.networkGraph.nodeOptionsMenu.top = window.innerHeight - document.getElementById("node-property-menu").getBoundingClientRect().height - 20
                }
            }
            else {
                $scope.networkGraph.nodeOptionsMenu.top = circleBoundingRect.top 
            }

            // Count Edges Leaving, Arriving and Loops

            counts = {
                leaving: 0,
                arriving: 0,
                loops: 0
            }

            for (nodeID in node.edges.leaving) {
                edgeID = node.edges.leaving[nodeID]
                edgeInfo = $scope.networkGraph.edge.edges[edgeID]
                if (edgeInfo.from == edgeInfo.to && edgeInfo.from == nodeID) {
                    counts.loops = counts.loops + 1
                }
                else {
                    counts.leaving = counts.leaving + 1
                }
            }

            for (edgeID in node.edges.arriving) {
                counts.arriving = counts.arriving + 1
            }

            counts.arriving = counts.arriving - counts.loops


            $scope.networkGraph.nodes[nodeID].displayInfo = "It has " + counts.leaving + " edge" + (counts.leaving == 1 ? "": "s") + " leaving, " + counts.arriving + " edge" + (counts.arriving == 1 ? "": "s") + " arriving and " + counts.loops + " loop" + (counts.loops == 1 ? "": "s") + "."
        }

        
        
    }

    $scope.networkGraph.unselectNode = function(nodeID) {
        node = $scope.networkGraph.nodes[nodeID]
        $scope.networkGraph.selectedNode = ""

        saturationForNode = $scope.networkGraph.nodeColoring()
        viewX.updateCircle("main-graph", "node-" + node.id, {circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), " + saturationForNode + "%, 70%, 1)" : "hsla(var(--themeColorHue), " + saturationForNode + "%, 45%, 1)")})

        viewX.updateCircle("main-graph", "highlightNodeRing1", {x: -5, y: -5})
        viewX.updateCircle("main-graph", "highlightNodeRing2", {x: -5, y: -5})
    }

    $scope.networkGraph.changingNodeParameter = function() {
        node = $scope.networkGraph.nodes[$scope.networkGraph.selectedNode]

        $scope.networkGraph.render()
    }

    $scope.networkGraph.removeNode = function(nodeID) {
        $scope.networkGraph.unselectNode(nodeID)

        $scope.networkGraph.clear()

        for (edgeID in $scope.networkGraph.edge.edges) {
            if ($scope.networkGraph.edge.edges[edgeID].from == nodeID || $scope.networkGraph.edge.edges[edgeID].to == nodeID) {
                $scope.networkGraph.edge.removeEdgeWithoutRender(edgeID)
            }
        }


        if (typeof $scope.networkGraph.nodes[nodeID] == 'object' && $scope.networkGraph.nodes[nodeID] !== null) {
            delete $scope.networkGraph.nodes[nodeID]
            viewX.removePoint("main-graph", "node-moving-knob-" + nodeID)
        }

        $scope.networkGraph.render()

        

    }



    
    $scope.networkGraph.edge = {}

    

    $scope.networkGraph.edge.editContext = function() {
        $scope.networkGraph.edge.editContextStarted = false
        $scope.networkGraph.edge.edgeFirstPointSelected = ""
        viewX.addCircle("main-graph", "edgeFirstPointSelected", {x: -1, y: -1, radius: 0.05, stroke: "white", circlecolor: "transparent", strokedasharray: [5, 5], strokewidth: 2})

        viewX.addArrow("main-graph", "addingEdgeArrow", {from: [-10, -10], to: [-20, -20], stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), 100%, 80%, 0.4)", strokewidth: 1})

        edgeCircleOptions = {x: -10, y: -10, radius: 0.1, stroke: "hsla(var(--themeColorHue), 30%, 60%, 1)", circlecolor: "transparent", strokewidth: 3}
        viewX.addCircle("main-graph", "addingEdgeLoop", edgeCircleOptions)

        // viewX.addArrow("main-graph", "highlightEdgeArrow", {from: [-10, -10], to: [-20, -20], stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), 100%, 80%, 0.9)", strokewidth: 0.6})

        // viewX.addCircle("main-graph", "highlightEdgeCircle", {x: -10, y: -10, radius: 0.1, stroke: "hsla(var(--themeColorHue), 30%, 60%, 1)", circlecolor: "transparent", strokewidth: 3})

    }

    $scope.networkGraph.edge.startEditContext = function() {
        $scope.networkGraph.escapeEvent()

        $scope.text.heading = "Select the first node"
        $scope.text.subheading = "The node you select is where the edge will begin from"
        $scope.networkGraph.edge.edgeFirstPointSelected = ""
        $scope.networkGraph.edge.edgeSecondPointSelected = ""
        $scope.networkGraph.edge.editContextStarted = true
        
    }


    $scope.networkGraph.edge.endEditContext = function() {
        
        $scope.networkGraph.edge.editContextStarted = false
        viewX.updateCircle("main-graph", "edgeFirstPointSelected", {x: -5, y: -5})
        viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [-10, -10], to: [-20, -20]})
        viewX.updateCircle("main-graph", "addingEdgeLoop", {x: -10, y: -10, radius: 0.1})
        $scope.networkGraph.render()
    }

    $scope.networkGraph.edge.updateEditContext = function() {
        
        if ($scope.networkGraph.edge.edgeFirstPointSelected == "" && $scope.networkGraph.edge.edgeSecondPointSelected == "") {
            $scope.text.heading = "Select the first node"
            $scope.text.subheading = "The node you select is where the edge will begin from"

            viewX.updateCircle("main-graph", "edgeFirstPointSelected", {x: -5, y: -5})
            viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [-10, -10], to: [-20, -20]})
            viewX.updateCircle("main-graph", "addingEdgeLoop", {x: -10, y: -10, radius: 0.1})
        }
        else if ($scope.networkGraph.edge.edgeFirstPointSelected != "" && $scope.networkGraph.edge.edgeSecondPointSelected == "") {
            $scope.text.heading = "Select the second node"
            $scope.text.subheading = "The node you select is where the edge will end"

            viewX.updateCircle("main-graph", "edgeFirstPointSelected", {x: $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, y: $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y})

            viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y], to: [$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x + 0.2, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y + 0.2]})

        }
        else if ($scope.networkGraph.edge.edgeFirstPointSelected != "" && $scope.networkGraph.edge.edgeSecondPointSelected != "") {
            
            // console.log("g")
            $scope.networkGraph.escapeEvent()
        }

        
    }

    $scope.networkGraph.edge.selectNodeForEdgeCreation = function(nodeID) {
        if ($scope.networkGraph.edge.edgeFirstPointSelected == "") {
            $scope.networkGraph.edge.edgeFirstPointSelected = nodeID
            $scope.networkGraph.edge.updateEditContext()
        }
        else {
            $scope.networkGraph.edge.edgeSecondPointSelected = nodeID
            $scope.networkGraph.edge.addEdge($scope.networkGraph.edge.edgeFirstPointSelected, $scope.networkGraph.edge.edgeSecondPointSelected)

            $scope.networkGraph.edge.updateEditContext()
        }
    }


    $scope.networkGraph.edge.addEdge = function(fromNode, toNode) {
        edgeID = "from#" + fromNode + "to#" + toNode
        reverseEdgeID = "from#" + toNode  + "to#" + fromNode
        if ($scope.networkGraph.edge.edges[edgeID] == undefined && $scope.networkGraph.edge.edges[reverseEdgeID] == undefined) {
            $scope.networkGraph.edge.edges[edgeID] = {
                from: fromNode,
                to: toNode
            }
            $scope.networkGraph.edge.edges[edgeID].displayInfo = "An edge in the graph"

            $scope.networkGraph.edge.edges[edgeID].parameters = {}
            for (parameter in $scope.networkGraph.edgeParameters) {
                $scope.networkGraph.edge.edges[edgeID].parameters[parameter] = {}
                $scope.networkGraph.edge.edges[edgeID].parameters[parameter].value = $scope.networkGraph.edgeParameters[parameter].default
                $scope.networkGraph.edge.edges[edgeID].parameters[parameter].editing = false
            }

            $scope.networkGraph.nodes[fromNode].edges.leaving[toNode] = edgeID
            $scope.networkGraph.nodes[toNode].edges.arriving[fromNode] = edgeID
            $scope.networkGraph.render()
        }

        
    }


    // $scope.networkGraph.edge.editContentAnimation = function() {
    //     viewX.updateCircle("main-graph", "edgeFirstPointSelected", {strokedasharray: []})
    // }

    


    $scope.networkGraph.edge.loopCreation = function(loopAt, vectorPointingDirection) {
        unitDirectionVector = viewX.unitVec(vectorPointingDirection)
        
        arrowLocation = viewX.addVec(loopAt, viewX.scalarMultiplyVec(2*$scope.networkGraph.edge.loopRadius, unitDirectionVector))
        circleCenter = viewX.addVec(loopAt, viewX.scalarMultiplyVec($scope.networkGraph.edge.loopRadius, unitDirectionVector))
        arrowTo = viewX.addVec(arrowLocation, viewX.scalarMultiplyVec(0.01, viewX.rotatedVec( unitDirectionVector, 90)))

        return {
            center: circleCenter,
            arrowLocation: arrowLocation,
            arrowTo: arrowTo
        }
    }

    $scope.networkGraph.edge.loopCreationDirection = function(fromNode) {

        nodeDistances = []

        for (nodeID in $scope.networkGraph.nodes) {
            if (nodeID != fromNode) {
                distance = viewX.distF([$scope.networkGraph.nodes[nodeID].x, $scope.networkGraph.nodes[nodeID].y], [$scope.networkGraph.nodes[fromNode].x, $scope.networkGraph.nodes[fromNode].y])
                nodeDistances.push([nodeID, distance])
            }
        }

        // Top 3 closest nodes
        nodeDistances.sort(function(a, b) {
            return a[1] - b[1];
        });

        nodeDistances = nodeDistances.slice(0, 3)

        resultantVector = [0, 0]

        for (nk = 0; nk < nodeDistances.length; nk++) {
            nodeID = nodeDistances[nk][0]
            node = $scope.networkGraph.nodes[nodeID]
            nodeVector = viewX.subtractVec([$scope.networkGraph.nodes[nodeID].x, $scope.networkGraph.nodes[nodeID].y], [$scope.networkGraph.nodes[fromNode].x, $scope.networkGraph.nodes[fromNode].y])

            nodeVector = viewX.scalarMultiplyVec(1/nodeDistances[nk][1], nodeVector)

            resultantVector = viewX.addVec(resultantVector, nodeVector)
        }


        if (resultantVector != [0, 0]) {
            resultantUnitVector = viewX.unitVec(resultantVector)
            reverseVector = viewX.scalarMultiplyVec(-1, resultantUnitVector)
        }
        else {
            reverseVector = [1, 1]
        }

        return reverseVector
    }

    $scope.networkGraph.edge.unhighlight = function() {
        if ($scope.networkGraph.edge.highlighted != "") {

            if ($scope.networkGraph.edge.highlighted != $scope.networkGraph.edge.selected && $scope.networkGraph.edge.edges[$scope.networkGraph.edge.highlighted] != null) {

                edgeID = $scope.networkGraph.edge.highlighted

                if ($scope.networkGraph.edge.edges[edgeID].from != $scope.networkGraph.edge.edges[edgeID].to) {
                    viewX.updateArrow("main-graph", "edgeArrow-" + edgeID, {arrowcolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 0.5})
                    viewX.updateLine("main-graph", "edgeLine-" + edgeID, {linecolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 3})
                }
                else {
                    viewX.updateCircle("main-graph", "edgeLine-" + edgeID, {stroke: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 3})
                    viewX.updateArrow("main-graph", "edgeArrow-" + edgeID, {arrowcolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 0.5})
                }
                
    
                $scope.networkGraph.edge.highlighted = ""
            }
            
        }
    }


    $scope.networkGraph.edge.highlight = function(edgeID) {
        if ($scope.networkGraph.edge.edges[edgeID].from != $scope.networkGraph.edge.edges[edgeID].to) {

            // edgeArrowOptions = {from: [firstNode.x, firstNode.y], to: midPoint, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 0.5}
            // viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)

            // edgeLineOptions = {x1: firstNode.x, y1: firstNode.y, x2: secondNode.x, y2: secondNode.y,linecolor: "hsla(var(--themeColorHue), 30%, 40%, 1)", strokewidth: 3}
            // lineAdded = viewX.addLine("main-graph", "edgeLine-" + edgeID, edgeLineOptions)



            viewX.updateArrow("main-graph", "edgeArrow-" + edgeID, {arrowcolor: "hsla(var(--themeColorHue), 100%, 80%, 0.9)", strokewidth: 0.5})

            viewX.updateLine("main-graph", "edgeLine-" + edgeID, {linecolor: "hsla(var(--themeColorHue), 100%, 80%, 0.9)", strokewidth: 3})

            $scope.networkGraph.edge.highlighted = edgeID
        }
        else {

            viewX.updateArrow("main-graph", "edgeArrow-" + edgeID, {arrowcolor: "hsla(var(--themeColorHue), 100%, 80%, 0.9)", strokewidth: 0.5})
            viewX.updateCircle("main-graph", "edgeLine-" + edgeID, {stroke: "hsla(var(--themeColorHue), 100%, 80%, 0.9)", strokewidth: 3})
            
            $scope.networkGraph.edge.highlighted = edgeID
        }
    }


    $scope.networkGraph.edge.selectEdge = function(edgeID) {
        if ($scope.networkGraph.edge.editContextStarted == false) {
            $scope.networkGraph.escapeEvent()
            // $scope.networkGraph.edge.unselectEdge()
            // $scope.networkGraph.edge.unhighlight()

            $scope.networkGraph.edge.selected = edgeID
            $scope.networkGraph.edge.highlight(edgeID)

            edge = $scope.networkGraph.edge.edges[edgeID]

            fromNode = $scope.networkGraph.nodes[edge.from]
            toNode = $scope.networkGraph.nodes[edge.to]

            fromCircleBoundingRect = viewX.graphData["main-graph"].circleData["node-" + fromNode.id][0].getBoundingClientRect()

            toCircleBoundingRect = viewX.graphData["main-graph"].circleData["node-" + toNode.id][0].getBoundingClientRect()

            $scope.networkGraph.edge.optionMenu.left = (fromCircleBoundingRect.left + toCircleBoundingRect.left)/2
            $scope.networkGraph.edge.optionMenu.top = (fromCircleBoundingRect.top + toCircleBoundingRect.top)/2



        }
    }

    $scope.networkGraph.edge.unselectEdge = function() {
        if ($scope.networkGraph.edge.editContextStarted == false) {
            $scope.networkGraph.edge.unhighlight()
            $scope.networkGraph.edge.selected = ""
            
        }
    }


    $scope.networkGraph.edge.removeEdge = function(edgeID) {

        $scope.networkGraph.clear()

        if (typeof $scope.networkGraph.edge.edges[edgeID] == 'object' && $scope.networkGraph.edge.edges[edgeID] !== null) {

            
            $scope.networkGraph.edge.unselectEdge()
            fromNode = $scope.networkGraph.edge.edges[edgeID].from
            toNode = $scope.networkGraph.edge.edges[edgeID].to

            delete $scope.networkGraph.nodes[fromNode].edges.leaving[toNode]
            delete $scope.networkGraph.nodes[toNode].edges.arriving[fromNode]

            delete $scope.networkGraph.edge.edges[edgeID]


        }

        $scope.networkGraph.render()

        
    }

    $scope.networkGraph.edge.removeEdgeWithoutRender = function(edgeID) {

        if (typeof $scope.networkGraph.edge.edges[edgeID] == 'object' && $scope.networkGraph.edge.edges[edgeID] !== null) {

            
            $scope.networkGraph.edge.unselectEdge()
            fromNode = $scope.networkGraph.edge.edges[edgeID].from
            toNode = $scope.networkGraph.edge.edges[edgeID].to

            delete $scope.networkGraph.nodes[fromNode].edges.leaving[toNode]
            delete $scope.networkGraph.nodes[toNode].edges.arriving[fromNode]

            delete $scope.networkGraph.edge.edges[edgeID]


        }


        
    }










    
    $scope.networkGraph.configurations = {}

    $scope.networkGraph.configurations.random = function() {
        for (k = 0; k < 5; k++) {
            details = {
                x: Math.random(),
                y: Math.random(),
                parameters: {
                    'recoveryRate': {
                        value: $scope.networkGraph.parameterRandom(from='node', parameter='recoveryRate')
                    }
                }
            }
            $scope.networkGraph.addNode(nodeDetails=details)
        }

        nodeIDList = Object.keys($scope.networkGraph.nodes)

        for (k = 0; k < 5; k++) {
            fromNode = nodeIDList[Math.floor(Math.random() * nodeIDList.length)]
            toNode = nodeIDList[Math.floor(Math.random() * nodeIDList.length)]
            $scope.networkGraph.edge.addEdge(fromNode, toNode);
        }
    }




    $scope.networkGraph.fullGraphClickEvents = function($event) {
        if ($event.target.id.search('knob') == -1 && $event.target.id.search('edgeLine') == -1) {
            $scope.networkGraph.escapeEvent()
        }

        if ($event.target.id.search('edgeLine') != -1) {
            $scope.networkGraph.edge.selectEdge($event.target.id.split("edgeLine-")[1])
        }


        if ($event.target.id.search('knob') != -1) {
            if ($scope.networkGraph.edge.editContextStarted == false) {
                $scope.networkGraph.escapeEvent()
                $scope.networkGraph.selectNode($event.target.id.split("knob-")[1])
            }
            else {
                $scope.networkGraph.edge.selectNodeForEdgeCreation($event.target.id.split("knob-")[1])
            }
            
            
        }
    }

    $scope.networkGraph.mouseMove = function($event) {
        if ($scope.networkGraph.edge.editContextStarted) {
            if ($scope.networkGraph.edge.edgeFirstPointSelected != "" && $scope.networkGraph.edge.edgeSecondPointSelected == "") {

                currentlyAt = viewX.cursorToGraph($event.clientX, $event.clientY, "main-graph")

                if (viewX.distF([$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y], currentlyAt) > 0.04) {
                    viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y], to: currentlyAt})

                    viewX.updateCircle("main-graph", "addingEdgeLoop", {x: -10, y: -10, radius: 0.1})
                }
                else {
                    viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [-10, -10], to: [-20, -20]})

                    loopCreationDirection = [1, 1]
                    constructionValues = $scope.networkGraph.edge.loopCreation([$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y], loopCreationDirection)

                    viewX.updateCircle("main-graph", "addingEdgeLoop", {x: constructionValues.center[0], y: constructionValues.center[1], radius: 0.1})
                }
                
            }
        }

        if ($event.target.id.search('edgeLine') != -1) {
            $scope.networkGraph.edge.highlight($event.target.id.split("edgeLine-")[1])
        }
        else {
            $scope.networkGraph.edge.unhighlight()
        }
    }

    // $scope.networkGraph.fullGraphMouseDownEvents = function($event) {
    //     if ($event.target.id.search('knob') != -1) {
    //         console.log("Hi")
    //     }

    // }

    $scope.networkGraph.fullGraphKeyEvents = function($event) {
        if ($event.keyCode == 27) {
            $scope.networkGraph.escapeEvent()
        }

        // Delete a node
        if ($event.keyCode == 46) {
            if ($scope.networkGraph.selectedNode != "") {
                // console.log($scope.networkGraph.selectedNode)
                $scope.networkGraph.removeNode($scope.networkGraph.selectedNode)
            }
        } 
    }

    $scope.networkGraph.escapeEvent = function() {
        if ($scope.networkGraph.selectedNode != "") {
            $scope.networkGraph.unselectNode($scope.networkGraph.selectedNode)
        }

        if ($scope.networkGraph.edge.selected != "") {
            $scope.networkGraph.edge.unselectEdge()
        }

        $scope.networkGraph.additionMenu.available = false;

        $scope.text = {
            heading: "Epidemic Simulation",
            subheading: "By IITK and Purdue University, and some more information that good if it's two lines.",
    
        }

        $scope.networkGraph.edge.endEditContext()
    }



    $scope.simulation = {}
    $scope.simulation.model = "SIR Model"
    $scope.simulation.models = ["SIR Model", "SIS Model", "SEIR Model", "Agent Based Model"]
    $scope.simulation.startingTime = 1
    $scope.simulation.endingTime = 50
    $scope.simulation.percentageSusceptibleInStartingNode = 40
    
    $scope.simulation.sendData = {}
    

    $scope.simulation.getParametersFromGraph = function() {
        
        nodeArray = Object.keys($scope.networkGraph.nodes)
        $scope.simulation.sendData.nodeArray = nodeArray
        $scope.simulation.sendData.nodeParameters = {}

        for (var nodeKey in nodeArray) {
            nodeID = nodeArray[nodeKey]
            node = $scope.networkGraph.nodes[nodeID]

            for (parameter in $scope.networkGraph.nodeParameters) {
                parameterInfo = $scope.networkGraph.nodeParameters[parameter]
                parameterName = parameterInfo.internalName
                if ($scope.simulation.sendData.nodeParameters[parameterName] == undefined) {
                    $scope.simulation.sendData.nodeParameters[parameterName] = []
                }

                $scope.simulation.sendData.nodeParameters[parameterName].push(node.parameters[parameter].value)
            }
        }

        $scope.simulation.sendData.edgeParameters = {}
        

        for (nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex++) {
            node1 = nodeArray[nodeIndex]
            for (otherNodeIndex = 0; otherNodeIndex < nodeArray.length; otherNodeIndex++) {
                node2 = nodeArray[otherNodeIndex]
                
                for (parameter in $scope.networkGraph.edgeParameters) {
                    parameterInfo = $scope.networkGraph.edgeParameters[parameter]
                    parameterName = parameterInfo.internalName

                    if ($scope.simulation.sendData.edgeParameters[parameterName] == undefined) {
                        $scope.simulation.sendData.edgeParameters[parameterName] = {}
                    }

                    edgeID = "from#" + node1 + "to#" + node2
                    edge = $scope.networkGraph.edge.edges[edgeID]
                    if (edge != undefined) {
                        $scope.simulation.sendData.edgeParameters[parameterName][nodeIndex + "-" + otherNodeIndex] = edge.parameters[parameter].value
                    }
                    else {
                        $scope.simulation.sendData.edgeParameters[parameterName][nodeIndex + "-" + otherNodeIndex] = 0
                    }
                    
                }
                
            }
        }

    }


    $scope.simulation.run = function() {
        $scope.simulation.getParametersFromGraph()

        $scope.simulation.sendData.model = $scope.simulation.model
        $scope.simulation.sendData.startingTime = $scope.simulation.startingTime
        $scope.simulation.sendData.endingTime = $scope.simulation.endingTime
        $scope.simulation.sendData.percentageSusceptibleInStartingNode = $scope.simulation.percentageSusceptibleInStartingNode

        console.log($scope.simulation.sendData)
    }


    // $interval($scope.simulation.run, 1000)





}]);