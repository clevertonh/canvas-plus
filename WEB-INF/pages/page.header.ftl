<!-- This gets appended at the top for each page  -->
  
<div ng-show="$root.isPrinting ? false:true" id="page-header"  ng-controller="headerCtrl"   >
 
    <div ng-show='false'>
        <tm1-ui-user  ng-hide="true" tm1-instance="{{$root.defaults.settingsInstance}}" ng-model="$root.user"></tm1-ui-user>
        
    </div>
    <div id="mininavinternal"></div>
    

   
 
    <div ng-init=" $root.printOpened = false;" 
        style="position:fixed; top:0px; right:0px; z-index:99999; padding:10px; padding-right:0px; margin-right:50px; height:auto;" ng-if="$root.user.Name && !$root.userLoggedOut"  >       

        
            <ul class="nav navbar-top-links-v2 navbar-right  " style="color:#fff !important; background-color:transparent !important;"  >
            
            <li class="dropdown "  style="color:#fff !important; background-color:transparent !important;" >
                <span id="opened"  > 
                    <span class="inline-block-left" style="margin-right:5px;"> 
                        <small style="font-size:0.7em;">{{mouseOverUserClose && !$root.userLoggedOut ? 'Sign Out: '+($root.user.Name)+'': (!$root.userLoggedOut ? 'User: '+$root.user.Name+'' : '')}} </small>
                    </span> 
                         <span class="inline-block" >
                            <a  style="color:#fff; font-size:0.7em;" 
                            ng-mouseleave="mouseOverUserClose = false" 
                            ng-mouseover="mouseOverUserClose = true;" 
                            ng-click=" closeApplication($root.showView)" >
                                <i class="fa fa-user" aria-hidden="true"></i><sup><i class="fa fa-times text-right"  aria-hidden="true"></i></sup>

                            </a> 
                        </span> 
                  <!--  <span class="inline-block" >
                        <tm1-ui-session></tm1-ui-session>
                    </span> -->
                    
                </span>
            </li>
            <li 
                style="color:#fff !important; z-index:99999; background-color:transparent !important;">
                         
            </li>
            

             
    </ul>
     
    <div ng-style="{'top':'36px', 'background-color':$root.applicationHeaderColorSecondary, 'right': !$root.printOpened ? '-300px':'0px'}" 
                      
                     style="width:300px; padding:10px; position:fixed;  font-size:0.7em;  width:300px; float:right;  color:#333;  -webkit-transition:right 1s; transition-property:right; ">
                  <div class="paddingtop10"  style="padding-bottom:10px; border-bottom:1px solid #fff;" >                    
                    <span>
                      <select ng-model="print.pageOrientation" class="form-control printpageformat">
                        <option>Landscape</option>
                        <option>Portrait</option>
                      </select>
                      <select ng-model="print.pageSize" class="form-control printdropdown">
                        <option>A5</option>
                        <option>A4</option>
                        <option>A3</option>
                        <option>Letter</option>
                        <option>Tabloid</option>
                      </select>
                      
                      <select ng-init="print.outputType = $root.defaults.printOption" ng-model="print.outputType" class="form-control printdropdown">
                        <option value="pdf">PDF</option>
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                      </select>
                    </span>
                    <#if settings.getPrinterVersion() == "1">
                    <a style="color:#fff !important;"  href="print.pdf?url={{pageUrlEncoded()}}&orientation={{print.pageOrientation}}&page-size={{print.pageSize}}" target="_blank">
                    <#else>
                    <a style="color:#fff !important; margin-top:5px;  margin-bottom:5px;"  href="print-v2.pdf?url={{pageUrlEncoded()}}&orientation={{print.pageOrientation}}&page-size={{print.pageSize}}&output-type={{print.outputType}}" target="_blank">
                    </#if>
                        <i style="color:#fff !important; margin-top:5px;  margin-bottom:5px;"  class="fa fa-print fa-fw marginright15"></i> <span translate="PRINT" class="marginright15"></span>
                    </a>
                  </div>
                  <div style="border-color:#fff !important; margin-bottom:10px;" role="separator" class="divider"></div>
                  <div style="color:#fff !important;">
                      <a style="color:#fff !important;"  href="" ngclipboard data-clipboard-text="{{pageUrl()}}" ngclipboard-success="copySuccess(e);">
                        <i class="fa fa-clipboard fa-fw marginright15"  ></i> <span translate="COPYTOCLIPBOARD"></span>
                        <span class="pull-right">
                          <span ng-if="isCopied" class="label label-default" translate="COPIED"></span>
                        </span>
                      </a>
                  </div>
                </div> 
</div>
 
<div   ng-show="$root.isPrinting ? false:true"
    class="nav" 
    ng-if="$root.defaults.region && $root.selections.region" 
    id="header" 
    ng-init="animatePadding($root.defaultOffSet);   "  
    ng-style="{'background-image': 'url(images/'+$root.defaults.region+'.png)','background-color':$root.applicationHeaderColor, 'padding-top':$root.showView && $root.user.FriendlyName ? '98px': (!$root.showView && $root.user.FriendlyName ? (($root.innerHeight)*(1.3) )+'px':'100%')}" 
    style=" -webkit-transition:padding-top 1s; transition-property:padding-top;  -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;   transition-duration: 1s; vertical-align: bottom !important;  z-index:999;   position:fixed; top:0px; left:0px; width:100%;      background-position: center;  " ng-mouseover="$root.top = 65"   > 
    <span >
    <div   ng-style="{'background-color':$root.colortouse}" 
    style="pointer-events:none;width:100%; height:100%; display:block; position:absolute; top:0px; left:0px; z-index:-1;">
            <section ng-show="!$root.showView" class="rain"></section>

    </div> 
    
      <div  class="cloud-group-container " ng-if="$root.showClouds && !$root.showView || $root.scheduleShow"  ng-init="$root.myCloudGrouprandomAnim[$index] = $root.getRandomArbitrary(44,55);   " 
        ng-repeat-start="cloudGroup in  $root.cloudArray track by $index"  
        ng-style="{'top':($root.myCloudGrouprandomAnim[$index]/2)+'%','animation-delay':($index+1)+'s', 'animation-duration':(($root.myCloudGrouprandomAnim[$index]))+'s'}"   >
     
            <div ng-click="showRain = !showRain; createRain(showRain);" ng-init="$root.myRCloudGroupRandomAnim[$index] = $root.getRandomArbitrary(0.5,1)"  
                      id="cloud{{$index}}" class="cloud-group " 
                    ng-style="{'animation-delay':($index+1)+'s', 'animation-duration':(($root.myRCloudGroupRandomAnim[$index]))+'s'}">
            </div>
        </div>  
      <div   ng-click="showRain = !showRain; createRain(showRain);" class="cloud-container "
       ng-if="$root.showClouds && !$root.showView || $root.scheduleShow"  ng-init="$root.myCloudrandomAnim[$index] = $root.getRandomArbitrary(44,55);   " 
        ng-repeat-end="cloud in  $root.cloudArray track by $index"  
        ng-style="{'top':($root.myCloudrandomAnim[$index]/2)+'%','animation-delay':($index+1)+'s', 'animation-duration':(($root.myCloudrandomAnim[$index]))+'s'}"   >
            <div ng-init="$root.myRCloudRandomAnim[$index] = $root.getRandomArbitrary(0.5,1)"  
                      id="cloud{{$index}}" class="cloud " 
                    ng-style="{'animation-delay':($index+1)+'s', 'animation-duration':(($root.myRCloudRandomAnim[$index]))+'s'}">
            </div>
        </div>
    
    <div   style="-webkit-transition:padding-top 1s; transition-property:padding-top; transition-duration: 1s; width:100%; position:fixed; left:0px; top:0px; float:left; z-index:999999; padding-top:0px;  "  >
          
         
        <div style="position:fixed; display:block; top:0px; left:0px; width:80%;">
        <a href="#">
            <img src="images/logo.svg" 
            title="Your Logo Here" 
            style="background-size:contain;display:inline-block; float:left; height: 40px; position:relative; left:0px; top:0px;margin-top:5px; margin-left: 10px; z-index:999999;" /> 
        </a>
 
        </div>
        <span class="pull-left" style="  position:fixed; top:0px; left:50%; width:50%; background-color:rgba(0,0,0,0.6); color:#fff; text-align:center; margin-left:-25%;">
            
            <tm1-ui-dbr  ng-show="false"  tm1-read-only="true"
				tm1-instance="{{$root.defaults.settingsInstance}}" 
				tm1-cube="User Weather"
                 tm1-refresh-group="weatherGroup"  
				tm1-elements="{{$root.user.FriendlyName}},description,String"
                ng-model="$root.user['weatherDescription']"
				   >
			</tm1-ui-dbr>
            {{$root.user['weatherDescription']}}
            <tm1-ui-dbr  ng-show="false" tm1-read-only="true"
				tm1-instance="{{$root.defaults.settingsInstance}}"  
                tm1-refresh-group="weatherGroup"
				tm1-cube="User Weather"  
				tm1-elements="{{$root.user.FriendlyName}},temperature,String"
                ng-model="$root.user['weatherTemp']"
				  >
			</tm1-ui-dbr>
            <i class="fa fa-thermometer-three-quarters" area-hidden="true"></i> | {{$root.user['weatherTemp']}} &#8451; 
            <tm1-ui-dbr ng-show="false"  tm1-read-only="true"
				tm1-instance="{{$root.defaults.settingsInstance}}" 
                tm1-refresh-group="weatherGroup"
				tm1-cube="User Weather"  
				tm1-elements="{{$root.user.FriendlyName}},clouds,String"
                ng-model="$root.user['weatherClouds']"
                tm1-on-change="$root.createCloudArray($root.user['weatherClouds'], $root.user['weatherDescription']);"
				  >
			</tm1-ui-dbr>
            <tm1-ui-dbr  tm1-read-only="true"
				tm1-instance="{{$root.defaults.settingsInstance}}" 
                 tm1-refresh-group="weatherGroup"
				tm1-cube="User Weather"  
				tm1-elements="{{$root.user.FriendlyName}},city,String"
                ng-model="$root.user['city']"
                
				  >
			</tm1-ui-dbr>
            
            <span ng-if="$root.user['weatherClouds'] > -1 && $root.user['weatherDescription']" ng-init="$root.createCloudArray($root.user['weatherClouds'], $root.user['weatherDescription']);"></span>
               
     </span>
    </div>
     
    <ul class="navbuttons"   
        style="z-index:99999999; vertical-align: top !important; margin:0px; top:50px !important; position:fixed; padding-left:0px; background-color:transparent  " 
        ng-mouseleave = "status.isopen = false;" >
        <li   ng-click="  $root.showView = false; $root.scheduleShow = false; $root.calendarShow = false;  $root.applicationTriggerFindUser();  "   
            ng-show="!$root.subPathBoolean"
            id="home-nav-btn" ng-class="$root.activeTab === -1 || $root.activeTabOver === 'home' ? 'active':''"
            ng-mouseover="$root.activeTabOver = 'home'"  ng-mouseleave="$root.activeTabOver = ''" >
                
                <a href="#" data-toggle="tab">  
                    <i   class="fa fa-home fa-1x"></i>   
                    <span class="hidden-xs"> Home </span> 
                </a> 
                
            
            </li> 
            <li  ng-show="$root.subPathBoolean" >
                
                <a data-ng-href="{{'#/'+($root.selectedsubParentPage).split(' /')[0]}}"  >  
                    <i class="fa fa-angle-left fa-1x"></i>   
                    <span class="hidden-xs"> Back </span> 
                </a> 
                
            
            </li> 
            <li ng-mouseover="$root.activeTabOver = item.label; getLeftMargin('level-one-'+((item.label)).split(' ').join('-').toLowerCase()); "   ng-mouseleave="$root.activeTabOver = ''"
                ng-repeat="item in $root.menuData[0].children track by $index"   
                ng-show="$root.subPathBoolean && $root.activeTabOver === item.label" 
                ng-if="item.label "
                ng-class="$root.activeTabOver === item.label  || $root.activeTab === $index ? 'active':''" > 
               
      
                
               <div class="btn-group" uib-dropdown dropdown-append-to-body outsideClick is-open="status.isopen"  >
                   
                    <a ng-href="#/{{findClickthrough(item.data.page)}}"  
                     style="padding-bottom:1em;" ng-mouseover = "status.isopen = true; $root.indexOver = $index;  " 
                     ng-click="$root.indexOver = $root.showView ? $index:''; $root.showView = true; $root.calendarShow = false; $root.scheduleShow  = false; $root.applicationTriggerFindUser();"   >
                            <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i>   
                            <span class="hidden-xs"> 
                            {{item.label}}   
                            </span>
                            <span ng-if="$root.menuData[0]['children'][$index].children.length > 0" class="caret"></span>
                    </a>
               
                </div>

                
            
            </li> 
            <li  id="level-one-{{((item.label)).split(' ').join('-').toLowerCase()}}"
                ng-mouseover="$root.activeTabOver = item.label; getLeftMargin('level-one-'+((item.label)).split(' ').join('-').toLowerCase()); "   ng-mouseleave="$root.activeTabOver = ''"
                ng-repeat="item in $root.menuData[0].children track by $index"   
                ng-show="$root.subPathBoolean === false"
                ng-if="item.label "
                ng-class="$root.activeTabOver === item.label  || $root.activeTab === $index ? 'active':''" > 
               
                <div class="btn-group" uib-dropdown dropdown-append-to-body outsideClick is-open="status.isopen"  >
                   
                    <a ng-href="#/{{findClickthrough(item.data.page)}}"  
                     style="padding-bottom:1em;" ng-mouseover = "status.isopen = true; $root.indexOver = $index;  " 
                     ng-click="$root.indexOver = $root.showView ? $index:''; $root.showView = true; $root.calendarShow = false; $root.scheduleShow  = false; $root.applicationTriggerFindUser();"   >
                            <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i>   
                            <span class="hidden-xs"> 
                            {{item.label}}   
                            </span>
                            <span ng-if="$root.menuData[0]['children'][$index].children.length > 0" class="caret"></span>
                    </a>
               
                </div>

            </li>
            
            
            <li id="level-two-{{((subitem.label)).split(' ').join('-').toLowerCase()}}" 
                ng-class="subitem.data.page === $root.pathToUse || $root.activeTabOver === subitem.label ? 'active' :''"
                ng-show="$root.subPathBoolean" 
                ng-mouseover="$root.activeTabOver = subitem.label"  ng-mouseleave="$root.activeTabOver = ''" 
                ng-repeat="subitem in $root.menuData[0]['children'][$root.activeTab].children track by $index"  data-toggle="tab">

                  
                    <a  ng-click="$root.showView = true; $root.calendarShow = false; $root.scheduleShow  = false; $root.applicationTriggerFindUser();" ng-href="#/{{findClickthrough(subitem.data.page)}}"  href="#">
                     <i class="fa fa-fw {{subitem.icon_class}} fa-1x" ></i> 
                       <span class="hidden-xs">   {{subitem.label}} </span>
                    </a> 
                 
          
            </li> 
            
        </ul>
        
         <!--<div ng-click="  $root.scheduleShow = !$root.scheduleShow;  $root.showView =   $root.activeTab != '-1' && !$root.scheduleShow && !$root.calendarShow ? true : false; $root.calendarShow = false;  "
            ng-style="{'background-color': $root.scheduleShow ? $root.applicationHeaderColorSecondary : '#fff' ,  'color':$root.scheduleShow ?   '#fff': $root.applicationHeaderColorSecondary}"     
            class=" pull-right text-center " 
            style="box-shadow: 5px -5px 10px rgba(0,0,0,0.4) ; -webkit-transition:top 1s; transition-property:top; transition-duration: 1s;    position:fixed; top:50px; padding-top:1em; cursor:pointer;right:0px;  z-index:999; width:45px; height:50px;">
            <i class="fa fa-ellipsis-v" area-hidden="true"> </i> 
        </div> -->

        <div id="calendarBtn" ng-click=" $root.calendarShow = !$root.calendarShow;  $root.scheduleShow = false; $root.showView =  $root.activeTab != '-1' && !$root.calendarShow ? true : false"
            ng-style="{'background-color': $root.calendarShow ?  '#fff':$root.applicationHeaderColorSecondary ,  'color':$root.calendarShow ?   $root.applicationHeaderColorSecondary: '#fff'}"     
            class=" pull-right text-center " 
            style="  -webkit-transition:top 1s; transition-property:top; transition-duration: 1s;    position:fixed; top:50px; padding-top:1em; cursor:pointer;right:0px;  z-index:999; width:45px; height:50px;">
        <i   class="fa fa-calendar" area-hidden="true"> </i> 
        </div> 
          <div   class=" pull-right text-center " 
            style="  -webkit-transition:top 1s; transition-property:top; transition-duration: 1s;    position:fixed; top:0px; padding-top:1em; cursor:pointer;right:0px; background-color:steelblue;  z-index:999; width:45px; height:50px;" ng-click="showPrint()"   >
                  <i  style=" color:#fff !important;" class="fa fa-print fa-fw"></i>  
                </div>
                

    </div>
     
 
  
 
 
    <div class="right-hand-nav" id="righthandsidebar"  
    ng-if="$root.user.FriendlyName && $root.user.FriendlyName != undefined" 
    style="z-index:9999;"
    ng-init="  animatePaddingTopSideBar($root.defaultOffSet); sideOpened = false;"
    ng-style="{'margin-left':$root.topOffSet != $root.defaultOffSet ? '-300px':'0px' }"  
    >
             
            <div id="filterbtn" class=" btn btn-primary  " 
            style="color:#fff !important; padding:1.1em; padding-left:1.3em; padding-right:1.3em; position:absolute; z-index:999; border-radius:0px;  border:none; left:0px;   top:0px;   margin-left:-45px;"  
                ng-style="{'background-color':$root.applicationHeaderColorSecondary }"
                ng-click="sideOpened = !sideOpened; $root.topOffSet = $root.defaultOffSet; $root.topOffSetPageView = ($root.topOffSet); animateSideBar($root.topOffSet, $root.defaultOffSet, sideOpened); $root.triggerResize()" 
                ng-if="$root.topOffSet != $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </div>
            <div 
                class="  btn btn-primary  " 
                ng-style="{'background-color':$root.applicationHeaderColorSecondary }"
                style="color:#fff !important; position:absolute; padding:1.1em; padding-left:1.3em; padding-right:1.3em; z-index:999; border-radius:0px;  border:none; left:0px; top:0px;  margin-left:-45px;"  
                ng-click="sideOpened != sideOpened; $root.topOffSet = 200;  $root.topOffSetPageView = ($root.topOffSet); animateSideBar($root.topOffSet, $root.defaultOffSet, sideOpened);  $root.triggerResize()" 
                ng-if="$root.topOffSet === $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </div>
            <h4 style="padding-left:10px; color:#fff;">User Settings</h4>

            <div id="filtersubnm2" class="col-md-12 col-xs-12 filter-label" >  
                   
                    <span class="col-md-12 col-xs-12 label   pull-right small-label"  style="border-radius:0px;" >
                        <small class="pull-right"> Year</small>
                    </span> 
                    <tm1-ui-subnm 
                    ng-show="$root.rowDriver != 'Year' && $root.columnDriver != 'Year' "
                    tm1-instance="{{$root.defaults.settingsInstance}}"  
                    ng-if="$root.defaults.year != '' " 
                    tm1-dimension="Year" 
                    tm1-subset="All Years" 
                    tm1-default-element="{{$root.defaults.year}}"  
                    tm1-attribute="Caption_Default" 
                    tm1-select-only="false" 
                    ng-model="$root.selections.year"
                    tm1-on-change='updateSettings($root.values, $root.defaults, $root.selections, "year", {"tm1Dimension":"Year", "tm1Alias":"Caption_Default", "value":data});    '
                    ></tm1-ui-subnm>
            </div>   
            <div class="col-xlg-12 col-xs-12"> 
             <small class="pull-right" style="color:#fff;"> Region</small><br>
                <tm1-ui-subnm 
                ng-show="$root.rowDriver != 'Region' && $root.columnDriver != 'Region' "
                ng-if="$root.defaults.region != ''"
                tm1-instance="{{$root.defaults.settingsInstance}}" 
                tm1-dimension="Region" 
                tm1-subset="Default" 
                tm1-select-only="false"
                 tm1-default-element="{{$root.defaults.region}}"  
                ng-model="$root.selections.region"
                tm1-on-change='updateSettings($root.values, $root.defaults, $root.selections, "region", {"tm1Dimension":"Region", "tm1Alias":"Description", "value":data})'
                ></tm1-ui-subnm>
            </div>
            <div class="col-xlg-12 col-xs-12">
             <small class="pull-right" style="color:#fff;"> Department</small><br>
                <tm1-ui-subnm 
                ng-show="$root.rowDriver != 'Department' && $root.columnDriver != 'Department' "
                    ng-if="$root.defaults.department != ''"
                    tm1-instance="{{$root.defaults.settingsInstance}}"
                    tm1-default-element="{{$root.defaults.department}}"  
                    tm1-dimension="Department" tm1-subset="Default" tm1-select-only="false" ng-model="$root.selections.department"
                    tm1-on-change='updateSettings($root.values, $root.defaults, $root.selections, "department", {"tm1Dimension":"Department", "tm1Alias":"Product Category", "value":data})'
                ></tm1-ui-subnm>
            </div>


            <div class="col-xlg-12 col-xs-12">
                <h4 class="text-left" style="margin-bottom:0px; border-bottom:1px solid #fff; color:#fff;">User Preferences</h4>
                <span class="pull-left"  ng-click="$root.nightTime = !$root.nightTime; changeBg(); " 
                    style="color:#fff; display:inline-block; padding-left:0px; padding-top:10px;">
                    Dark Mode <i ng-class="{'fa-toggle-on': $root.nightTime  , 'fa-toggle-off': !$root.nightTime  }" class="fa  "></i>

                </span>

            </div>


        </div>
        <div id="page-title" class="col-md-12 col-xs-12 nopadding titleArea" 
            ng-if="$root.selections.year && $root.selections.region && $root.selections.department"
            ng-style="{'top':(($root.defaultOffSet*2)-5)+'px', 'margin-top':'0px'}" 
        >
        <h4 style="   width:100%; " 
        class="text-left pull-left">
          {{($root.subPathBoolean ? ($root.selectedsubParentPage):'') | capitalize }}{{$root.pageTitle}} <i ng-if="$root.isLoading"  class="fa fa-refresh fa-spin" ></i>
        
          <span class="hidden-xs pull-right text-right" ng-show="$root.topOffSet === $root.defaultOffSet"> 
            
 
            {{$root.defaults.year}} | 
            <tm1-ui-dbra tm1-instance="{{$root.defaults.settingsInstance}}" tm1-dimension="Region" tm1-element="{{$root.defaults.region}}" tm1-attribute="Description"  ng-model="$root.defaults.regionName" 
             tm1-read-only="true"></tm1-ui-dbra> <span ng-if=" $root.defaults.regionName " ng-init=" $root.getWeather($root.defaults.regionName, $root.user.FriendlyName);"></span>| 
            <tm1-ui-dbra ng-if="$root.defaults.department" tm1-instance="{{$root.defaults.settingsInstance}}" tm1-dimension="Department" tm1-element="{{$root.defaults.department}}" tm1-attribute="Product Category"  ng-model="$root.defaults.departmentName" tm1-read-only="true"></tm1-ui-dbra> 
            
        </span>
      
    </h4>
</div>
</div>
<style>
  a:hover, a:focus {
    color: #555;
    text-decoration: none !important;
}
</style>
<ul ng-mouseleave = "$root.indexOver =  ''   " 
    id="pop-over-body" 
    ng-if="$root.showView && $root.menuData[0]['children'][$root.indexOver].children.length > 0" 
    style="top:75px !important; font-size:0.7em; margin-top:0px;"  class="popOverContainer" >
    <li ng-repeat="subitem in $root.menuData[0]['children'][$root.indexOver].children track by $index" 
    ng-mouseover="$root.subPageOver = subitem.label"
    ng-style="{'background-color':$root.subPageOver != subitem.label ? $root.applicationHeaderColorSecondary : '#fff', 'color':$root.subPageOver != subitem.label ?  '#fff' : $root.applicationHeaderColorSecondary  }"
    role="menuitem" 
    ng-click="status.isopen = false; $root.indexOver = '';  " 
    style="cursor:pointer; margin:0px; text-decorations:none; padding:0px; padding:1em; border-bottom:thin solid #777;  ">
        <a class="listitem" ng-href="#/{{findClickthrough(subitem.data.page)}}" 
         ng-style="{'color':$root.subPageOver != subitem.label ?  '#fff':$root.applicationHeaderColorSecondary}"
         style=" width:100%; margin:0px; padding-top:1em; text-decorations:none;">{{subitem.label}} 
        <span style="display:inline-block; float:left; text-align:left; position:absolute; left:0px;   width:100%; height:47px; "></span></a>  
    </li>
</ul>
 
 <div ng-if="!$root.showView && $root.selections.year" ng-init="$root.loadcalendarYearIsHere()"> 
    <div ng-mousemove="mouseMovedSetXY($event); "  class="container" 
        ng-style="{'height':($root.innerHeight)-180+'px'}" 
        style="top:120px; pointer-events:none !important;"  >
        
         

        <div  ng-mouseover="$root.mouseOverBird = true" ng-mouseleave="$root.mouseOverBird = false" ng-mouseleave="$root.mouseOverBird = false" ng-mouseover="$root.mouseOverBird = true" 
            ng-mousedown="$root.birdsCapturedCount = $root.birdsCapturedCount+1; $root.birdKilledArray[$index] = true;" 
            ng-repeat="bird in ['','','','','','','','', '', '', '', '', '', ''] track by $index" 
            ng-init="$root.myrandomAnim[$index] = $root.getRandomArbitrary(8,14);   " 
            class="bird-container " 
            ng-style="{'top':($root.myrandomAnim[$index])+'%','animation-delay':($index+1)+'s', 'animation-duration':(($root.myrandomAnim[$index]))+'s'}"   >
                
                <div ng-init="$root.myRRandomAnim[$index] = $root.getRandomArbitrary(0.5,1)"  
                    ng-show="!$root.birdKilledArray[$index]"   id="bird{{$index}}" class="bird " 
                    ng-style="{'animation-delay':($index+1)+'s', 'animation-duration':(($root.myRRandomAnim[$index]))+'s'}">
                </div>
        </div>
        <div class="targetSVG" ng-show="$root.mouseOverBird" ng-style="{'height':$root.defaultOffSet+'px', 'width':$root.defaultOffSet+'px', 'top':($root.windowclientY-25)+'px', 'left':($root.windowclientX-25)+'px'}" style="position:fixed;  " 
        >

    </div>
        
            
         <calendar 
            ng-if="$root.selections.year && $root.user.FriendlyName" 
            tm1-instance="{{$root.defaults.settingsInstance}}" 
            selected-year="{{$root.selections.year}}"
            cube-name = "Calendar"
            user="{{$root.user.FriendlyName}}"
          ></calendar> 
        
    </div>

         
  
    
    
</div>
