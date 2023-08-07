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
        $scope.networkGraph.nodeOptionsMenu.top = -100
        $scope.networkGraph.nodeOptionsMenu.left = -100

        


        $scope.networkGraph.addGraph()


        $scope.networkGraph.edge.editContext()

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

        $scope.networkGraph.generateStylesForNodeSliders()

        $scope.networkGraph.additionMenu.hoveringMenu = ""

        $scope.networkGraph.nodes = {}

        $scope.networkGraph.edge.edges = {}

        $scope.networkGraph.configurations.random()

        // $scope.networkGraph.selectedNode = ""
        // $scope.networkGraph.selectNode(recentNode)

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
            internalName: "Gamma"
        }
    }

    $scope.networkGraph.parameterDisplayedOnNode = "recoveryRate"

    $scope.networkGraph.generateStylesForNodeSliders = function() {
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

    }
    

    $scope.networkGraph.addNode = function() {
        node = {}
        node.id = $scope.uniqueCodeGen()
        node.x =Math.random()
        node.y = Math.random()

        node.name = "Node " + $scope.networkGraph.nodesAdded
        node.editableName = "Gotham City"
        node.displayInfo = "A Node in the graph"
        node.editing = {}
        node.editing.name = false

        node.parameters = {}

        for (parameter in $scope.networkGraph.nodeParameters) {
            node.parameters[parameter] = {}
            node.parameters[parameter].value = $scope.networkGraph.nodeParameters[parameter].default
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


    $scope.networkGraph.clear = function() {
        for (nodeID in $scope.networkGraph.nodes) {
            node = $scope.networkGraph.nodes[nodeID]
            viewX.removeCircle("main-graph", "node-" + node.id)
        }
    }

    $scope.networkGraph.render = function() {
        $scope.networkGraph.clear()

        for (edgeID in $scope.networkGraph.edge.edges) {
            firstNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].from]
            secondNode = $scope.networkGraph.nodes[$scope.networkGraph.edge.edges[edgeID].to]


            midPoint = viewX.scalarMultiplyVec(0.5, viewX.addVec([firstNode.x, firstNode.y], [secondNode.x, secondNode.y]))
            edgeArrowOptions = {from: [firstNode.x, firstNode.y], to: midPoint, stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), 100%, 60%, 1)", strokewidth: 0.5}
            viewX.addArrow("main-graph", "edgeArrow-" + edgeID, edgeArrowOptions)

            edgeLineOptions = {x1: firstNode.x, y1: firstNode.y, x2: secondNode.x, y2: secondNode.y,linecolor: "hsla(var(--themeColorHue), 100%, 60%, 1)", strokewidth: 3}
            viewX.addLine("main-graph", "edgeLine-" + edgeID, edgeLineOptions)
        }


        for (nodeID in $scope.networkGraph.nodes) {
            node = $scope.networkGraph.nodes[nodeID]
            saturationForNode = $scope.networkGraph.nodeColoring()
            nodeOptions = {x: node.x, y: node.y, radius: 0.03, stroke: "transparent", circlecolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), " + saturationForNode + "%, 70%, 1)" : "hsla(var(--themeColorHue), " + saturationForNode + "%, 45%, 1)")}
            viewX.addCircle("main-graph", "node-" + node.id, nodeOptions)
        }


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

        if (typeof $scope.networkGraph.nodes[nodeID] == 'object' && $scope.networkGraph.nodes[nodeID] !== null) {
            delete $scope.networkGraph.nodes[nodeID]
            viewX.removePoint("main-graph", "node-moving-knob-" + nodeID)
        }

        $scope.networkGraph.render()
        

    }

    $scope.networkGraph.configurations = {}

    $scope.networkGraph.configurations.random = function() {
        for (k = 0; k < 7; k++) {
            $scope.networkGraph.addNode()
        }
    }



    
    $scope.networkGraph.edge = {}

    

    $scope.networkGraph.edge.editContext = function() {
        $scope.networkGraph.edge.editContextStarted = false
        $scope.networkGraph.edge.edgeFirstPointSelected = ""
        viewX.addCircle("main-graph", "edgeFirstPointSelected", {x: -1, y: -1, radius: 0.05, stroke: "white", circlecolor: "transparent", strokedasharray: [5, 5], strokewidth: 2})

        viewX.addArrow("main-graph", "addingEdgeArrow", {from: [-10, -10], to: [-20, -20], stroke: "transparent", arrowcolor: "hsla(var(--themeColorHue), 100%, 80%, 0.4)", strokewidth: 1})
        
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

        $scope.networkGraph.render()
    }

    $scope.networkGraph.edge.updateEditContext = function() {
        
        if ($scope.networkGraph.edge.edgeFirstPointSelected == "" && $scope.networkGraph.edge.edgeSecondPointSelected == "") {
            $scope.text.heading = "Select the first node"
            $scope.text.subheading = "The node you select is where the edge will begin from"

            viewX.updateCircle("main-graph", "edgeFirstPointSelected", {x: -5, y: -5})
            viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [-10, -10], to: [-20, -20]})
        }
        else if ($scope.networkGraph.edge.edgeFirstPointSelected != "" && $scope.networkGraph.edge.edgeSecondPointSelected == "") {
            $scope.text.heading = "Select the second node"
            $scope.text.subheading = "The node you select is where the edge will end"

            viewX.updateCircle("main-graph", "edgeFirstPointSelected", {x: $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, y: $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y})

            viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y], to: [$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x + 0.2, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y + 0.2]})

        }
        else if ($scope.networkGraph.edge.edgeFirstPointSelected != "" && $scope.networkGraph.edge.edgeSecondPointSelected != "") {
            

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
            $scope.networkGraph.edge.edges["from#" + $scope.networkGraph.edge.edgeFirstPointSelected + "to#" + $scope.networkGraph.edge.edgeSecondPointSelected] = {
                from: $scope.networkGraph.edge.edgeFirstPointSelected,
                to: $scope.networkGraph.edge.edgeSecondPointSelected
            }

            $scope.networkGraph.edge.updateEditContext()
        }
    }


    // $scope.networkGraph.edge.editContentAnimation = function() {
    //     viewX.updateCircle("main-graph", "edgeFirstPointSelected", {strokedasharray: []})
    // }

    $scope.networkGraph.edge.mouseMoveForEdgeCreation = function($event) {
        if ($scope.networkGraph.edge.editContextStarted) {
            if ($scope.networkGraph.edge.edgeFirstPointSelected != "" && $scope.networkGraph.edge.edgeSecondPointSelected == "") {

                currentlyAt = viewX.cursorToGraph($event.clientX, $event.clientY, "main-graph")
                viewX.updateArrow("main-graph", "addingEdgeArrow", {from: [$scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].x, $scope.networkGraph.nodes[$scope.networkGraph.edge.edgeFirstPointSelected].y], to: currentlyAt})
            }
        }
    }





    $scope.networkGraph.fullGraphClickEvents = function($event) {
        if ($event.target.id.search('knob') == -1) {
            $scope.networkGraph.escapeEvent()
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
                $scope.networkGraph.removeNode($scope.networkGraph.selectedNode)
            }
        } 
    }

    $scope.networkGraph.escapeEvent = function() {
        if ($scope.networkGraph.selectedNode != "") {
            $scope.networkGraph.unselectNode($scope.networkGraph.selectedNode)
        }

        $scope.networkGraph.additionMenu.available = false;

        $scope.text = {
            heading: "Epidemic Simulation",
            subheading: "By IITK and Purdue University, and some more information that good if it's two lines.",
    
        }

        $scope.networkGraph.edge.endEditContext()
    }


    
    







}]);