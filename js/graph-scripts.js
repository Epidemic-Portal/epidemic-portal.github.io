
epidemicApp = {}

epidemicApp.darkmode = true
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    epidemicApp.darkmode = false
}


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


epidemicApp.addDotsGraph = function() {
    graphH = document.getElementById('dots-background-graph-holder')
    viewX.addGraph(graphH, "dots-background-graph", epidemicApp.defaultGraphOptions)
    

    dotSpacing = window.innerWidth > 400 ? 1/20 : 1/25
    for (i = 0; i < 100; i++) {
        for (j = 0; j < 100; j++) {
            dotOptions = {x: -2 + i*dotSpacing, y: -2 + j*dotSpacing, pointcolor: (epidemicApp.darkmode ? "hsla(0, 0%, 20%, 1)" : "hsla(0, 0%, 60%, 1)"), pointsize: 0.4}
            viewX.addPoint("dots-background-graph", "background-dot-" + i + "-" + j, dotOptions)
        }
    }

}

epidemicApp.addDotsGraph()



