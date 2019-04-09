(function(){
        var app = angular.module('app');
        app.directive('superCubeView', ['$log','$rootScope','$tm1Ui', '$timeout', '$window','$anchorScroll','$location', function($log, $rootScope, $tm1Ui, $timeout , $window,  $anchorScroll,  $location) {
            return {
                templateUrl: 'html/SuperCubeView.html',
                scope:{
                    tm1Instance: '@',  
                    cubeName:'@',
                    cubeView:'@',
                    attributeOptions:'@',
                    tableWidth:'@',
                    tablePosition:'@',
                    tableLeft:'@',
                    tableTop:'@',
                    tableId:'@',
                    tableHeightBottomOffset:'@',
                    tableDimensionColumnClass:'@',
                    tableDataColumnClass:'@',
                    tableId:"@",
                    rowsToLoad:'@',
                    chartVisible:'@'
                }, 
                link:function(scope, $elements, $attributes, directiveCtrl, transclude){
                    scope.defaults = {  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
                    monthkey: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                };
                scope.hideColumn = [];
                scope.selections = {};
                scope.firstDayPosition = {};
                scope.tm1Instance = $attributes.tm1Instance;
                scope.cubeView = $attributes.cubeView;
                scope.cubeName = $attributes.cubeName;
                scope.attributeOptions = $attributes.attributeOptions;
                scope.tableWidth = $attributes.tableWidth; 
                scope.innerWidth = window.innerWidth;
                scope.tablePosition = $attributes.tablePosition;
                scope.tableLeft = $attributes.tableLeft;
                scope.tableTop = $attributes.tableTop;
                scope.tableId = $attributes.tableId;
                scope.rowsToLoad =  $attributes.rowsToLoad;
                scope.tableDimensionColumnClass = $attributes.tableDimensionColumnClass;
                scope.tableDataColumnClass = $attributes.tableDataColumnClass;
                
                scope.chartVisible = $attributes.chartVisible;
                scope.dateNow = new Date() ;
                scope.collapseDimensions = true;
                 
                var n = scope.dateNow.getMonth();
                var p = scope.dateNow.getDay();
                var y = scope.dateNow.getFullYear();
                scope.monthNow = n;
                scope.dayNow = p;
                scope.yearNow =  y; 
                scope.dateNumber =((scope.dateNow+"").split(":")[0]).split(' ')[2];
                //scope.date  = (((scope.dateNow+"").split(":")[0]).split(',').join('')).split(' ').join('');
                
                scope.datasetNew = [];
                scope.dataset = []; 
                scope.tableNew = [];
                scope.table = [];
                scope.optionsNew = [];
                scope.options = [];
                scope.cellRef = {};

                scope.activeName = 'lineChart';
        var chart;
        scope.chartContainer; 
        scope.chartToolTipElements = [];
        scope.options = {
            "chart": {
              "type":  scope.activeName,
              "height": (window.innerHeight/2),
              "margin": {
                "top": 50,
                "right": 50,
                "bottom": 5,
                "left": 50
              },
              "valueFormat": function(d){ return d3.format(',.4f')(d); },
              "useInteractiveGuideline": true,
              "dispatch": {
                //elementMouseover: function(e){if(!scope.options.chart.useInteractiveGuideline){scope.chartToolTipElements = {"0":e};}else{scope.chartToolTipElements = e;}  console.log(e,'mouseover') },
                //elementMouseout: function(e){ if(!scope.options.chart.useInteractiveGuideline){scope.chartToolTipElements = {"0":e}; }else{scope.chartToolTipElements = e;}  console.log(e,'mouseout') },
                tooltipShow: function(e){ console.log(e,'tooltipShow') },
                tooltipHide: function(e){ console.log(e,'tooltipHide') }
              },
              "xAxis": {
                "axisLabel": "",
                "dispatch": {
                  
                },
                "axisLabelDistance": 0,
                "staggerLabels": false,
                "rotateLabels": 0,
                "rotateYLabel": true,
                "showMaxMin": false,
                "height": 0,
                "ticks": null,
                "width": 75,
                "margin": {
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0
                },
                "duration": 250,
                "orient": "bottom",
                "tickValues": null,
                "tickSubdivide": 0,
                "tickSize": 6,
                "tickPadding": 7,
                "domain": [
                  0,
                  1
                ],
                "range": [
                  0,
                  1
                ]
              },
              "yAxis": {
                "axisLabel": "",
                "axisLabelDistance": -10,
                "dispatch": {},
                "staggerLabels": false,
                "rotateLabels": 0,
                "rotateYLabel": true,
                "showMaxMin": true,
                "height": 60,
                "ticks": null,
                "width": 75,
                "margin": {
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0
                },
                "duration": 250,
                "orient": "left",
                "tickValues": null,
                "tickSubdivide": 0,
                "tickSize": 6,
                "tickPadding": 3,
                "domain": [
                  0,
                  1
                ],
                "range": [
                  0,
                  1
                ]
              },
              "lines": {
                "dispatch": { 
                 
                    elementClick: function(e){if(!scope.options.chart.useInteractiveGuideline){scope.chartToolTipElements = {"0":e}}else{scope.chartToolTipElements = e;}  console.log(e,'click') },
                    elementMouseover: function(e){  console.log(e,'mouseover') },
                    elementMouseout: function(e){   console.log(e,'mouseout') },
                    renderEnd: function(e){    console.log(e,'renderEnd') }
                 
                },
                "width": 960,
                "height": 500,
                "xDomain": null,
                "yDomain": null,
                "pointDomain": [
                  16,
                  256
                ],
                "xRange": null,
                "yRange": null,
                "pointRange": null,
                "forceX": [],
                "forceY": [],
                "forcePoint": [],
                "interactive": true,
                "padDataOuter": 0.1,
                "padData": false,
                "clipEdge": true,
                "clipVoronoi": false,
                "showVoronoi": false,
                "id": 53376,
                "interactiveUpdateDelay": 300,
                "showLabels": true,
                "margin": {
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0
                },
                "duration": 0,
                "useVoronoi": true,
                "interpolate": "linear"
              },
              "lines2": {
                "dispatch": {  
                  elementClick: function(e){ console.log(e,'click line 2') },
                  
                  renderEnd: function(e){  console.log(e,'renderEnd line 2') }
               
              },
                "width": 960,
                "height": 500,
                "xDomain": null,
                "yDomain": null,
                "pointDomain": [
                  16,
                  256
                ],
                "xRange": null,
                "yRange": null,
                "pointRange": null,
                "forceX": [],
                "forceY": [],
                "forcePoint": [],
                "interactive": false,
                "padDataOuter": 0.1,
                "padData": false,
                "clipEdge": false,
                "clipVoronoi": true,
                "showVoronoi": false,
                "id": 38061,
                "interactiveUpdateDelay": 300,
                "showLabels": false,
                "margin": {
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0
                },
                "duration": 250,
                "useVoronoi": true,
                "interpolate": "linear"
              },
              "legend": {
                dispatch: {
                  legendClick: function(e) { scope.selections.searchRows = '';  window.dispatchEvent(new Event('resize'));  },
                  legendDblclick: function(e) {  scope.selections.searchRows = (e.key).split(' :- ')[0];  window.dispatchEvent(new Event('resize')); },
                  legendMouseover: function(e) {  },
                  legendMouseout: function(e) { },
                  stateChange: function(e) { }
              },
                "width": 400,
                "height": 20,
                "align": true,
                "maxKeyLength": 20,
                "rightAlign": true,
                "padding": 32,
                "updateState": true,
                "radioButtonMode": false,
                "expanded": false,
                "vers": "classic",
                "margin": {
                  "top": 5,
                  "right": 0,
                  "bottom": 5,
                  "left": 0
                }
              },
              "x2Axis": {
                "dispatch": {},
                "axisLabelDistance": 0,
                "staggerLabels": false,
                "rotateLabels": 0,
                "rotateYLabel": true,
                "showMaxMin": true,
                "axisLabel": null,
                "height": 60,
                "ticks": null,
                "width": 75,
                "margin": {
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0
                },
                "duration": 250,
                "orient": "bottom",
                "tickValues": null,
                "tickSubdivide": 0,
                "tickSize": 6,
                "tickPadding": 5,
                "domain": [
                  0,
                  1
                ],
                "range": [
                  0,
                  1
                ]
              },
              "y2Axis": {
                "dispatch": {},
                "axisLabelDistance": 0,
                "staggerLabels": false,
                "rotateLabels": 0,
                "rotateYLabel": true,
                "showMaxMin": true,
                "axisLabel": null,
                "height": 60,
                "ticks": null,
                "width": 75,
                "margin": {
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0
                },
                "duration": 250,
                "orient": "left",
                "tickValues": null,
                "tickSubdivide": 0,
                "tickSize": 6,
                "tickPadding": 3,
                "domain": [
                  0,
                  1
                ],
                "range": [
                  0,
                  1
                ]
              },
              "interactiveLayer": {
                "dispatch": {
                  

                },
                "tooltip": {
                  "duration": 100,
                  "gravity": "w",
                  "distance": 25,
                  "snapDistance": 0,
                  "classes": null,
                  "chartContainer": null,
                  "enabled": true,
                  "hideDelay": 0,
                  "headerEnabled": true,
                  "fixedTop": null,
                  "offset": {
                    "left": 0,
                    "top": 0
                  },
                  "hidden": false,
                  "data": null,
                  "id": "nvtooltip-70659"
                },
                "margin": {
                  "left": 55,
                  "top": 30
                },
                "width": null,
                "height": null,
                "showGuideLine": true,
                "svgContainer": null
              },
              "tooltip": {
                "duration": 100,
                "gravity": "w",
                "distance": 25,
                "snapDistance": 0,
                "classes": null,
                "chartContainer": null,
                "enabled": true,
                "hideDelay": 200,
                "headerEnabled": true,
                "fixedTop": null,
                "offset": {
                  "left": 0,
                  "top": 0
                },
                "hidden": true,
                "data": null,
                "id": "nvtooltip-52625"
              },
              "width": null,
              "interpolate": "linear",
              "clipEdge": true,
              "duration": 0,
              "clipVoronoi": true,
              "forcePoint": [],
              "forceX": [],
              "forceY": [],
              "interactive": true,
              "interactiveUpdateDelay": 300,
              "padData": false,
              "padDataOuter": 0.1,
              "pointDomain": [
                16,
                256
              ],
              "pointRange": null,
              "showLabels": false,
              "showVoronoi": false,
              "useVoronoi": true,
              "xDomain": null,
              "xRange": null,
              "yDomain": null,
              "yRange": null,
              "showLegend": true,
              "legendPosition": "top",
              "showXAxis": false,
              "showYAxis": true,
              "focusEnable": false,
              "focusShowAxisX": true,
              "focusShowAxisY": false,
              "brushExtent": null,
              "defaultState": null,
              "noData": null,
              "focusMargin": {
                "top": 0,
                "right": 20,
                "bottom": 20,
                "left": 60
              },
              "rightAlignYAxis": false
            },
            "title": {
              "enable": false,
              "text": "Title for Line Chart",
              "className": "h4",
              "css": {
                "width": "nullpx",
                "textAlign": "center"
              }
            },
            "subtitle": {
              "enable": false,
              "text": "Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.",
              "css": {
                "width": "nullpx",
                "textAlign": "center",
                "text-align": "center",
                "margin": "10px 13px 0px 7px"
              }
            },
            "caption": {
              "enable": false,
              "text": "Figure 1. Write Your Caption text.",
              "css": {
                "width": "nullpx",
                "textAlign": "center",
                "text-align": "justify",
                "margin": "10px 13px 0px 7px"
              },
              "html": "<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style=\"text-decoration: underline;\">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style=\"color: darkred;\">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href=\"https://github.com/krispo/angular-nvd3\" target=\"_blank\">2</a>, 3]</sup>."
            },
            "styles": {
              "classes": {
                "with-3d-shadow": true,
                "with-transitions": true,
                "gallery": false
              },
              "css": {}
            }
          }
          
          scope.charRowCount = 0;
          scope.consolidatedRowsOnly = false;
          scope.randomColor = [];
          
        scope.config = {
            visible: true, // default: true
            extended: false, // default: false
            disabled: false, // default: false
            refreshDataOnly: false, // default: true
            deepWatchOptions: false, // default: true
            deepWatchData: false, // default: true
            deepWatchDataDepth: false, // default: 2
            debounce: 10 // default: 10
        };
              
          scope.gotoTop = function(){
            $location.hash('chartRow'+scope.tableId);

            // call $anchorScroll()
            $anchorScroll();
          }
         
          scope.callback = function(scope, element){
            // this code will be applied once directive has been created
            // scope - is the directive internal scope
            // element - directive DOM element
            scope.api = scope.api;
            scope.chart = scope.chart;
            scope.svg = scope.svg;
             
            // ... do smth
        };
        
          scope.highlightPoints = function(chart){
            scope.svg.selectAll("dot")    
            .data(data)         
        .enter().append("circle")                               
            .attr("r", 5)       
            .attr("cx", function(d) { return x(d.date); })       
            .attr("cy", function(d) { return y(d.close); })     
            .on("mouseover", function(d) {      
                div.transition()        
                    .duration(200)      
                    .style("opacity", .9);      
                div .html(formatTime(d.date) + "<br/>"  + d.close)  
                    .style("left", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY - 28) + "px");    
                })                  
            .on("mouseout", function(d) {       
                div.transition()        
                    .duration(500)      
                    .style("opacity", 0);   
            });
          }
  
         
 
        
                scope.seeDataNew = function(d){
                  console.log(d)
                }

                scope.getTablePosition = function(){
                    return scope.tablePosition;
                }
                scope.getTableLeft = function(){
                    return scope.tableLeft;
                }
                scope.getTableTop = function(){
                    return scope.tableTop;
                }
                 
                scope.getMathMax = function(arr){
                    if(arr){
                       var max = arr.reduce(function(a, b) {
                           return Math.max(a, b);
                       });
                       return 'tm1-ui-element-consol tm1-ui-element-consol-'+(max+'') ;
                    }else{
                        return 'tm1-ui-element-consol tm1-ui-element-consol-'+(0+'');
                    }
                   
                   
                }
                
                scope.getMyChartClick = function(event){
                 // console.log(event.target.parentNode.parentNode, "EVENT CHART CLICKED ")
                }
                scope.applySaturationToHexColor =  function(hex, saturationPercent) {
                  if (!/^#([0-9a-f]{6})$/i.test(hex)) {
                      throw('Unexpected color format');
                  }
              
                  if (saturationPercent < 0 || saturationPercent > 100) {
                      throw('Unexpected color format');
                  }
              
                  var saturationFloat   = saturationPercent / 100,
                      rgbIntensityFloat = [
                          parseInt(hex.substr(1,2), 16) / 255,
                          parseInt(hex.substr(3,2), 16) / 255,
                          parseInt(hex.substr(5,2), 16) / 255
                      ];
              
                  var rgbIntensityFloatSorted = rgbIntensityFloat.slice(0).sort(function(a, b){ return a - b; }),
                      maxIntensityFloat       = rgbIntensityFloatSorted[2],
                      mediumIntensityFloat    = rgbIntensityFloatSorted[1],
                      minIntensityFloat       = rgbIntensityFloatSorted[0];
              
                  if (maxIntensityFloat == minIntensityFloat) {
                      // All colors have same intensity, which means 
                      // the original color is gray, so we can't change saturation.
                      return hex;
                  }
              
                  // New color max intensity wont change. Lets find medium and weak intensities.
                  var newMediumIntensityFloat,
                      newMinIntensityFloat = maxIntensityFloat * (1 - saturationFloat);
              
                  if (mediumIntensityFloat == minIntensityFloat) {
                      // Weak colors have equal intensity.
                      newMediumIntensityFloat = newMinIntensityFloat;
                  }
                  else {
                      // Calculate medium intensity with respect to original intensity proportion.
                      var intensityProportion = (maxIntensityFloat - mediumIntensityFloat) / (mediumIntensityFloat - minIntensityFloat);
                      newMediumIntensityFloat = (intensityProportion * newMinIntensityFloat + maxIntensityFloat) / (intensityProportion + 1);
                  }
              
                  var newRgbIntensityFloat       = [],
                      newRgbIntensityFloatSorted = [newMinIntensityFloat, newMediumIntensityFloat, maxIntensityFloat];
              
                  // We've found new intensities, but we have then sorted from min to max.
                  // Now we have to restore original order.
                  rgbIntensityFloat.forEach(function(originalRgb) {
                      var rgbSortedIndex = rgbIntensityFloatSorted.indexOf(originalRgb);
                      newRgbIntensityFloat.push(newRgbIntensityFloatSorted[rgbSortedIndex]);
                  });
              
                  var floatToHex = function(val) { return ('0' + Math.round(val * 255).toString(16)).substr(-2); },
                      rgb2hex    = function(rgb) { return '#' + floatToHex(rgb[0]) + floatToHex(rgb[1]) + floatToHex(rgb[2]); };
              
                  var newHex = rgb2hex(newRgbIntensityFloat);
              
                  return newHex;
              }
                scope.rowTotalConsolidationArray = [];
                scope.refreshNew = function(newdataset){ 
                   
 
                            $tm1Ui.cubeExecuteView(scope.tm1Instance,scope.cubeName, scope.cubeView).then(function(result){
                                if(!result.failed){
                                     
                                    scope.datasetNew[scope.tableId] = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, result, scope.attributeOptions);
                                      
                                    scope.dataset = newdataset;
                                        
                                        scope.optionsNew[scope.tableId] = {preload: false, watch: false};
                                        
                                       scope.tableNew[scope.tableId] = $tm1Ui.tableCreate(scope, scope.datasetNew[scope.tableId].rows, scope.optionsNew[scope.tableId]);
                                       
                                       scope.tablerowLength = scope.tableNew[scope.tableId].data().length;
                                       scope.tableNew[scope.tableId].pageSize(scope.currentRowCount)
                                      // console.log(scope.table.data(), scope.tableNew.data());  
                                       var tableRows = scope.table.data();

                                        for(newrow in scope.tableNew[scope.tableId].data()){
                                            for(row in scope.table.data()){
                                                if(scope.tableNew[scope.tableId].data()[newrow].index === scope.table.data()[row].index){
                                                //console.log(scope.tableNew.data()[newrow].cells, "same row");
                                                   scope.table.data()[row]['cells'] = scope.tableNew[scope.tableId].data()[newrow]['cells'];
                                                } 
                                            }
                                        }
                                        if(scope.activeName === 'multiBarChart'){
                                          scope.options.chart.left = 0;
                                          scope.options.chart.right = 0;
                                        }
                                        if(scope.activeName === 'lineChart'){
                                          scope.options.chart.margin.left = 50;
                                          scope.options.chart.margin.right = 50;
                                        }
                                       //scope.options.chart.margin.left  = (250)*(scope.table.data()[0].elements.length)
                                        var jsonRowData = [];
                                        var colNameArray = [];
                                        var rowNameArray = [];
                                        
                                        for(ggh = 0; ggh < scope.dataset.headers.length; ggh++){
                                            var myColObj = scope.dataset.headers[ggh];
                                            var arrayToUse= [];
                                             
                                            for(jjk = 0; jjk < myColObj.columns.length; jjk++){
                                                if(colNameArray[jjkk] === undefined || !colNameArray){
                                                    colNameArray[jjk] =  (myColObj.columns[jjk].element['attributes']['Caption_Default']);
                                                }else{
                                                    colNameArray[jjk] +=   (myColObj.columns[jjk].element['attributes']['Caption_Default']);
                                                }
                                                
                                            }
                                        }
                                        var rowNameFinalArray = [];

                                        for(gggh = 0; gggh < scope.table.data().length; gggh++){
                                            var myRowObjElement = scope.table.data()[gggh];
                                            
                                             
                                            for(jjjk = 0; jjjk < myRowObjElement.elements.length; jjjk++){
                                                if(myRowObjElement.elements[jjjk].element.attributes['Description']){
                                                    if(rowNameArray[gggh]){
                                                        rowNameArray[gggh] +=  ' :- ' + (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }
                                                }else{
                                                    if(rowNameArray[gggh]){
                                                        rowNameArray[gggh] +=  ' :- ' + (myRowObjElement.elements[jjjk].element.name);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.name);
                                                      }
                                                }
                                                   
                                                     
                                              
                                            }
                                            rowNameFinalArray[gggh] = rowNameArray[gggh];
                                            
                                            if(scope.randomColor[(rowNameFinalArray[gggh]).split(' :- ')[0]]){
                                                //scope.randomColor[(rowNameFinalArray[gggh]).split('-')[0]] =  '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
                                            }else{
                                              var newSatColor = scope.applySaturationToHexColor('#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6), 50);
                                              scope.randomColor[(rowNameFinalArray[gggh]).split(' :- ')[0]] =  newSatColor ;
                                            
                                            }   
                                            rowNameArray = [];
                                        }
                                        
                                        //console.log(colNameArray, "colNameArray")
                                        for(row in scope.table.data()){
                                            //var scope.randomColor =  '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
                                            
                                               
                                                
                                                var cellArrayFromJson = [];
                                                scope.charRowCount++;
                                                jsonRowData[row] =  {"key": '',
                                                "color": scope.randomColor[((rowNameFinalArray[row]).split(' :- ')[0])], "values":[]};
                                                for(var gss = 0; gss < scope.table.data()[row].cells.length; gss++){
                                                   
                                                  if( scope.hideColumn[gss] ){  
                                                    console.log("HIDE COLUMN",gss);
                                                    
                                                  }else{
                                                    if(scope.table.data()[row].elements.length){
                                                      jsonRowData[row].key = rowNameFinalArray[row] ;
                                                  }
                                                  cellArrayFromJson.push({"type":scope.table.data()[row].elements[scope.table.data()[row].elements.length-1].element['type'],"label":"Column-"+gss,"x":gss,"y": Math.round(scope.table.data()[row].cells[gss].value)});
                                                      
                                               
                                                    console.log("dont hide",gss);
                                                  }
                                                   
                                                    
                                                    
                                                            
                                                        
                                                        
                                                      
                                                        
                                                        
                                                }
                                                var tt = JSON.stringify(cellArrayFromJson) 
                                                jsonRowData[row]["values"] = JSON.parse(tt);
                                               
                                             
                                            
                                          //  console.log(jsonRowData[row]) 
                                        }
                                      
                                        if( scope.chart && scope.activeName === 'multiBarChart'){
                                          scope.chart.left = 0;
                                          scope.chart.right = 0;
                                        }
                                        if(scope.chart && scope.activeName === 'lineChart'){
                                          scope.chart.margin.left = 50;
                                          scope.chart.margin.right = 50;
                                        }
                                       //scope.tableData = scope.table.data();
                                       scope.data = jsonRowData;
                                       if( scope.api){
                                        scope.api.refreshWithTimeout(1000);
                                       }
                                       jsonRowData = [];
                                       scope.getLastFocus(); 
                                        
                                } else {
                                   scope.message = result.message; 
                               } 
                              
                           })
                      
                }
                 scope.updateandTimeout = function(){
                  if( scope.api){
                  scope.api.updateWithTimeout(1000);
                  }
                 }
                scope.refreshandTimeout = function(){
                     
                        
                       
                        scope.refreshNew(scope.dataset); 
                      
                        scope.api.refreshWithTimeout(1000);
                     
                  
                }
                scope.getFocus = function($event) {           
                   scope.focusObj = $event.target.id;
                    
                   scope.focusedInputElementArray =  document.getElementById(scope.focusObj).getAttribute('cellref')
                 //console.log("add paste event listener",$event.target.id,scope.focusedInputElementArray )
                }
                scope.addEventListerToInput = function(id){
                   // document.getElementById(id).addEventListener('paste', scope.handlePaste);
                }
                scope.getLastFocus = function() {  
                    if(document.getElementById(scope.focusObj)){
                       document.getElementById(scope.focusObj).focus(); 
                    }  
                }
                scope.lostFocus = function($event) {  

                   var focusObjOut = $event.target.id;
                   scope.focusObj = ''; 
                  // document.getElementById(focusObjOut).removeEventListener('paste', scope.handlePaste);
           
                }   
           
                scope.getContainerWidthClass = function(idName){
                    if(document.getElementsByClassName(idName).length > 0){
                        var tempObj = document.getElementsByClassName(idName)[0];
                        if(tempObj != null || tempObj != undefined ){
                           return tempObj.getBoundingClientRect().width;
                        }
                    } 
                }
                scope.getTableRowLength = function(){
                    return scope.table.data().length;
                }
           
                scope.cellreferenceArray = [];
                scope.dimensionArray = [];
                scope.openRefModel = function(elementString){
                    
                    if((elementString+'').split(',').length > 0){
                        // console.log(elementString, "elementString")

                        scope.cellreferenceArray = (elementString+'').split(',')
                        $tm1Ui.cubeDimensions(scope.tm1Instance,scope.cubeName).then(function(result){
                            scope.dimensionArray = result;
                            scope.getCellDrill(scope.cellreferenceArray);
                             
                        })
                    }
                   
                     
                }
                scope.currentRowCount = scope.rowsToLoad;
                scope.tablerowLength = 0;
                scope.ledgendsToUse = {
                 
                    "0": {
                    "color": $rootScope.applicationHeaderColorSelect,
                    "name": "Actual"
                    },
                    "1": {
                    "color": $rootScope.applicationHeaderColorBudget,
                    "name": "Budget"
                    },
                    "2": {
                    "color":  $rootScope.applicationHeaderColorLastYear,
                    "name": "Last Year"
                    }
                }
                scope.data = [];
                scope.refresh = function(){
                    
                    
                  scope.charRowCount = 0;
                               $tm1Ui.cubeExecuteView(scope.tm1Instance,scope.cubeName, scope.cubeView).then(function(result){
                                   if(!result.failed){
                                        
                                       scope.dataset = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, result, scope.attributeOptions);
                                      
                                       scope.options[scope.tableId] = {preload: false, watch: false};
                                       if(scope.table){
                                           if(scope.table.options){
                                            console.log(scope.table, "scope.tablescope.table")
                                            scope.options[scope.tableId].index = scope.table.options.index;
                                            scope.options[scope.tableId].pageSize = scope.table.options.pageSize;
                                            scope.tablerowLength = scope.table.data().length;
                                           }
                                           
                                            
                                         
                                            
                                       }
                                        scope.table = $tm1Ui.tableCreate(scope, scope.dataset.rows, scope.options[scope.tableId]);
                                        scope.table.pageSize(scope.currentRowCount)
                                        scope.tableDimensionLength =  scope.table.data()[0].elements.length;
                                      //console.log(scope.tableDimensionLength ,"scope.tableDimensionLength ");
                                      
                                        
                                        scope.table = scope.table;
                                        scope.table.refresh();
                                        
                                        var jsonRowData = [];
                                        var colNameArray = [];
                                        var rowNameArray = [];
                            
                                        for(ggh = 0; ggh < scope.dataset.headers.length; ggh++){
                                            var myColObj = scope.dataset.headers[ggh];
                                            var arrayToUse= [];
                                             
                                            for(jjkk = 0; jjkk < myColObj.columns.length; jjkk++){
                                              if(colNameArray[jjkk] === undefined || !colNameArray){
                                                colNameArray[jjkk] =  (myColObj.columns[jjkk].element['attributes']['Caption_Default']);
                                             }else{
                                                colNameArray[jjkk] +=   (myColObj.columns[jjkk].element['attributes']['Caption_Default']);
                                             }
                                                
                                            }
                                        }
                                        var rowNameFinalArray = [];
                                        for(gggh = 0; gggh < scope.table.data().length; gggh++){
                                            var myRowObjElement = scope.table.data()[gggh];
                                             
                                            for(jjjk = 0; jjjk < myRowObjElement.elements.length; jjjk++){
                                                if(myRowObjElement.elements[jjjk].element.attributes['Description']){
                                                    if(rowNameArray[gggh]){
                                                        rowNameArray[gggh] +=  ' :- ' + (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }
                                                }else{
                                                    if(rowNameArray[gggh]){
                                                        rowNameArray[gggh] +=  ' :- ' + (myRowObjElement.elements[jjjk].element.name);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.name);
                                                      }
                                                }
                                                   
                                                     
                                              
                                            }
                                            rowNameFinalArray[gggh] = rowNameArray[gggh];
                                            if(scope.randomColor[(rowNameFinalArray[gggh]).split(' :- ')[0]]){
                                              //scope.randomColor[(rowNameFinalArray[gggh]).split('-')[0]] =  '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
                                          }else{
                                            var newSatColor = scope.applySaturationToHexColor('#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6), 50);
                                            scope.randomColor[(rowNameFinalArray[gggh]).split(' :- ')[0]] =  newSatColor ;
                                          
                                          }    
                                            rowNameArray = [];
                                        }
                                        console.log(colNameArray, "colNameArray", scope.randomColor);
                                         
                                        for(row in scope.table.data()){
                                         // console.log(scope.table.data()[row].elements[scope.table.data()[row].elements.length-1].element['attributes']['Color'], "Color of element")
                                         
                                                                           
                                            var cellArrayFromJson = [];
                                            scope.charRowCount++;
                                            jsonRowData[row] =  {"key": '',
                                            "color": scope.randomColor[((rowNameFinalArray[row]).split(' :- ')[0])], "values":[]};
                                              for(var gs = 0; gs < scope.table.data()[row].cells.length; gs++){
                                                
                                                if( scope.hideColumn[gs] ){  
                                                  console.log("HIDE COLUMN",gs);
                                                  
                                                }else{
                                                  if(scope.table.data()[row].elements.length){
                                                    jsonRowData[row].key = rowNameFinalArray[row] ;
                                                      
                                                        
                                                  }
                                                  cellArrayFromJson.push({"type":scope.table.data()[row].elements[scope.table.data()[row].elements.length-1].element['type'],"label":"Column-"+gs,"x":gs,"y": Math.round(scope.table.data()[row].cells[gs].value)});
                                                  
                                                  console.log("dont hide",gs);
                                                }
                                             
                                                  
                                                
                                                
                                                      
                                                        
                                                    
                                                    
                                                  
                                                    
                                                    
                                            }
                                            var tt = JSON.stringify(cellArrayFromJson) 
                                            jsonRowData[row]["values"] = JSON.parse(tt);
                                            //console.log(jsonRowData[row]) 
                                        }
                                        
                                     
                                         
                                      
                                       //scope.tableData = scope.table.data();
                                      scope.data = jsonRowData; 
                                      if( scope.chart && scope.activeName === 'multiBarChart'){
                                        scope.chart.left = 0;
                                        scope.chart.right = 0;
                                      }
                                      if(scope.chart && scope.activeName === 'lineChart'){
                                        scope.chart.margin.left = 50;
                                        scope.chart.margin.right = 50;
                                      }
                                      $timeout(
                                        function(){
                                          if( scope.api){
                                          scope.api.update();
                                          }
                                        },1000
                                      )
                                      
                                      jsonRowData = [];
                                   } else {
                                       scope.message = result.message;
                                       
                                      
                                   }		
                                  
                               })
                         
                        
                }

                scope.tableData = [];
                scope.tableRowCollapseData = [];
                scope.collapsedRowArray = [];
                
                
                scope.seeNewData = function(data){
                    //console.log(data)
                }
                scope.getColType = function(data){
                    return data;
                }
                
                scope.seeData = function(rowindex,table){
                    
                    scope.dataset.rows[(rowindex)][scope.dataset['dimensions']['rows'][0]]['element'].toggle();
                    scope.table.refresh();
                    scope.refreshNew(scope.dataset);
            
                };
               
                scope.containerishere = false;
           scope.scrollAmountTop = 0;
            scope.setUpFreezePane = function(){
              //console.log("setting up freeze pane", scope.tableId, document.querySelector('#stickyContainer'))
            
                if( document.querySelector('#stickyContainer'+scope.tableId)){
                    scope.containerishere = true;
                    if(scope.excelReformated === false){
                        scope.formatUploadButton();
                    }
                    
                    angular.element(document.querySelector('#stickyContainer'+scope.tableId)).bind('scroll', function(){
                      
                       
                        var el = $('#stickyContainer'+scope.tableId);
                        $body = $(el);  
                        $stickyHeader = $(el).find('#sticky-header');
                        $fixedHeader = $(el).find('.fixed-container');
                        $fixedHeaderContainer = $(el).find('#fixedFirstColHeader');
                        
                        $fixedFirstColHeader = $(el).find('.fixedFirstColHeader');
                        $chartContent = $(el).find('#chartRow'+scope.tableId);
                        $sideContent = $(el).find('#sideContent'+scope.tableId); 

                        scope.scrolling = true;
                        $($stickyHeader).css('display','none'); 
                         
                             var valuetoEval = scope.offsetTop;
                       
                             scope.scrollAmountTop =  $($body).scrollTop();
                             if(scope.chartVisible  ){
                              scope.offsetTop = 350;
      
                            }else{
                              scope.offsetTop = 1;
                            }
                            
                            if($($body).scrollTop() >= parseInt(valuetoEval)  ){
                              $($fixedHeader).css('display','block'); 
                              $($stickyHeader).css('display','block'); 
                              $($sideContent).css('display', 'block');
                                scope.headerOutOffView = true;
                              //console.log("view header")
                                if($($stickyHeader)){
                                    $($stickyHeader).css('display','block !important'); 
                                    $($stickyHeader).css('opacity','1'); 
                                    $($stickyHeader).css('pointer-events','auto'); 
                                }
                                if($($fixedHeader) && $($fixedHeaderContainer)){
                                    $($fixedHeader).css('pointer-events','auto'); 
                                    $($fixedHeaderContainer).css('display','block');
                                    
                                     
                                }
                                if($($fixedFirstColHeader)){
                                  $($fixedFirstColHeader).css('display','block');
                                }
                               
                               
                                if( $($sideContent)){
                                    $($sideContent).css('display', 'block');
                                    $($sideContent).css('margin-top', -$($body).scrollTop());
                                    if(scope.chartVisible){
                                      //console.log((document.getElementById('chartRow'+scope.tableId).getBoundingClientRect().height ) )+(document.getElementById('head'+scope.tableId).getBoundingClientRect().height);
                                      $($sideContent).css('height', (window.innerHeight - (scope.tableHeightBottomOffset)-(((document.getElementById('fixedHeaderContainer'+scope.tableId).getBoundingClientRect().top +(8) )  + (document.getElementById('chartRow'+scope.tableId).getBoundingClientRect().height )   )) ) + $($body).scrollTop() );
                                    }else{
                                      $($sideContent).css('height', (((window.innerHeight - (scope.tableHeightBottomOffset)-(((document.getElementById('fixedHeaderContainer'+scope.tableId).getBoundingClientRect().top )+(8))   )) )) + $($body).scrollTop());
                                    }
                                     
                                                                    
                                }
                               
                                 
                            }else{
                              $($stickyHeader).css('display','none'); 
                                $($fixedHeaderContainer).css('display','none'); 
                                scope.headerOutOffView = false;
                              //console.log("hide header")
                                if($($stickyHeader)){
                                   
                                   $($stickyHeader).css('display','none !important'); 
                                    $($stickyHeader).css('opacity','0'); 
                                    $($stickyHeader).css('pointer-events','none'); 
                                }
                                if($($fixedHeader) && $($fixedHeaderContainer)){
                                  $($fixedHeader).css('pointer-events','auto'); 
                                  $($fixedHeaderContainer).css('display','none');
                                  
                                   
                              }
                                

                                   
                             
                                 
                                 
                                 
                                  
                            } 
                             if($($stickyHeader)){
                                $($stickyHeader).css('margin-left', -$($body).scrollLeft());
                             }
                             $($sideContent).css('margin-top', -$($body).scrollTop());
                      });
                }else{
                    if(scope.containerishere === true){

                    }else{
                        scope.waitTillContainerArives();
                    }
                    
                }
                
            }
            scope.waitTillContainerArives = function(){
                $timeout(
                    function(){
                        //console.log("looking for freezepane");
                        scope.setUpFreezePane();
                    },1000
                )
                
            }
             
            scope.formatUploadButton = function(){
                
                if(document.getElementsByClassName('tm1-ui-export').length){
                   // console.log(document.getElementsByClassName('tm1-ui-export')[0].innerHTML)
                   
                    for(ff = 0; ff < document.getElementsByClassName('tm1-ui-export').length; ff++){
                         
                        document.getElementsByClassName('tm1-ui-export')[ff].innerHTML = (document.getElementsByClassName('tm1-ui-export')[ff].innerHTML+'').split('Excel').join('');
                        document.getElementsByClassName('tm1-ui-export')[ff].innerHTML = (document.getElementsByClassName('tm1-ui-export')[ff].innerHTML+'').split('CSV').join('');
                        document.getElementsByClassName('tm1-ui-export')[ff].innerHTML = (document.getElementsByClassName('tm1-ui-export')[ff].innerHTML+'').split(' | ').join('');
                        document.getElementsByClassName('tm1-ui-export')[ff].text = '';
                        if(ff === document.getElementsByClassName('tm1-ui-export').length-1){
                            scope.scexcelReformated = true;
                        }
                    }
                    
                }
            }
           
            scope.getTableWidth = function(){
                 return scope.tableWidth ;
                
         
            }
            scope.getTableWidthinPx = function(){
                if(document.getElementById('stickyContainer'+scope.tableId)){
                  if(scope.tableDimensionLength >0){
                    return document.getElementById('stickyContainer'+scope.tableId).getBoundingClientRect().width +(scope.getContainerWidth('rowHieghtElement'+(scope.tableId+'')+0+'-'+0)*(scope.tableDimensionLength)) ;
                  }else{
                    return document.getElementById('stickyContainer'+scope.tableId).getBoundingClientRect().width +(scope.getContainerWidth('rowHieghtElement'+(scope.tableId+'')+0+'-'+0)) ;
                  }
                    
                }
                 
            }
         
               
              scope.getContainerWidth = function(idName){
                  if(document.getElementById(idName)){
                      var tempObj = document.getElementById(idName);
                      if(tempObj != null || tempObj != undefined ){
                          return tempObj.getBoundingClientRect().width;
                      }
                  }
                  
           
              }
           
              scope.getContainerHeight = function(idName){
                  if(document.getElementById(idName)){
                      var tempObjTwo = document.getElementById(idName);
                      if(tempObjTwo != null || tempObj != undefined ){
                          return tempObjTwo.getBoundingClientRect().height;
                      }
                  }
              }
              scope.addContainerHeight = function(className){
                if( document.getElementById(className)){
                  if(document.getElementById(className).length){
                    var tempObjTwoArray = document.getElementById(className);
                    var sumNum = 0;
                    for(var tthh = 0;  tthh < tempObjTwoArray.length; tthh++){
                      sumNum += tempObjTwoArray[tthh].getBoundingClientRect().height();
                           
                   
                    }
                    return sumNum;
                     
                }
                }
                
            }
              scope.getContainerTop = function(id){
                  if(document.getElementById(id)){
                      var tempObjTop = document.getElementById(id);
                      if(tempObjTop != null || tempObjTop != undefined ){
                          return tempObjTop.getBoundingClientRect().top;
                      }
                  }
              }
              scope.setTableHeightChart= function(id){
                if(document.getElementById(id)){
                    var tempObjToTrack = document.getElementById(id);
                    if(tempObjToTrack != null || tempObjToTrack != undefined ){
                        return (((window.innerHeight - (scope.tableHeightBottomOffset)) - tempObjToTrack.getBoundingClientRect().top));
                    }
                }
             }
              scope.setTableHeight = function(id){
                  if(document.getElementById(id)){
                      var tempObjToTrack = document.getElementById(id);
                      if(tempObjToTrack != null || tempObjToTrack != undefined ){
                          return (((window.innerHeight - (scope.tableHeightBottomOffset)) - tempObjToTrack.getBoundingClientRect().top));
                      }
                  }
               }
            scope.workOutContainerHeight = function(id){
               
                         
                        if(document.getElementById(id)  ){
                        // console.log(((document.getElementById(id).getBoundingClientRect().height - document.getElementById(id).getElementsByClassName('fixed-container')[0].getBoundingClientRect().height)  +  Math.abs(scope.scrollAmountTop) ))
                                return  ((document.getElementById(id).getBoundingClientRect().height - document.getElementById(id).getElementsByClassName('fixed-container')[0].getBoundingClientRect().height)  +  Math.abs(scope.scrollAmountTop) )+'px';
                             
                        }
                    
                
            }
               scope.toggleRow = function(){
                   for(row in scope.tableData){
                       var obbj = scope.tableData[row];
           
                               //console.log(obbj['elements'][0]['element']); 
                               scope.tableData[row]['elements'][0]['element'].toggle()
                             
                   }
                   scope.table.refresh();
                }
                scope.saveValue = function(value, id){
                    var sendValue = [];
                   

                        var tempO = document.getElementById(id)
                        
                        var request = {
                            value: value, 
                            instance:scope.tm1Instance, 
                            cube: scope.cubeName, 
                            cubeElements:(scope.focusedInputElementArray).split(',') 
                            }
                            sendValue.push(request);
                             
                            $tm1Ui.cellsetPut(sendValue).then(function(result){
                              //console.log(request, "######## saved")
                                 if(result.success){
                                  //console.log(result, "######## saved")
                                    
                                    scope.refreshNew(scope.dataset);
                        
                                 }else{
                    
                                 }
                            });
                 
                    
                     

                }
                scope.sendCellSetPutArray = [];
                
                scope.handlePaste = function($event) {
                   var clipboardData, pastedData;
                   var mainArrayObj = [];
                   // Stop data actually being pasted into div
                   $event.stopPropagation();
                   $event.preventDefault();
                   //console.log(scope.focusObj)
                   var startRow = (scope.focusObj+'').split('-')[2];
                   var columnRow = (scope.focusObj+'').split('-')[3];
                   // Get pasted data via clipboard API
                   
                   clipboardData = $event.clipboardData || window.clipboardData || $event.originalEvent.clipboardData;
                    if(clipboardData ){
                    pastedData = clipboardData.getData('Text');
                    newpasteDataArray = pastedData.split(String.fromCharCode(13));

                    // split rows into columns
                
                    
                    //var newpasteDataArray = (pastedData).split(/\r\n|\r|\n/g)
                    
                    // Do whatever with pasteddata
                    for (i=0; i<newpasteDataArray.length; i++) {
                        
                        newpasteDataArray[i] = (newpasteDataArray[i]).split(String.fromCharCode(9));
                         
                    }
                     
                    for (pp=0; pp<newpasteDataArray.length; pp++) {
                        
                       var aray = newpasteDataArray[pp]
                       
                        for (cell=0; cell< aray.length; cell++) {

                             if(document.getElementById('input-'+scope.tableId+'-'+(parseInt(startRow)+parseInt(pp))+'-'+(parseInt(columnRow)+parseInt(cell)))){
                                var tempElement = document.getElementById('input-'+scope.tableId+'-'+(parseInt(startRow)+parseInt(pp))+'-'+(parseInt(columnRow)+parseInt(cell)))
                                //console.log((parseInt(startRow)+parseInt(item)), (parseInt(columnRow)+parseInt(cell)), aray[cell] )
                               // console.log(tempElement);
                                if(tempElement != undefined && tempElement != null){
                                    //console.log(tempElement.getAttribute("cellref") );
                                    var elementArrayToUse = tempElement.getAttribute("cellref")
                                    scope.addRequest(aray,cell,tempElement)
                                }else{
                                row = scope.nextAvailable(parseInt(startRow)+parseInt(pp), (parseInt(columnRow)+parseInt(cell)) )
                                if(row === 'none'){
                
                                }else{
                                        var tempElement = document.getElementById('input-'+scope.tableId+'-'+(row)+'-'+(parseInt(columnRow)+parseInt(cell)))
                                        if(tempElement != undefined && tempElement != null){
                                        scope.addRequest(aray,cell,tempElement)
                                        }
                                }
                                
                                }
                             }
                             
                             
                             
                        }
                         
                    }
            
                    $tm1Ui.cellsetPut(scope.sendCellSetPutArray).then(function(result){
                        // console.log(result, "######## saved")
                         if(result.success){
                             
                            
                            scope.refreshNew(scope.dataset);
                
                         }else{
            
                         }
                    });
                   }
                   
           
                    
           }
           scope.nextAvailable = function(row, col){
               var tempElementTwo = document.getElementById('input-'+scope.tableId+'-'+(row+1)+'-'+col )
               if(tempElementTwo === undefined && tempElementTwo === null){
                   tempElementThree = document.getElementById('input-'+scope.tableId+'-'+(row+2)+'-'+col )
                   if(tempElementThree === undefined && tempElementTwo === null){
                        return 'none'
                   }else{
                       return ((row)+2)
                   }
               }else{
                   return ((row)+1)
               }
           }
           scope.addRequest = function(aray,cell,tempElement){
               var request = {
                   value: aray[cell], 
                   instance:scope.tm1Instance, 
                   cube: scope.cubeName, 
                   cubeElements:(tempElement.getAttribute("cellref")+'').split(',') 
                   }
                   
                   scope.sendCellSetPutArray.push(request);
           }
            scope.refresh();
            scope.setUpFreezePane();
               
           scope.drillNames = [];
           
           scope.getCellDrill = function(cubeElements){
            scope.drillNames = [];
            $tm1Ui.cellGetDrillNames(scope.tm1Instance,scope.cubeName,cubeElements).then(function(data){
                scope.tableDrillSource = [];
                scope.tableDrillCol = [];
                scope.datasetDrill= [];
                scope.tableDrill = [];
                 scope.drillNames = data;
               //console.log(data, "Transactional data")
                 $("#refModal"+scope.tableId).modal({show: true});
            });
           }
           scope.getDrillTable = function(cubeElements, name){
               scope.drillNameChosen = name;
                $tm1Ui.cellGetDrillNameTransactions(scope.tm1Instance,scope.cubeName, cubeElements, name).then(function(data){
                    if(data){
                        if(name === "Transactions"){
                            scope.datasetDrill = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, data);
                           
                            var options = {preload: false, watch: false};
                            if(scope.tableDrill){
                                
                              //  options.pageSize = scope.tableDrill.options.pageSize;
                                    
                            }
                            scope.tableDrill = $tm1Ui.tableCreate(scope, scope.datasetDrill.rows, options);
                        
                            scope.tableDrill.pageSize(scope.rowsToLoad)
                        }else{
                            scope.tableDrillSource = [];
                            scope.tableDrillCol = [];
                           // scope.tableDrill = data.value;
                           _.forEach(data.value[0], function(colvalue, colkey) {
                            scope.tableDrillCol.push(colkey);
                            //console.log(rowkey, rowvalue);
                             
                            });
                            _.forEach(data.value, function(value, key) {
                                scope.tableDrillSource[key] = [];
                                scope.tableDrillSource[key] = value;
                                 
                            });
                        }
                      //console.log(data, "Transactional data")
                        //scope.datasetDrill = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, data);
                        //var optionsDrill = {preload: false, watch: false};
                        //if(scope.tableDrill){
                         //   optionsDrill.index = scope.tableDrill.options.index;
                          //  optionsDrill.pageSize = scope.tableDrill.options.pageSize;
                                
                        //}
                        //scope.tableDrill = $tm1Ui.tableCreate(scope, scope.datasetDrill.rows, optionsDrill);
                    
                       // scope.tableDrill.pageSize(1000)
                    }  
                
                });
           }
          
           
                 
                scope.goToNewPage = function(url){
                    location.assign(url)
                }
                scope.rowsToDisplay = function(){
                    var count = 0;
                    var obg = scope.table.data();
                    var arrayOfAliasAndNames = [];
                    for(row in obg){
                        
                        if(obg[row].elements[0].element.attributes['Description']){
                             arrayOfAliasAndNames = obg[row].elements[0].element.attributes['Description'].toLowerCase()+" "+obg[row].elements[0].element.name +''+obg[row].elements[0].element.alias;
                        }else{
                            arrayOfAliasAndNames = ""+obg[row].elements[0].element.name+" ";
                        }
                         
                        if(scope.selections.searchRows && (arrayOfAliasAndNames).indexOf((scope.selections.searchRows).toLowerCase()) > -1){
                           
                            count++;
                           // console.log("rows to display",  arrayOfAliasAndNames, (arrayOfAliasAndNames).indexOf((scope.selections.searchRows).toLowerCase()) );
                        }else{
                            
                        }
                    }
                   
                    return count;
                }
                scope.dispatchResize = function(){
                    $timeout(
                        function(){
                            window.dispatchEvent(new Event('resize'));
                        },100
                    )
                     
                            
                       
                    
                }

                $(window).resize(function() { 
                  if( scope.api){
                    scope.api.refresh()
                  }
                           
                            scope.innerHeight = window.innerHeight;
                            scope.innerWidth =  window.innerWidth;
                    
                });
                
 

                scope.$watch(function () {
                    return $attributes.tableWidth;
                    
                    }, function (newValue, oldValue) { 
                        if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
                          //console.log(newValue, "Year changes inside directive");

                        }
                       
                                
                    })
 
                }


                
            };
        }]);



 
   
})();