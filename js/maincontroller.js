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
        $scope.networkGraph.addGraph()
    }

    $scope.networkGraph = {}
    $scope.networkGraph.addGraph = function() {
        graphH = document.getElementById('main-graph-holder')
        viewX.addGraph(graphH, "main-graph", epidemicApp.defaultGraphOptions)
    }


    $scope.networkGraph.removeGraph = function() {
        viewX.removeGraph("main-graph")
    }







}]);