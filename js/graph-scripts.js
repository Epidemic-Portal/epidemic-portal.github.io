
// Create a style tag
var style = document.createElement("style");
style.id = "root-styles"

themeColors = [270, 320, 240]
secondaryColors = [270 + 50, 320 + 50, 240 + 50]
colorIndex = Math.floor(Math.random()*themeColors.length)
themeColor = themeColors[colorIndex]
secondaryColor = secondaryColors[colorIndex]
style.innerHTML = ":root {--themeColorHue: "+  themeColor + ";"
style.innerHTML += "--secondaryColorHue: "+  secondaryColor + ";}"
document.head.appendChild(style);

ignusTheme.baseHue = themeColor;
ignusTheme.baseLightness = 50;
ignusTheme.setUp();



epidemicApp = {}

epidemicApp.darkmode = true
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
//     epidemicApp.darkmode = false
// }


epidemicApp.defaultGraphOptions = {
    xmax: 1.1,
    xmin: -0.1,

    ymax: 1.1,
    ymin: -0.1,

    axislocationX: 0,
    axislocationY: 0,

    xaxislabelvisibility: 'no',
    yaxislabelvisibility: 'no',

    xaxisvisibility: 'no',
    yaxisvisibility: 'no',

    xmajorgridlabelvisibility: 'no',
    ymajorgridlabelvisibility: 'no',

    xmajorgridlinesvisibility: 'no',
    ymajorgridlinesvisibility: 'no',

    fontSize: 1.6,

    unitAspectRatio: 'yes',
    fixAxisStretchCentrally: 'yes',

    scrollZoom: "no"
}


epidemicApp.defaultChartOptions = {
    xmax: 100,
    xmin: 0,

    ymax: 100,
    ymin: 0,

    axislocationX: 0,
    axislocationY: 0,

    xaxislabelvisibility: 'no',
    yaxislabelvisibility: 'no',

    yaxislabelshift: 0,

    xaxisvisibility: 'yes',
    yaxisvisibility: 'no',

    gridlinenumberY: 4,
    gridlinenumberX: 7,

    xmajorgridlabelvisibility: 'yes',
    ymajorgridlabelvisibility: 'yes',

    xmajorgridlabelshift: 10,
    ymajorgridlabelshift: -7,

    xmajorgridlinesvisibility: 'no',
    ymajorgridlinesvisibility: 'yes',
    ymajorgridlinesextension: "no",

    fontSize: 2,


    unitAspectRatio: 'yes',
    fixAxisStretchCentrally: 'yes',

    scrollZoom: "no"
}



epidemicApp.dots = {}
epidemicApp.addDotsGraph = function() {
    graphH = document.getElementById('dots-background-graph-holder')
    viewX.addGraph(graphH, "dots-background-graph", epidemicApp.defaultGraphOptions)
    

    dotSpacing = window.innerWidth > 400 ? 1/20 : 1/25
    yStart = window.innerWidth > 400 ? -0.2 : -0.3

    epidemicApp.dots.xDots = window.innerWidth > 400 ? 30 : 15
    epidemicApp.dots.yDots = window.innerWidth > 400 ? 30 : 40
    for (i = 0; i < epidemicApp.dots.xDots; i++) {
        for (j = 0; j < epidemicApp.dots.yDots; j++) {
            dotOptions = {x: 0.5 + i*dotSpacing, y: yStart + j*dotSpacing, pointcolor: (epidemicApp.darkmode ? "hsla(0, 0%, 20%, 1)" : "hsla(0, 0%, 60%, 1)"), pointsize: 0.4}
            viewX.addPoint("dots-background-graph", "background-dot-" + i + "-" + j, dotOptions)
        }
    }

}

epidemicApp.addDotsGraph()

epidemicApp.dotAnimationParameter = 0
epidemicApp.updateDotsGraph = function() {
    epidemicApp.dotAnimationParameter =  (epidemicApp.dotAnimationParameter + 0.1) % 30

    
    for (i = 0; i < epidemicApp.dots.xDots; i++) {
        for (j = 0; j < epidemicApp.dots.yDots; j++) {
            dotColor = viewX.linearValue(-1, 1, 0, 100, Math.sin(epidemicApp.dotAnimationParameter*3 - (0.2*i*(i - 2)+0.3*j)))
            darkness = viewX.linearValue(-1, 1, 20, 70, Math.sin(epidemicApp.dotAnimationParameter*3 - (0.2*i*(i - 2)+0.3*j)))
            pointSize = viewX.linearValue(-1, 1, 0.4, 0.5, Math.sin(epidemicApp.dotAnimationParameter*3 - (0.2*i*(i - 2)+0.3*j)))
            dotOptions = {pointcolor: (epidemicApp.darkmode ? "hsla(var(--themeColorHue), " + dotColor  + "%, " + darkness + "%, 1)" : "hsla(var(--themeColorHue), " + dotColor  + "%, 60%, 1)"), pointsize: pointSize}
            viewX.updatePoint("dots-background-graph", "background-dot-" + i + "-" + j, dotOptions)
        }
    }

}

setInterval(epidemicApp.updateDotsGraph, 50)

epidemicApp.networkGraph = {}
epidemicApp.networkGraph.nodeMove = function() {

    currentPointIdentity = viewX.reverseGraphElementMap[viewX.currentMovingPoint.id]

    graphName = currentPointIdentity[0]
    pointName = currentPointIdentity[1]

    currentPointDetails = viewX.graphData[graphName].pointData[pointName][1]

    pointKey = currentPointDetails.name.split("knob-")[1]

    console.log(currentPointDetails.x, currentPointDetails.y)

    if (currentPointDetails.x < 1.1 && currentPointDetails.x > -0.2 && currentPointDetails.y < 1.03 && currentPointDetails.y > -0.04) {

        angularScope = angular.element(document.getElementById('main-graph-holder')).scope()
        angularScope.networkGraph.nodes[pointKey].x = currentPointDetails.x
        angularScope.networkGraph.nodes[pointKey].y = currentPointDetails.y
        angularScope.networkGraph.unselectNode(pointKey)
        // angularScope.networkGraph.selectedNode = ""
        
        angularScope.networkGraph.render()
        // viewX.graphData["main-graph"]
        angularScope.$apply()
    }
}


epidemicApp.networkGraph.handleAllTouchStarts = function(event) {
    angularScope = angular.element(document.getElementById('main-graph-holder')).scope()

    if (event.target.id.search('knob') == -1) {
        angularScope.networkGraph.escapeEvent()
    }

    if (event.target.id.search('knob') != -1) {
        angularScope.networkGraph.escapeEvent()
        angularScope.networkGraph.selectNode(event.target.id.split("knob-")[1])
    }

    angularScope.$apply()


}


function getUserDetails() {
    // Retrieve user agent
    var userAgent = navigator.userAgent;

    // Retrieve screen resolution
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    // Retrieve browser dimensions
    var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Retrieve user's preferred language
    var preferredLanguage = navigator.language;

    var previousURL = document.referrer;

    var currentDate = new Date();
    var currentTime = currentDate.toString();

    // Return an object with all the user details
    return {
        userAgent: userAgent,
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        browserWidth: browserWidth,
        browserHeight: browserHeight,
        preferredLanguage: preferredLanguage,
        previousURL: previousURL,
        time: currentTime
    };
}


window.addEventListener("scroll", function() {
    if (window.scrollY > window.innerHeight) {
        document.getElementById('main-graph-holder').style.pointerEvents = "none"
    } else {
        document.getElementById('main-graph-holder').style.pointerEvents = "auto"
    }
})