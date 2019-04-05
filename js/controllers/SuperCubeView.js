(function(){
        var app = angular.module('app');
        app.directive('superCubeView', ['$log','$rootScope','$tm1Ui', '$timeout', '$window', function($log, $rootScope, $tm1Ui, $timeout , $window) {
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

                
        var chart;
        scope.chartContainer; 
        scope.options = {
            "chart": {
              "type": "lineChart",
              "height": 450,
              "margin": {
                "top": 20,
                "right": 20,
                "bottom": 40,
                "left": 55
              },
              "useInteractiveGuideline": false,
              "dispatch": {},
              "xAxis": {
                "axisLabel": "",
                "dispatch": {},
                "axisLabelDistance": 0,
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
                "dispatch": {},
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
                "clipVoronoi": true,
                "showVoronoi": false,
                "id": 53376,
                "interactiveUpdateDelay": 300,
                "showLabels": false,
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
                "dispatch": {},
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
                "dispatch": {},
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
                "dispatch": {},
                "tooltip": {
                  "duration": 0,
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
              "duration": 250,
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
              "showLegend": false,
              "legendPosition": "top",
              "showXAxis": true,
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
        scope.config = {
            visible: true, // default: true
            extended: false, // default: false
            disabled: true, // default: false
            refreshDataOnly: false, // default: true
            deepWatchOptions: false, // default: true
            deepWatchData: false, // default: true
            deepWatchDataDepth: false, // default: 2
            debounce: 10 // default: 10
        };
          scope.events = function(){

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
                                        if(scope.table.data().length < 20){
                                            scope.options['chart']['useInteractiveGuideline'] = true; 
                                        }else{
                                            scope.options['chart']['useInteractiveGuideline'] = false; 
                                        }
                                       
                                        var jsonRowData = [];
                                        var colNameArray = [];
                                        var rowNameArray = [];
                                        for(ggh = 0; ggh < scope.dataset.headers.length; ggh++){
                                            var myColObj = scope.dataset.headers[ggh];
                                            var arrayToUse= [];
                                             
                                            for(jjk = 0; jjk < myColObj.columns.length; jjk++){
                                                 if(colNameArray[jjk]){
                                                    colNameArray[jjk] +=  (myColObj.columns[jjk].element['attributes']['Caption_Default']);
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
                                                        rowNameArray[gggh] +=  ' - ' + (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }
                                                }else{
                                                    if(rowNameArray[gggh]){
                                                        rowNameArray[gggh] +=  ' - ' + (myRowObjElement.elements[jjjk].element.name);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.name);
                                                      }
                                                }
                                                   
                                                     
                                              
                                            }
                                            rowNameFinalArray[gggh] = rowNameArray[gggh];
                                            rowNameArray = [];
                                        }
                                        console.log(colNameArray, "colNameArray")
                                        for(row in scope.table.data()){
                                            var randomColor =  '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
                                            var cellArrayFromJson = [];
                                            jsonRowData[row] =  {"key": '',
                                            "color": randomColor, "values":[]};
                                            for(var gs = 0; gs < scope.table.data()[row].cells.length; gs++){
                                                if(scope.table.data()[row].elements.length){
                                                    jsonRowData[row].key = rowNameFinalArray[row] ;
                                                }
                                                 
                                                       
                                                        cellArrayFromJson.push({"x":gs,"y": Math.round(scope.table.data()[row].cells[gs].value)});
                                                    
                                                         
                                                     
                                                     
                                                  
                                                    
                                                    
                                            }
                                            var tt = JSON.stringify(cellArrayFromJson) 
                                            jsonRowData[row]["values"] = JSON.parse(tt);
                                            console.log(jsonRowData[row]) 
                                        }
                                         
                                             
                                       
                                       //scope.tableData = scope.table.data();
                                       scope.data = jsonRowData;
                                      
                                        scope.api.refresh();

                                       jsonRowData = [];
                                       scope.getLastFocus(); 
                                       
                                } else {
                                   scope.message = result.message; 
                               } 
                              
                           })
                      
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
                                        if(scope.table.data().length < 20){
                                            scope.options['chart']['useInteractiveGuideline'] = true; 
                                        }else{
                                            scope.options['chart']['useInteractiveGuideline'] = false; 
                                        }
                                       
                                        var jsonRowData = [];
                                        var colNameArray = [];
                                        var rowNameArray = [];
                                        for(ggh = 0; ggh < scope.dataset.headers.length; ggh++){
                                            var myColObj = scope.dataset.headers[ggh];
                                            var arrayToUse= [];
                                             
                                            for(jjk = 0; jjk < myColObj.columns.length; jjk++){
                                                 if(colNameArray[jjk]){
                                                    colNameArray[jjk] +=  (myColObj.columns[jjk].element['attributes']['Caption_Default']);
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
                                                        rowNameArray[gggh] +=  ' - ' + (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.attributes['Description']);
                                                      }
                                                }else{
                                                    if(rowNameArray[gggh]){
                                                        rowNameArray[gggh] +=  ' - ' + (myRowObjElement.elements[jjjk].element.name);
                                                      }else{
                                                        rowNameArray[gggh] =   (myRowObjElement.elements[jjjk].element.name);
                                                      }
                                                }
                                                   
                                                     
                                              
                                            }
                                            rowNameFinalArray[gggh] = rowNameArray[gggh];
                                            rowNameArray = [];
                                        }
                                        console.log(colNameArray, "colNameArray")
                                        for(row in scope.table.data()){
                                            var randomColor =  '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
                                            var cellArrayFromJson = [];
                                            jsonRowData[row] =  {"key": '',
                                            "color": randomColor, "values":[]};
                                            for(var gs = 0; gs < scope.table.data()[row].cells.length; gs++){
                                                if(scope.table.data()[row].elements.length){
                                                    jsonRowData[row].key = rowNameFinalArray[row] ;
                                                }
                                                 
                                                       
                                                        cellArrayFromJson.push({"x":gs,"y": Math.round(scope.table.data()[row].cells[gs].value)});
                                                    
                                                         
                                                     
                                                     
                                                  
                                                    
                                                    
                                            }
                                            var tt = JSON.stringify(cellArrayFromJson) 
                                            jsonRowData[row]["values"] = JSON.parse(tt);
                                            console.log(jsonRowData[row]) 
                                        }
                                         
                                             
                                       
                                       //scope.tableData = scope.table.data();
                                       scope.data = jsonRowData;
                                      
                                        scope.api.refresh();

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
                        scope.offsetTop = 0;
                        var el = $('#stickyContainer'+scope.tableId);
                        $body = $(el);  
                        $stickyHeader = $(el).find('#sticky-header');
                        $fixedHeader = $(el).find('.fixed-container');
                        $fixedFirstColHeader = $(el).find('.fixedFirstColHeader');
                        //$headerContent = $(el).find('#headerContent');
                        $sideContent = $(el).find('#sideContent'+scope.tableId);           
                        scope.scrolling = true;
                        $($stickyHeader).css('display','block'); 
                        $($sideContent).css('display', 'block');
                         
                             var valuetoEval = scope.offsetTop;
                       
                             scope.scrollAmountTop =  $($body).scrollTop();
    
                            if($($body).scrollTop() >= parseInt(valuetoEval) || $($body).scrollLeft() >= 0){
        
                                scope.headerOutOffView = true;
                              //console.log("view header")
                                if($($stickyHeader)){
                                    $($stickyHeader).css('display','block'); 
                                    $($stickyHeader).css('opacity','1'); 
                                    $($stickyHeader).css('pointer-events','auto'); 
                                }
                                if($($fixedHeader) && $($fixedFirstColHeader)){
                                    $($fixedHeader).css('pointer-events','auto'); 
                                    $($fixedFirstColHeader).css('display','block !important');
                                }
                               
                               
                                if( $($sideContent)){
                                    $($sideContent).css('display', 'block');
                                    $($sideContent).css('margin-top', -$($body).scrollTop());
                                    
                                    $($sideContent).css('height', (((window.innerHeight - (scope.tableHeightBottomOffset)-(157+(document.getElementById('head'+scope.tableId).getBoundingClientRect().height ) )) )) + $($body).scrollTop());
                                                                    
                                }
                               
                                 
                            }else{
                                 
                                scope.headerOutOffView = false;
                              //console.log("hide header")
                                if($($stickyHeader)){
                                    $($stickyHeader).css('opacity','0'); 
                                    $($stickyHeader).css('pointer-events','none'); 
                                }
                                if($($fixedHeader)){
                                    $($fixedHeader).css('pointer-events','none'); 
                                }
                                if($($fixedFirstColHeader)){
                                    $($fixedFirstColHeader).css('display','none !important'); 
                                }
                                 
                                 
                                 
                                  
                            } 
                             if($($stickyHeader)){
                                $($stickyHeader).css('margin-left', -$($body).scrollLeft());
                             }
                            
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
                        console.log("looking for freezepane");
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
                        document.getElementsByClassName('tm1-ui-export')[ff].innerText = '';
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
                    return document.getElementById('stickyContainer'+scope.tableId).getBoundingClientRect().width - 12 ;
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
               
                         
                        if(document.getElementById(id) && document.getElementById(id).getElementsByClassName('fixed-container').length > 0 ){
                          //console.log(((document.getElementById(id).getBoundingClientRect().height - document.getElementById(id).getElementsByClassName('fixed-container')[0].getBoundingClientRect().height)  +  Math.abs(scope.scrollAmountTop) ))
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