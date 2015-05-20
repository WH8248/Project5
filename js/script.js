// check the size of the screen

var screenWidth = $(window).width();
var zoomSize;
if (screenWidth < 500) {  // phone
    "use strict";
    zoomSize = 11;
}
else if(screenWidth > 1100){  // PC
    "use strict";
    zoomSize = 13;
}
else {
    "use strict";
    zoomSize = 12;  // Tablet
}
// View map Google Map API
function initialize() {
  var mapProp = {
        center:new google.maps.LatLng(36.646402,-93.287108),
        zoom:zoomSize,  // was 13
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map"), mapProp);

    // add the Markers for all "destinations" to the map
    function dropMarkers (){
        for(i=0; i<destinations.length;i++){
            var infowindow = new google.maps.InfoWindow({
                content: destinations[i].title+destinations[i].type  
            });
            var point = new google.maps.LatLng(destinations[i].lat,destinations[i].lng);  
            var marker = new google.maps.Marker({
                position:point,
                map: map,
                title: destinations[i].title, 
            });               
            //When a marker is clicked the infoview opens and zooms in on the location in the map and uses Google Map View API
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function(){
                    var googlePicUrl = '<img src="https://maps.googleapis.com/maps/api/streetview?size=300x150&location=';
                    var headingPitch = '&heading='+destinations[i].heading+'&pitch=5';
                    var googlePic = googlePicUrl+destinations[i].lat+','+destinations[i].lng+headingPitch+
                    '"alt="Google Pic of'+destinations[i].title+'"><br>';
                    var infoString =  '<p>'+googlePic+'</p>'+'<strong>'+destinations[i].title+'</strong>'+'<br>'+
                    destinations[i].streetAddress+'<br>'+destinations[i].cityAddress+'<br><a href="http://'+
                    destinations[i].url+'"target="_blank">'+destinations[i].url+'</a>';
                    
                    infowindow.setContent(infoString);
                    infowindow.open(map,marker);
                    map.setCenter(marker.getPosition());
                    map.setZoom(zoomSize+3); // was 16
                };
            })(marker,i));
                
            //When a destination is selected in the list the infoview opens and zooms in on the location in the map and uses Google Map View API
            var searchList = $('#nav' + i);
            searchList.click((function(marker,i){
                return function() {

                    var googlePicUrl = '<img src="https://maps.googleapis.com/maps/api/streetview?size=300x150&location=';
                    var headingPitch = '&heading='+destinations[i].heading+'&pitch=5';
                    var googlePic = googlePicUrl+destinations[i].lat+','+destinations[i].lng+headingPitch+
                    '"alt="Google Pic of'+destinations[i].title+'"><br>';
                    var infoString =  '<p>'+googlePic+'</p>'+'<strong>'+destinations[i].title+'</strong>'+'<br>'+
                    destinations[i].streetAddress+'<br>'+destinations[i].cityAddress+'<br><a href="http://'+
                    destinations[i].url+'"target="_blank">'+destinations[i].url+'</a>';

                    infowindow.setContent(infoString);
                    infowindow.open(map,marker);
                    map.setCenter(marker.getPosition());
                    map.setZoom(zoomSize+3);  // was 16
                };
            })(marker,i));

            //reset the map view and close the infowindow
            function mapReset(){
                map.setZoom(zoomSize);  // was 13
                map.setCenter(mapProp.center);
                infowindow.close(map,marker);
            }    
            $("#reset").click(function() {
                mapReset();
            });
        }
    }
    dropMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);


var viewModel = {
    query: ko.observable(''),
};
//searches the list of destinations
viewModel.destinations = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(destinations, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.searchable = true;
            return marker.visible(true);
        } else {
            marker.searchable = false;            
            return marker.visible(false);
        }
    });       
}, viewModel);
ko.applyBindings(viewModel);


var searchVisible = true;
//Hides the search window if collapse icon is clicked
function noSearch() {
    $("#search-window").animate({ 
        height: "0px", 
    });           
    setTimeout(function() { 
        $("#search-window").hide(100);
    });     
    $("#collapse").attr("src", "img/expand.png");
    searchVisible = false;
}
//shows the search window if expand icon is clicked
function yesSearch() {
    $("#search-window").show();
    $("#search-window").animate({
        height: "450px" 
    });            
    $("#collapse").attr("src", "img/collapse.png");
    searchVisible = true;
}
// runs the expand or collapse function 
function hideSearch() {
    if(searchVisible === true) {
        noSearch();             
    } else { 
        yesSearch();  
    }
}
$("#collapse").click(hideSearch);  //runs on load


//Get Weather info
$(document).ready(function() {
    $.simpleWeather({
    location: 'Branson, MO',
    woeid: '',
    unit: 'f',
    success: function(weather) {
        html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
});
