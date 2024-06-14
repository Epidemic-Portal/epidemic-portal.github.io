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
        if (Math.abs(valuesAreBetween[1] - valuesAreBetween[0]) > 0) {
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

    $scope.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    console.log($scope.dimensions)


    



    
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


        $scope.simulation.startingNode = recentNode


        // $scope.chart.render()

    }

    $scope.networkGraph = {}

    $scope.networkGraph.addGraph = function() {
        graphH = document.getElementById('main-graph-holder')
        viewX.addGraph(graphH, "main-graph", epidemicApp.defaultGraphOptions)


        viewX.addCircle("main-graph", "highlightNodeRing1", {x: 1, y: 1, radius: 0.042, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 0.1)" : "hsla(var(--themeColorHue), 100%, 45%, 0.1)")})
        viewX.addCircle("main-graph", "highlightNodeRing2", {x: 1, y: 1, radius: 0.055, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 0.1)" : "hsla(var(--themeColorHue), 100%, 45%, 0.1)")})


        viewX.addText("main-graph", "text-label-small-available", {x: -10, y: -10, textcolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 1)" : "hsla(var(--themeColorHue), 100%, 45%, 1)"), fontFamily: 'Nunito'})

        viewX.addText("main-graph", "text-label-small-available-2", {x: -10, y: -10, textcolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 1)" : "hsla(var(--themeColorHue), 100%, 45%, 1)"), fontFamily: 'Nunito'})
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
            default: 0.09,
            min: 0,
            max: 0.3,
            step: 0.001,
            name: "Recovery Rate",
            description: "The rate at which the node recovers from the disease",
            internalName: "gamma"
        }
    }

    $scope.networkGraph.edgeParameters = {
        "betaParameter": {
            default: 0.8,
            min: 0,
            max: 1,
            step: 0.01,
            name: "Infection Rate",
            description: "Infection rate in the node where the edge begins, due to the infected population in the node where the edge ends (arrow points to)",
            internalName: "beta"
        }
    }

    $scope.networkGraph.parameterDisplayedOnNode = "recoveryRate"

    $scope.networkGraph.parameterDisplayedOnEdge = "betaParameter"


    $scope.networkGraph.parameterRandom = function(from='node', parameter='recoveryRate') {
        if (from == 'node') {
            return viewX.linearValue(0, 1, $scope.networkGraph.nodeParameters[parameter].min, $scope.networkGraph.nodeParameters[parameter].max, Math.random())
        }
        else {
            return viewX.linearValue(0, 1, $scope.networkGraph.edgeParameters[parameter].min, $scope.networkGraph.edgeParameters[parameter].max, Math.random())
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

            plottingParameterAsSaturation = $scope.networkGraph.edge.coloring(edgeID)

            if ($scope.networkGraph.edge.edges[edgeID].from != $scope.networkGraph.edge.edges[edgeID].to) {
                firstNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].from]
                secondNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].to]


                midPoint = viewX.scalarMultiplyVec(0.5, viewX.addVec([firstNode.x, firstNode.y], [secondNode.x, secondNode.y]))
                edgeArrowOptions = {from: [firstNode.x, firstNode.y], to: midPoint, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 40%, 1)", strokewidth: 0.5}
                viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)

                edgeLineOptions = {x1: firstNode.x, y1: firstNode.y, x2: secondNode.x, y2: secondNode.y,linecolor: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 40%, 1)", strokewidth: 3}
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

                edgeCircleOptions = {x: constructionValues.center[0], y: constructionValues.center[1], radius: $scope.networkGraph.edge.loopRadius, stroke: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 40%, 1)", circlecolor: "transparent", strokewidth: 3}
                
                circleAdded = viewX.addCircle("main-graph", "edgeLine-" + edgeID, edgeCircleOptions)
                circleAdded[0].style.cursor = "pointer"
                circleAdded[0].style.pointerEvents = "auto"

                edgeArrowOptions = {from: constructionValues.arrowLocation , to: constructionValues.arrowTo, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 40%, 1)", strokewidth: 0.5}
                viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)
                
                // viewX.addLine("main-graph", "edgeLine-" + edgeID, edgeLineOptions)
            }
        }

        for (nodeID in $scope.networkGraph.nodes) {
            node = $scope.networkGraph.nodes[nodeID]


            if ($scope.simulation.startingNode == nodeID) {
                nodeOptions = {x: node.x, y: node.y, radius: 0.03, stroke: "transparent", circlecolor: "var(--infectionRed)"}
                viewX.addCircle("main-graph", "node-" + node.id, nodeOptions)
            }
            else {
                saturationForNode = $scope.networkGraph.nodeColoring()
                nodeOptions = {x: node.x, y: node.y, radius: 0.03, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), " + saturationForNode + "%, 70%, 1)" : "hsla(var(--themeColorHue), " + saturationForNode + "%, 45%, 1)")}
                viewX.addCircle("main-graph", "node-" + node.id, nodeOptions)
    
    
            }

            
            viewX.moveToTop("main-graph", "node-moving-knob-" + node.id)
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

            if ($scope.simulation.startingNode == nodeID) {
                viewX.updateCircle("main-graph", "node-" + node.id, {circlecolor: "var(--infectionRed)"})
            }
            else {
                viewX.updateCircle("main-graph", "node-" + node.id, {circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), 100%, 90%, 1)" : "hsla(var(--themeColorHue), 100%, 45%, 1)")})
            } 
        
            

            

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

                if (edgeInfo.from == nodeID) {
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



            $scope.networkGraph.nodes[$scope.networkGraph.selectedNode].displayInfo = "It has " + counts.leaving + " edge" + (counts.leaving == 1 ? "": "s") + " leaving, " + counts.arriving + " edge" + (counts.arriving == 1 ? "": "s") + " arriving and " + counts.loops + " loop" + (counts.loops == 1 ? "": "s") + "."

            
            // console.log($scope.networkGraph.nodes[nodeID].displayInfo)
        }

        
        
    }

    $scope.networkGraph.unselectNode = function(nodeID) {
        node = $scope.networkGraph.nodes[nodeID]
        $scope.networkGraph.selectedNode = ""

        if ($scope.simulation.startingNode == nodeID) {
            viewX.updateCircle("main-graph", "node-" + node.id, {circlecolor: "var(--infectionRed)"})
        }
        else {
            saturationForNode = $scope.networkGraph.nodeColoring()
            viewX.updateCircle("main-graph", "node-" + node.id, {circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), " + saturationForNode + "%, 70%, 1)" : "hsla(var(--themeColorHue), " + saturationForNode + "%, 45%, 1)")})
        } 
        

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
            edgeDetails = {
                fromNode: $scope.networkGraph.edge.edgeFirstPointSelected,
                toNode: $scope.networkGraph.edge.edgeSecondPointSelected
            }
            $scope.networkGraph.edge.addEdge(edgeDetails)

            $scope.networkGraph.edge.updateEditContext()
        }
    }


    $scope.networkGraph.edge.addEdge = function(edgeDetails = null) {

        if (edgeDetails == null) {
            edgeDetails = {}
        }
        
        if (edgeDetails.fromNode != null && edgeDetails.toNode != null) {
            fromNode = edgeDetails.fromNode
            toNode = edgeDetails.toNode


            edgeID = "from#" + fromNode + "to#" + toNode
            reverseEdgeID = "from#" + toNode  + "to#" + fromNode
            if ($scope.networkGraph.edge.edges[edgeID] == undefined && $scope.networkGraph.edge.edges[reverseEdgeID] == undefined) {
                $scope.networkGraph.edge.edges[edgeID] = {
                    from: fromNode,
                    to: toNode
                }
                $scope.networkGraph.edge.edges[edgeID].displayInfo = "An edge in the graph"
                $scope.networkGraph.edge.edges[edgeID].parameters = {}
                
                
                if (edgeDetails.parameters == null) {
                    
                    for (parameter in $scope.networkGraph.edgeParameters) {
                        $scope.networkGraph.edge.edges[edgeID].parameters[parameter] = {}
                        $scope.networkGraph.edge.edges[edgeID].parameters[parameter].value = $scope.networkGraph.edgeParameters[parameter].default
                        $scope.networkGraph.edge.edges[edgeID].parameters[parameter].editing = false
                    }
                }
                else {
                    for (parameter in $scope.networkGraph.edgeParameters) {
                        $scope.networkGraph.edge.edges[edgeID].parameters[parameter] = {}
                        $scope.networkGraph.edge.edges[edgeID].parameters[parameter].value = (edgeDetails.parameters[parameter] == null) ? $scope.networkGraph.edgeParameters[parameter].default : edgeDetails.parameters[parameter]
                        $scope.networkGraph.edge.edges[edgeID].parameters[parameter].editing = false
                    }
                }

                

                $scope.networkGraph.nodes[fromNode].edges.leaving[toNode] = edgeID
                $scope.networkGraph.nodes[toNode].edges.arriving[fromNode] = edgeID

                $scope.networkGraph.render()
            }
        }
        
    }


    // $scope.networkGraph.edge.editContentAnimation = function() {
    //     viewX.updateCircle("main-graph", "edgeFirstPointSelected", {strokedasharray: []})
    // }

    $scope.networkGraph.edge.coloring = function(edgeID) {
        plottingParameterValue = $scope.networkGraph.edge.edges[edgeID].parameters[$scope.networkGraph.parameterDisplayedOnEdge].value

        plottingParameterMin = $scope.networkGraph.edgeParameters[$scope.networkGraph.parameterDisplayedOnEdge].min
        plottingParameterMax = $scope.networkGraph.edgeParameters[$scope.networkGraph.parameterDisplayedOnEdge].max

        plottingParameterAsSaturation = viewX.linearValue(plottingParameterMin, plottingParameterMax, 0, 70, plottingParameterValue)

        return plottingParameterAsSaturation
    }

    


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

                saturation = $scope.networkGraph.edge.coloring(edgeID)

                if ($scope.networkGraph.edge.edges[edgeID].from != $scope.networkGraph.edge.edges[edgeID].to) {
                    viewX.updateArrow("main-graph", "edgeArrow-" + edgeID, {arrowcolor: "hsla(var(--themeColorHue), " + saturation + "%, 40%, 1)", strokewidth: 0.5})
                    viewX.updateLine("main-graph", "edgeLine-" + edgeID, {linecolor: "hsla(var(--themeColorHue), " + saturation + "%, 40%, 1)", strokewidth: 3})
                }
                else {
                    viewX.updateCircle("main-graph", "edgeLine-" + edgeID, {stroke: "hsla(var(--themeColorHue), " + saturation + "%, 40%, 1)", strokewidth: 3})
                    viewX.updateArrow("main-graph", "edgeArrow-" + edgeID, {arrowcolor: "hsla(var(--themeColorHue), " + saturation + "%, 40%, 1)", strokewidth: 0.5})
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

    $scope.networkGraph.changingEdgeParameter = function() {
        // console.log($scope.networkGraph.edge.edges[$scope.networkGraph.edge.selected])
        $scope.networkGraph.render()
    }










    
    $scope.networkGraph.configurations = {}

    $scope.networkGraph.configurations.random = function() {
        for (k = 0; k < 6; k++) {
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

        for (k = 0; k < 16; k++) {
            fromNode = nodeIDList[Math.floor(Math.random() * nodeIDList.length)]
            toNode = nodeIDList[Math.floor(Math.random() * nodeIDList.length)]

            details = {
                fromNode : fromNode,
                toNode : toNode,
                parameters: {
                    'betaParameter': $scope.networkGraph.parameterRandom(from='edge', parameter='betaParameter')
                }
            }
            $scope.networkGraph.edge.addEdge(details);
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

        viewX.updateText("main-graph", "text-label-small-available", {x: -10, y: -10, text: "Available"})

        viewX.updateText("main-graph", "text-label-small-available-2", {x: -10, y: -10, text: "Available"})
    }



    $scope.simulation = {}
    $scope.simulation.model = "SIR Model"
    $scope.simulation.models = {
        "SIR Model": {
            "enabled": true
        },
        "SIS Model": {
            "enabled": false
        },
        "SEIR Model": {
            "enabled": false
        },
        "Agent Based Model": {
            "enabled": false
        }
    }
    $scope.simulation.startingTime = 1
    $scope.simulation.endingTime = 40
    $scope.simulation.percentageSusceptibleInStartingNode = 40

    $scope.simulation.startingNode = ""
    
    $scope.simulation.sendData = {}

    $scope.simulation.awaitingResponse = false
    $scope.simulation.response = {}

    $scope.simulation.canPlot = false

    

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
                        $scope.simulation.sendData.edgeParameters[parameterName][otherNodeIndex + "-" + nodeIndex] = edge.parameters[parameter].value
                    }
                    else {
                        $scope.simulation.sendData.edgeParameters[parameterName][otherNodeIndex + "-" + nodeIndex] = 0
                    }
                    
                }
                
            }
        }

    }


    $scope.simulation.run = function() {
        $scope.chart.remove()

        $scope.simulation.getParametersFromGraph()

        $scope.simulation.sendData.userDetails = getUserDetails()

        $scope.simulation.sendData.model = $scope.simulation.model
        $scope.simulation.sendData.startingTime = $scope.simulation.startingTime
        $scope.simulation.sendData.endingTime = $scope.simulation.endingTime
        $scope.simulation.sendData.percentageSusceptibleInStartingNode = $scope.simulation.percentageSusceptibleInStartingNode
        $scope.simulation.sendData.startingNode = $scope.simulation.startingNode

        requestID = "r-" + $scope.uniqueCodeGen()

        
        $scope.simulation.sendData.requestID = requestID

        // $scope.simulation.writeRequestToFirebase(requestID, $scope.simulation.sendData)




        // $timeout(function() {
        //     $scope.simulation.firebaseResponseHandler(requestID)
        // }, 1000)

        $scope.simulation.sendRequest($scope.simulation.sendData)



        document.getElementById('responseHolder').scrollIntoView()

        $scope.simulation.awaitingResponse = true
        $scope.simulation.awaitingResponseFailure = false
    }


    $scope.simulation.sendRequest = function(dataToSend) {
        sendingInfo = {
            'data': dataToSend
        }
        
        // The other working option : https://fastapi-production-ad39.up.railway.app/calculate
        
        
        const response = fetch('https://prajwalsouza.pythonanywhere.com/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendingInfo)
        }).then(function(response) {
            console.log(response)
            return response.json();
        }
        ).then(function(data) {
            $scope.simulation.response = data["result"]

            console.log($scope.simulation.response)

            if ($scope.simulation.response != null) {
                $scope.simulation.awaitingResponse = false
                $scope.simulation.awaitingResponseFailure = false

                console.log($scope.simulation.response)


                $scope.chart.series = {}
                $scope.chart.x = []
    
                $scope.chart.nodesDisplayed = {}
    
    
                nodeIDs = Object.keys($scope.networkGraph.nodes)
    
                for (var nodeID in $scope.networkGraph.nodes) {
                    $scope.chart.nodesDisplayed[nodeID] = false
                }
    
                for (ri = 0; ri < 2; ri++) {
                    randomNode = nodeIDs[Math.floor(Math.random() * nodeIDs.length)]
                    $scope.chart.nodesDisplayed[randomNode] = true
    
                }
    
    
    
                for (var seriesName in $scope.simulation.response) {
    
                    variableName = $scope.simulation.responseVariableInterpretation[seriesName]
                    
                    if (variableName == "Time") {
                        $scope.chart.x = $scope.simulation.response[seriesName]
                    }
                    else {
                        seriesData = $scope.simulation.response[seriesName]
                        for (timeIndex = 0 ; timeIndex < seriesData.length; timeIndex++) {
                            
                            // valuesString = seriesData[timeIndex]
                            // // parsing [4, 56, 67, 67]
    
                            // valuesString = valuesString.substring(1, valuesString.length - 1)
                            // // parsing 4, 56, 67, 67
                            // values = valuesString.split(", ")
                            
                            values = seriesData[timeIndex]
                            // console.log(values)
                            for (nodeIndex = 0; nodeIndex < values.length; nodeIndex++) {
                                if ($scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]] == undefined) {
                                    $scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]] = {name: variableName, data: [], node: nodeIDs[nodeIndex]}
                                }
                                
                                $scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]].data.push(parseFloat(values[nodeIndex])*100)

                                // console.log(parseFloat(values[nodeIndex])*100)
                                
    
                            }
                            
                        }
    
    
                        
                    }
                }
    
    
                $scope.simulation.responseAdditionalCalculation()
    
    
                $scope.chart.render()

                $scope.simulation.canPlot = true
    
                $scope.$apply()
            }
        }
        ).catch(function(error) {
            console.error('Error:', error);
            $scope.simulation.awaitingResponse = false
            $scope.simulation.awaitingResponseFailure = true

        });

    }

    $scope.simulation.responseVariableInterpretation = {
        "iArray": "Infected",
        "sArray": "Susceptible",
        "rArray": "Recovered",
        "eArray": "Exposed",
        "tArray": "Time"
    }

    $scope.simulation.firebaseResponseHandler = function(requestID) {
        var ref = firebase.database().ref("requests/"+ requestID + '/response');
        ref.on('value', function(snapshot) {
            $scope.simulation.response = snapshot.val()

            if ($scope.simulation.response != null) {
                $scope.simulation.awaitingResponse = false


                $scope.chart.series = {}
                $scope.chart.x = []
    
                $scope.chart.nodesDisplayed = {}
    
    
                nodeIDs = Object.keys($scope.networkGraph.nodes)
    
                for (var nodeID in $scope.networkGraph.nodes) {
                    $scope.chart.nodesDisplayed[nodeID] = false
                }
    
                for (ri = 0; ri < 2; ri++) {
                    randomNode = nodeIDs[Math.floor(Math.random() * nodeIDs.length)]
                    $scope.chart.nodesDisplayed[randomNode] = true
    
                }
    
    
    
                for (var seriesName in $scope.simulation.response) {
    
                    variableName = $scope.simulation.responseVariableInterpretation[seriesName]
                    
                    if (variableName == "Time") {
                        $scope.chart.x = $scope.simulation.response[seriesName]
                    }
                    else {
                        seriesData = $scope.simulation.response[seriesName]
                        for (timeIndex = 0 ; timeIndex < seriesData.length; timeIndex++) {
                            
                            valuesString = seriesData[timeIndex]
                            // parsing [4, 56, 67, 67]
    
                            valuesString = valuesString.substring(1, valuesString.length - 1)
                            // parsing 4, 56, 67, 67
                            values = valuesString.split(", ")
                            
                            for (nodeIndex = 0; nodeIndex < values.length; nodeIndex++) {
                                if ($scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]] == undefined) {
                                    $scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]] = {name: variableName, data: [], node: nodeIDs[nodeIndex]}
                                }
    
                                $scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]].data.push(parseFloat(values[nodeIndex])*100)
                                
    
                            }
                            
                        }
    
    
                        
                    }
                }
    
    
                $scope.simulation.responseAdditionalCalculation()
    
    
                $scope.chart.render()

                $scope.simulation.canPlot = true
    
                $scope.$apply()
            }
            
        });
    }


    $scope.simulation.writeRequestToFirebase = function(requestID, dataToSend) {
        var ref = firebase.database().ref('requests/' + requestID).set({
            data: dataToSend
        });

        console.log("Data sent")
    }



    $scope.simulation.responseAdditionalCalculation = function() {
        if ($scope.simulation.response != null) {
            if ($scope.simulation.model == 'SIR Model') {
                if ($scope.simulation.response["sArray"] == null) {
                    for (timeIndex = 0 ; timeIndex < $scope.chart.x.length; timeIndex++) {
                        nodeIDs = Object.keys($scope.networkGraph.nodes)
                        for (nodeIndex = 0; nodeIndex < nodeIDs.length; nodeIndex++) {
                            variableName = $scope.simulation.responseVariableInterpretation['sArray']
    
                            if ($scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]] == undefined) {
                                $scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]] = {name: variableName, data: [], node: nodeIDs[nodeIndex]}
                            }
    
                            infectedName = $scope.simulation.responseVariableInterpretation['iArray']
                            recoveredName = $scope.simulation.responseVariableInterpretation['rArray']
    
                            $scope.chart.series[variableName +"#" + nodeIDs[nodeIndex]].data.push(100 - $scope.chart.series[infectedName + "#" + nodeIDs[nodeIndex]].data[timeIndex] - $scope.chart.series[recoveredName + "#" + nodeIDs[nodeIndex]].data[timeIndex])
                        }
                    }
                }
            }
        }
        
    }



    // $interval($scope.simulation.run, 1000)


    $scope.ui = {}
    $scope.ui.additionParameters = {
        expanded: false
    }




    $scope.chart = {}

    $scope.chart.nodesDisplayed = {}

    $scope.chart.seriesProperties = {
        "Susceptible": {
            "color": "hsla(198, 100%, 80%, 1)",
            "buttonColor": "hsla(198, 100%, 80%, 0.2)",
            "displayed": false
        },
        "Infected": {
            "color": "hsla(0, 100%, 80%, 1)",
            "buttonColor": "hsla(0, 100%, 80%, 0.2)",
            "displayed": true
        },
        "Recovered": {
            "color": "hsla(98, 100%, 80%, 1)",
            "buttonColor": "hsla(98, 100%, 80%, 0.2)",
            "displayed": false
        }
    }

    $scope.chart.remove = function() {
        viewX.removeGraph("main-epidemic-graph")

        if (document.getElementById('yLabel-epidemic-graph') != null) {
            document.getElementById('yLabel-epidemic-graph').remove()
        }

    }



    $scope.chart.render = function() {
        $scope.chart.remove()
        
        graphH = document.getElementById('epidemic-chart-main')

        epidemicApp.defaultChartOptions['xmax'] = $scope.simulation.endingTime
        epidemicApp.defaultChartOptions['xmin'] = 0
        epidemicApp.defaultChartOptions['xmajorgridlabelshift'] = 2

        maxYvalue = 1

        $scope.chart.nodeWithHighestValueForInfected = null

        $scope.chart.maxValues = {}
        for (var seriesName in $scope.chart.series) {
            series = $scope.chart.series[seriesName]
            $scope.chart.maxValues[series.name] = Math.max(...series.data)
            if ($scope.chart.seriesProperties[series.name].displayed && $scope.chart.nodesDisplayed[series.node]) {
                maxValue = Math.max(...series.data)
                if (maxValue > maxYvalue) {
                    maxYvalue = maxValue
                    $scope.chart.nodeWithHighestValueForInfected = series.node
                }
            }   
        }

        $scope.chart.currentYMax = maxYvalue
        $scope.chart.currentXMax = $scope.simulation.endingTime

        epidemicApp.defaultChartOptions['ymax'] = maxYvalue
        epidemicApp.defaultChartOptions['ymin'] = (-0.04)*maxYvalue
        epidemicApp.defaultChartOptions['unitAspectRatio'] = "no"
        epidemicApp.defaultChartOptions['xaxisthickness'] = 2
        epidemicApp.defaultChartOptions['xaxiscolor'] = "hsla(0, 0%, 30%, 1)"
        epidemicApp.defaultChartOptions['xaxislabel'] = "TIME"
        epidemicApp.defaultChartOptions['xaxislabelcolor'] = "hsla(0, 0%, 30%, 1)"

        
        epidemicApp.defaultChartOptions['yaxislabel'] = "Percentage of the Population"
        epidemicApp.defaultChartOptions['yaxislabelcolor'] = "hsla(0, 0%, 30%, 1)"


        viewX.addGraph(graphH, "main-epidemic-graph", epidemicApp.defaultChartOptions)

        // Adding Day Line
        daylineOptions = {
            x1: -100,
            y1: -100,
            x2: -200,
            y2: -200,
            strokewidth: 0.5,
            linecolor: "hsla(0, 0%, 30%, 1)",
            strokedasharray: "5, 5"
        }

        viewX.addLine("main-epidemic-graph", "dayLine", daylineOptions)

        // Day Line Label
        dayLineLabelOptions = {
            x: -100,
            y: -100,
            text: "Day 0",
            textcolor: "hsla(0, 0%, 30%, 1)",
            fontSize: 6
        }

        viewX.addText("main-epidemic-graph", "dayLineLabel", dayLineLabelOptions)

        for (var seriesName in $scope.chart.series) {
            series = $scope.chart.series[seriesName]
            if ($scope.chart.seriesProperties[series.name].displayed && $scope.chart.nodesDisplayed[series.node]) {
                pathOptions = {
                    points: [],
                }

                for (var pointIndex = 0; pointIndex < series.data.length; pointIndex++) {
                    pathOptions.points.push([$scope.chart.x[pointIndex], series.data[pointIndex]])
                }



                pathOptions.pathcolor = $scope.chart.seriesProperties[series.name].color
                pathOptions.strokewidth = 0.4

                viewX.addPath("main-epidemic-graph", "main-epidemic-graph#" + series.node + "#type" + series.name, pathOptions)
            }   
        }

        // xAxisLineOptions = {
        //     x1: 0,
        //     y1: (-0.1)*maxYvalue,
        //     y2: (-0.1)*maxYvalue,
        //     x2: $scope.simulation.endingTime,
        //     strokewidth: 0.4,
        //     linecolor: 'hsla(0, 0%, 30%, 1)'
        // }

        // viewX.addLine("main-epidemic-graph", "main-epidemic-graph-timeLine", xAxisLineOptions)

        xAxisLabelOptions = {
            x: $scope.simulation.endingTime/2,
            y: (-0.13)*maxYvalue,
            text: "Time",
            textcolor: "hsla(0, 0%, 30%, 1)",
            fontSize: 2.6,
            fontFamily: "Raleway",
            fontweight: "bold"
        }

        viewX.addText("main-epidemic-graph", "main-epidemic-graph-timeLabel", xAxisLabelOptions)

        // yAxisLabelOptions = {
        //     x: -0.1*$scope.simulation.endingTime,
        //     y: maxYvalue*1.05,
        //     text: "Percentage of the Population",
        //     textcolor: "hsla(0, 0%, 30%, 1)",
        //     fontSize: 2.6,
        //     fontFamily: "Raleway",
        //     fontweight: "bold"
        // }

        // addedLabel = viewX.addText("main-epidemic-graph", "main-epidemic-graph-yLabel", yAxisLabelOptions)

        // console.log()

        // addedLabel[0].setAttribute("transform", "translate(-50, 50) rotate(-90)")

        var textElement = document.createElement("div")
        textElement.style.position = "absolute"
        textElement.style.top = "50%"
        textElement.style.left = "-50%"
        textElement.style.id = "yLabel-epidemic-graph"
        textElement.style.width = "100%"
        textElement.style.display = "flex"
        textElement.style.justifyContent = "center"
        textElement.style.alignItems = "center"
        textElement.style.fontSize = "20px"
        textElement.style.fontFamily = "Raleway"
        // textElement.style.fontWeight = "bold"
        textElement.style.color = "hsla(0, 0%, 30%, 1)"
        textElement.innerHTML = "Percentage of the Population"
        textElement.style.transform = "rotate(-90deg)"
        document.getElementById("responseHolder").appendChild(textElement)



        $scope.chart.currentDay = 0


    }



    $scope.chart.mouseMove = function($event) {
        if (viewX.graphData["main-epidemic-graph"] != null) {
            currentlyAt = viewX.cursorToGraph($event.clientX, $event.clientY, "main-epidemic-graph")

            atDay = parseInt(currentlyAt[0])
            $scope.chart.currentDay = atDay

            $scope.chart.usefulInformation()

            if (atDay >= 0 && atDay < $scope.simulation.endingTime) {
                viewX.updateLine("main-epidemic-graph", "dayLine", {x1: currentlyAt[0], y1: $scope.chart.currentYMax*(-0.1), x2: currentlyAt[0], y2: $scope.chart.currentYMax*1.1})

                textPosition = currentlyAt[0] + ($scope.chart.currentXMax)*0.02
                viewX.updateText("main-epidemic-graph", "dayLineLabel", {x: textPosition, y: $scope.chart.currentYMax*(1.05), text: "Day " + atDay})

                $scope.chart.renderSimulation()
            }
        }

        

    }

    $scope.chart.mouseLeave = function($event) {
        if (viewX.graphData["main-epidemic-graph"] != null) {
            viewX.updateLine("main-epidemic-graph", "dayLine", {x1: -100, y1: -100, x2: -200, y2: -200})
            viewX.updateText("main-epidemic-graph", "dayLineLabel", {x: -100, y: -100, text: "Day 0"})

            viewX.updateText("main-graph", "text-label-small-available", {x: -10, y: -10, text: "Available"})

            viewX.updateText("main-graph", "text-label-small-available-2", {x: -10, y: -10, text: "Available"})

            $scope.networkGraph.render()
            $scope.chart.currentDay = 0
        }

    }


    $scope.chart.usefulInformation = function() {
        mostInfectedNode = null
        maxInfection = 0
        for (var seriesName in $scope.chart.series) {
            if (seriesName.search("Infected") != -1) {
                if ($scope.chart.series[seriesName].data[$scope.chart.currentDay] > maxInfection) {
                    maxInfection = $scope.chart.series[seriesName].data[$scope.chart.currentDay]
                    mostInfectedNode = $scope.chart.series[seriesName].node
                }
            }
            
        }


        if (mostInfectedNode != null) {

            if ($scope.networkGraph.nodes[mostInfectedNode] != undefined) {
                viewX.updateText("main-graph", "text-label-small-available", {
                    x: $scope.networkGraph.nodes[mostInfectedNode].x + 0.05, 
                    y: $scope.networkGraph.nodes[mostInfectedNode].y - 0.05, 
                    text: "Most Infected", textcolor: "hsla(0, 100%, 70%, 1)", fontSize: 2.6, fontFamily: "Raleway", fontweight: 'bold'})
                }
        }
        else {
            viewX.updateText("main-graph", "text-label-small-available", {x: -10, y: -10, text: "Available"})
        }

        if ($scope.simulation.startingNode != "" && $scope.simulation.startingNode != null) {
            additionShift = 0
            if (mostInfectedNode != null && mostInfectedNode == $scope.simulation.startingNode) {
                additionShift = 0.05
            }
            if ($scope.networkGraph.nodes[mostInfectedNode] != undefined) {
                viewX.updateText("main-graph", "text-label-small-available-2", {
                    x: $scope.networkGraph.nodes[$scope.simulation.startingNode].x + 0.05, 
                    y: $scope.networkGraph.nodes[$scope.simulation.startingNode].y - 0.05 - additionShift, 
                    text: "Starting Node", textcolor: "hsla(0, 0%, 100%, 1)", fontSize: 2.6, fontFamily: "Raleway", fontweight: 'bold'})
                }
        }
        else {
            viewX.updateText("main-graph", "text-label-small-available-2", {x: -10, y: -10, text: "Available"})
        }

        
    }


    $scope.chart.renderSimulation = function() {
        
        $scope.networkGraph.clear()


        viewX.updateCircle("main-graph", "highlightNodeRing1" , {x: -100, y: -100})
        viewX.updateCircle("main-graph", "highlightNodeRing2" , {x: -100, y: -100})

        for (edgeID in $scope.networkGraph.edge.edges) {

            plottingParameterAsSaturation = $scope.networkGraph.edge.coloring(edgeID)

            if ($scope.networkGraph.edge.edges[edgeID].from != $scope.networkGraph.edge.edges[edgeID].to) {
                firstNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].from]
                secondNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].to]
                


                midPoint = viewX.scalarMultiplyVec(0.5, viewX.addVec([firstNode.x, firstNode.y], [secondNode.x, secondNode.y]))
                edgeArrowOptions = {from: [firstNode.x, firstNode.y], to: midPoint, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 30%, 1)", strokewidth: 0.5}
                viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)

                edgeLineOptions = {x1: firstNode.x, y1: firstNode.y, x2: secondNode.x, y2: secondNode.y,linecolor: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 30%, 1)", strokewidth: 3}
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

                edgeCircleOptions = {x: constructionValues.center[0], y: constructionValues.center[1], radius: $scope.networkGraph.edge.loopRadius, stroke: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 30%, 1)", circlecolor: "transparent", strokewidth: 3}
                
                circleAdded = viewX.addCircle("main-graph", "edgeLine-" + edgeID, edgeCircleOptions)
                circleAdded[0].style.cursor = "pointer"
                circleAdded[0].style.pointerEvents = "auto"

                edgeArrowOptions = {from: constructionValues.arrowLocation , to: constructionValues.arrowTo, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), " + plottingParameterAsSaturation + "%, 30%, 1)", strokewidth: 0.5}
                viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)
                
                // viewX.addLine("main-graph", "edgeLine-" + edgeID, edgeLineOptions)
            }
        }

        for (nodeID in $scope.networkGraph.nodes) {
            node = $scope.networkGraph.nodes[nodeID]

            
            if ($scope.chart.series["Infected#" + nodeID] != null) {
                infectedNumber = $scope.chart.series["Infected#" + nodeID].data[$scope.chart.currentDay]
                saturationForNode = $scope.linearValue(infectedNumber, [0, $scope.chart.maxValues["Infected"]], [0, 100])

                nodeRadius = $scope.linearValue(infectedNumber, [0, $scope.chart.maxValues["Infected"]], [0.03, 0.05])
    
                nodeOptions = {x: node.x, y: node.y, radius: nodeRadius, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(0, " + saturationForNode + "%, 70%, 1)" : "hsla(0, " + saturationForNode + "%, 45%, 1)")}
                viewX.addCircle("main-graph", "node-" + node.id, nodeOptions)
            }

            

            
            // viewX.moveToTop("main-graph", "node-moving-knob-" + node.id)
        }


    }

    $scope.chart.renderAtDay = function(renderAtDay) {
        if (viewX.graphData["main-epidemic-graph"] != null) {

            atDay = Math.floor(renderAtDay)
            $scope.chart.currentDay = renderAtDay

            $scope.chart.usefulInformation()

            if (atDay >= 0 && atDay < $scope.simulation.endingTime) {
                viewX.updateLine("main-epidemic-graph", "dayLine", {x1: atDay, y1: $scope.chart.currentYMax*(-0.1), x2: atDay, y2: $scope.chart.currentYMax*1.1})

                textPosition = atDay + ($scope.chart.currentXMax)*0.02
                viewX.updateText("main-epidemic-graph", "dayLineLabel", {x: textPosition, y: $scope.chart.currentYMax*(1.05), text: "Day " + atDay})

                $scope.chart.renderSimulation()
            }
        }

        

    }

    $scope.chart.timeSlider = {
        playing: false,
        playTimeSlider : function() {
            $scope.chart.timeSlider.playing = true
            $scope.chart.timeSliderInterval = $interval(function() {
                $scope.chart.renderAtDay($scope.chart.currentDay + 1)
                if ($scope.chart.currentDay >= $scope.simulation.endingTime) {
                    $scope.chart.timeSlider.stopTimeSlider()
                    $scope.chart.currentDay = $scope.simulation.startingTime
                }
            }, 1000/5)
        },
        stopTimeSlider : function() {
            $scope.chart.timeSlider.playing = false
            $interval.cancel($scope.chart.timeSliderInterval)
        }
    }


    
    $scope.workflows = {}

    $scope.workflows.currentTab = "testing"

    $scope.workflows.tabs = {
        "testing": {
            "name": "Testing",
        },
        "learning-prediction": {
            "name": "Learning & Prediction",
        },
        "mitigation": {
            "name": "Mitigation",
        }
    }


    $scope.workflows.testing = {}

    $scope.workflows.testing.policyChosen = "symptomatic-testing"

    $scope.workflows.testing.policy = {
        "symptomatic-testing": {
            "name": "Symptomatic",
        },
        "risk-testing": {
            "name": "Risk",
        },
        "all-testing": {
            "name": "All",
        }
    }

    $scope.workflows.testing.numberOfTests = 50;
    $scope.workflows.testing.testDistribution = {
        'contactTestingSlider': 20,
        'randomTestingSlider': 30
    }

    $scope.workflows.testing.testDistributionSliderActive = {
        'contactTestingSlider': false,
        'randomTestingSlider': false
    }

    $scope.workflows.testing.testDistributionSliderEventHandler = function($event) {
        if ($event.target.id.search('contactTestingSliderKnob') != -1 && $scope.workflows.testing.testDistributionSliderActive['contactTestingSlider']) {
            console.log("Contact Testing")

            // get bounding rect 

            boundingRect = document.getElementById('testDistributionVisual').getBoundingClientRect()

            // get the x position of the mouse
            console.log($event.clientX)

            // get the x position of the mouse relative to the bounding rect
            console.log(($event.clientX - boundingRect.left)/400)


            // $scope.workflows.testing.testDistribution.contactTestingSlider = ($event.clientX/400)*100
        }

        if ($event.target.id.search('randomTestingSliderKnob') != -1 && $scope.workflows.testing.testDistributionSliderActive['randomTestingSlider']) {
            console.log("Random Testing")
            console.log($event.clientX/400)

            // $scope.workflows.testing.testDistribution.randomTestingSlider = ($event.clientX/400)*100
        }
    }

    $scope.workflows.testing.testDistributionSliderDownEventHandler = function($event) {
        if ($event.target.id.search('contactTestingSliderKnob') != -1) {
            $scope.workflows.testing.testDistributionSliderActive['contactTestingSlider'] = true
        }
        if ($event.target.id.search('randomTestingSliderKnob') != -1) {
            $scope.workflows.testing.testDistributionSliderActive['randomTestingSlider'] = true
        }
    }

    $scope.workflows.testing.testDistributionSliderUpEventHandler = function($event) {
        $scope.workflows.testing.testDistributionSliderActive['contactTestingSlider'] = false
        $scope.workflows.testing.testDistributionSliderActive['randomTestingSlider'] = false
    }

}]);