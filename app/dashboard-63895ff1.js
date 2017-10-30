!function(){"use strict";angular.module("eventsAdminApp",["sharedResources"]).filter("filterCategories",function(){return function(e,n){if(e){var t=[];return angular.forEach(e,function(e){e.parent==n&&e.name!=n&&t.push(e)}),t}}})}(),function(){"use strict";angular.module("eventsAdminApp").directive("selectOnClick",function(){return{restrict:"A",link:function(e,n){n.on("click",function(){this.select()})}}})}(),function(){"use strict";angular.module("eventsAdminApp").directive("shortcodeForm",["PLUGIN_ROOT",function(e){return{templateUrl:e+"/templates/dashboard/shortcodeForm.html",link:function(e){e.loading=!1,e.selectedCategories=[],e.viewType="",e.shortcode="",e.weekDefault="",e.viewTypes=[{name:"List View",value:"list"},{name:"Block View",value:"block"},{name:"Details",value:"details"}],e.createShortcode=function(){if(""!==e.viewType){e.shortcode="";var n=[];angular.forEach(e.selectedCategories,function(e){e=e.replace("-",""),n.push(e.trim())}),"list"==e.viewType?e.shortcode='[iss_events_manager view="list"]':"block"==e.viewType?e.shortcode='[iss_events_manager view="block"]':"details"==e.viewType&&(e.shortcode='[iss_events_manager view="details"]')}}}}}])}(),function(){"use strict";angular.module("sharedResources",[]).constant("PLUGIN_ROOT","/wp-content/plugins/iss_events_manager").constant("SEPARATOR","\n\n------------------------------\n").constant("AT_SIGN_REPLACEMENT","%%at%%").constant("FIELDS",{CATEGORIES:"Categories: ",DETAILS_URL:"Details URL: ",FEE:"Fee: ",RECTRAC_URL:"Registration URL: ",REGISTRATION_URL:"Registration URL: ",REGISTRATION_DEADLINE:"Registration deadline: ",DATE_DESCRIPTION:"Date description: "}).filter("unique",function(){return function(e,n){var t=[],r=[];return angular.forEach(e,function(e){var i=e;angular.forEach(n.split("."),function(e){i=i[e]}),-1===r.indexOf(i)&&(r.push(i),t.push(e))}),t}})}(),function(){"use strict";angular.module("sharedResources").controller("MainCtrl",["$scope","$timeout","appService",function(e,n,t){function r(){n(function(){void 0===gapi||void 0===gapi.client||void 0===gapi.client.setApiKey?r():t.appIsLoaded()},5)}var i;e.categories=[],e.loading=!0,e.init=function(n){i=angular.fromJson(n),e.loading=!1,e.categories=i.categories.all,e.view=i.view,e.calendarId=i.calendarId,e.eventId=i.eventId,e.detailsPage=i.detailsPage,e.settings=i.settings,t.init(i),r()}}])}(),function(){"use strict";angular.module("sharedResources").directive("loading",function(){return{template:'<div class="bsuEventSpinner"></loading>'}})}(),function(){"use strict";angular.module("sharedResources").service("appService",["$http","$q","googleApiService","PLUGIN_ROOT","AT_SIGN_REPLACEMENT",function(e,n,t,r,i){function a(){var n=[];angular.forEach(o.categories.all,function(e){n.push({name:e.name,parent:e.name}),angular.forEach(e.children,function(t){n.push({name:t,parent:e.name})})}),o.calendarId&&(o.calendarId=o.calendarId.replace(i,"@"));var a=o.categories.view,c=[];return void 0!==a&&a.length>0&&(c="all"===a?n:a.split(",")),e.get(r+"/config.json").then(function(e){return t.init(e.data),s={settings:e.data,config:{categories:n,view:c,defaultView:o.defaultView,calendarId:o.calendarId,eventId:o.eventId,detailsPage:o.detailsPage}},void 0!==o.icons&&(s.icons=o.icons),s})}var o,s,c=n.defer();this.init=function(e){o=e},this.runOnLoad=function(){return c.promise},this.appIsLoaded=function(){c.resolve(a())}}])}(),function(){"use strict";angular.module("sharedResources").service("dateService",function(){function e(e){return 10>e?"0"+e:e}this.getDateString=function(e,n,t){void 0===n&&(n="YYYY-MM-DD");var r=moment(e,["MM/DD/YYYY"]).format(n);return void 0!==t&&(r+="Z"),r},this.getDateTimeString=function(n,t){var r=moment().isDST()?"-06:00":"-07:00";return moment(e(n)+e(t),["MM/DD/YYYY h:mma"]).format("YYYY-MM-DDTHH:mm:ss"+r)},this.getDaysString=function(e){var n=[];return angular.forEach(e,function(e){switch(e){case"MO":n.push("M");break;case"TU":n.push("Tu");break;case"WE":n.push("W");break;case"TH":n.push("Th");break;case"FR":n.push("F");break;case"SA":n.push("Sa");break;case"SU":n.push("Su")}}),n.join("/")}})}(),function(){"use strict";angular.module("sharedResources").service("eventService",["AT_SIGN_REPLACEMENT",function(e){function n(e){return void 0!==e.start.date?e.start.date:e.start.dateTime}function t(e){return void 0!==e.end.date?e.end.date:e.end.dateTime}function r(n,t){var r=a.detailsPage;return r+=r.indexOf("?")>-1?"&":"?",r+="id="+n.id+"&cal="+t,r.replace("@",e)}function i(e,n,t,r,i){var a;if(n&&e.id){var o=t.format("YYYYMMDDTHHmmss"),s=r.format("YYYYMMDDTHHmmss");a="http://www.google.com/calendar/event?action=TEMPLATE&text="+e.summary+"&dates="+o+"/"+s+"&details="+i+"&location="+e.location+"&trp=false"}return a}var a;this.init=function(e){a=e},this.formatForDisplay=function(e,a){var o=e.description,s=n(e),c=t(e),u=moment(s,["YYYY-MM-DDTHH:mm:ssZ"]),l=moment(c,["YYYY-MM-DDTHH:mm:ssZ"]);return{id:e.id,calendarId:a,description:o,location:e.location,start:s,startMoment:u,end:c,duration:l.diff(u,"minutes"),allDay:u.isSame(l),summary:e.summary,title:e.summary,categories:null,url:r(e,a),googleCalUrl:i(e,a,u,l,o),recurrence:e.recurrence,recurringEventId:e.recurringEventId,registration:{url:null,deadline:null}}}}])}(),function(){"use strict";angular.module("sharedResources").service("googleApiService",["$q","eventService",function(e,n){var t="v3";this.init=function(e){gapi.client.setApiKey(e.apiKey),n.init(e)},this.getEvent=function(r,i){var a=e.defer();return r&&i?(gapi.client.load("calendar",t).then(function(){gapi.client.calendar.events.get({calendarId:r,eventId:i}).then(function(e){var t=n.formatForDisplay(e.result,r);a.resolve(t)},function(){a.reject("Error loading calendar event.")})}),a.promise):(a.reject("Calendar not found."),a.promise)},this.getEvents=function(r,i,a){var o=moment(),s=[],c=[];return gapi.client.load("calendar",t).then(function(){return angular.forEach(r,function(e){if(null!==e){var t=gapi.client.calendar.events.list({calendarId:e,singleEvents:!0,timeMin:i,timeMax:a}).then(function(t){angular.forEach(t.result.items,function(t){var r=n.formatForDisplay(t,e);c.push(r)})});s.push(t)}}),e.all(s).then(function(){return c=c.sort(function(e,n){return e.startMoment.isSame(n.startMoment)?0:e.startMoment.isAfter(n.startMoment)?1:-1}),{events:c,requestTime:o}})})},this.getRecurrenceForEvent=function(n,r){var i=e.defer();return void 0===n.recurrence&&void 0!==n.recurringEventId?gapi.client.load("calendar",t).then(function(){gapi.client.calendar.events.get({calendarId:n.calendarId,eventId:n.recurringEventId}).then(function(e){i.resolve(e.result.recurrence.shift())},function(){i.reject("Original recurring event not found.")})}):r(n.recurrence),i.promise}}])}();
//# sourceMappingURL=../app/maps/dashboard-63895ff1.js.map