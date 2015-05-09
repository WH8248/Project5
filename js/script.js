// check the size of the screen
//note my full screen - 1280    ipad - 1024  iphone 5 - 320
var screenWidth = $(window).width();
var zoomSize;
if (screenWidth < 500) {  // phone
    zoomSize = 11;
}
else if(screenWidth > 1100){  // PC
    zoomSize = 13;
}
else {
    zoomSize=12;  // Tablet
}

// list of places in Branson Possibly move to new file in future
var destinations = [
    {   
    title: "Silver Dollar City",
    lat: 36.670464,  
    lng: -93.337082,
    streetAddress: "399 Silver Dollar City Parkway",
    cityAddress: "Branson, MO 65616",
    url: "www.bransonsilverdollarcity.com/",
    type: "attraction",
    id: "nav0",
    visible: ko.observable(true),
    searchable: true
    },
    {   
    title: "World's Largest Toy Museum",
    lat: 36.646402, 
    lng: -93.287108,
    streetAddress: "3609 West Highway 76",
    cityAddress: "Branson, MO 65616",
    url: "www.worldslargesttoymuseum.com/",
    type: "attraction",
    id: "nav1",
    visible: ko.observable(true),
    searchable: true
    },
    {   
    title: "French Quarter Resort",
    lat: 36.648267,
    lng: -93.290391,
    streetAddress: "3706 W 76 Country Blvd",
    cityAddress: "Branson, MO 65616",
    url: "www.spinnakerresorts.com/",
    type: "homeBase",
    id: "nav2",
    visible: ko.observable(true),
    searchable: true
    },
    {   
    title: "Ride The Ducks Branson",
    lat: 36.641179,  
    lng: -93.262898,
    streetAddress: "2320 MO-76",
    cityAddress: "Branson, MO 65616",
    type : "attraction",
    url: "www.ridetheducks.com/",
    id: "nav3",
    visible: ko.observable(true),
    searchable: true
    },
    {
    title: "The Dinosaur Museum",
    lat:  36.647290,
    lng:  -93.287874,
    streetAddress: "3617 W 76 Country Blvd",
    cityAddress: "Branson, MO 65616",
    type: "attraction",
    url: "www.bransonworld.com/branson-attractions/tickets/branson-s-dinosaur-museum.html",
    id: "nav4",
    visible: ko.observable(true),
    searchable: true
    },
    {   
    title: "Steak 'n Shake",
    lat:  36.651709, 
    lng: -93.297484,
    streetAddress: "1386 MO-376",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "www.steaknshake.com/locations/24123-steak-n-shake",
    id: "nav5",
    visible: ko.observable(true),
    searchable: true
    },
    {
    title: "Burger Shack",
    lat: 36.640837, 
    lng: -93.256901,
    streetAddress: "1946 W 76 Country Blvd",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "www.urbanspoon.com/r/98/1702373/restaurant/The-Burger-Shack-Branson",
    id: "nav6",
    visible: ko.observable(true),
    searchable: true
    },
    {
    title: "Red Lobster",
    lat: 36.652191, 
    lng: -93.288218,
    streetAddress: "3559 Shepherd of the Hills Expy",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "www.redlobster.com/",
    id: "nav7",
    visible: ko.observable(true),
    searchable: true
    },
    {
    title: "Dannas BBQ",
    lat:  36.618744,
    lng:  -93.283614,
    streetAddress: "963 MO-165",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "dannasbbq.com",
    id: "nav8",
    visible: ko.observable(true),
    searchable: true
    }   
];
// View map
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
                //icon: none;
                //icon: "img/foodPointer.png",
                title: destinations[i].title,                
            });
                    
            
            //When a marker is clicked the infoview opens and zooms in on the location in the map
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function(){

                    var googlePicUrl = '<img src="https://maps.googleapis.com/maps/api/streetview?size=200x100&location=';
                    var googlePic = googlePicUrl+destinations[i].lat+','+destinations[i].lng+'"alt="Google Pic of'+destinations[i].title+'"><br>';
                    //console.log(googlePic);   ***** NEED TO FIX all images**********
                    var infoString =  '<p>'+googlePic+'</p>'+'<strong>'+destinations[i].title+'</strong>'+'<br>'+destinations[i].streetAddress+'<br>'+
                    destinations[i].cityAddress+'<br><a href="http://'+destinations[i].url+'"target="_blank">'+destinations[i].url+'</a>';
                    
                    infowindow.setContent(infoString);
                    infowindow.open(map,marker);
                    map.setCenter(marker.getPosition());
                    map.setZoom(zoomSize+3); // was 16
                }
            })(marker,i));
            //When a destination is selected in the list the infoview opens and zooms in on the location in the map
            var searchList = $('#nav' + i);
            searchList.click((function(marker,i){
                return function() {

                    var googlePicUrl = '<img src="https://maps.googleapis.com/maps/api/streetview?size=200x100&location=';
                    var googlePic = googlePicUrl+destinations[i].lat+','+destinations[i].lng+'"alt="Google Pic of'+destinations[i].title+'"><br>';
                    //console.log(googlePic);   ***** NEED TO FIX all images**********
                    var infoString =  '<p>'+googlePic+'</p>'+'<strong>'+destinations[i].title+'</strong>'+'<br>'+destinations[i].streetAddress+'<br>'+
                    destinations[i].cityAddress+'<br><a href="http://'+destinations[i].url+'"target="_blank">'+destinations[i].url+'</a>';

                    infowindow.setContent(infoString);
                    infowindow.open(map,marker);
                    map.setCenter(marker.getPosition());
                    map.setZoom(zoomSize+3);  // was 16
                };
            })(marker,i));
        }
    }
    dropMarkers();

    //reset the map view
    function mapReset(){
        map.setZoom(zoomSize);  // was 13
        map.setCenter(mapProp.center);
    }
    
    $("#reset").click(function() {
        mapReset();
    });
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


// add either the expand or collapse button
var screenHeight = $(window).height();

var searchVisible = true;
function noNav() {
    $("#search-window").animate({ // runs on collapse
                height: 0, 
            }, 500);           
            setTimeout(function() {   // runs on collapse
                $("#search-window").hide();
            }, 500);    
            $("#collapse").attr("src", "img/expand.png");
            searchVisible = false;
}
function yesNav() {
    $("#search-window").show();
            var scrollerHeight = $("#scroller").height() + 55;
            if(screenHeight < 600) {   // runs on expand iphone
                $("#search-window").animate({
                    height: scrollerHeight - 100,
                }, 500, function() {
                    $(this).css('height','auto').css("max-height", 439);
                });   
            } else {   // runs on expand full screen & iphone
            $("#search-window").animate({
                height: scrollerHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
            }
            $("#collapse").attr("src", "img/collapse.png");
            searchVisible = true;
}

function hideNav() {
    if(searchVisible === true) {  //runs on collapse
            noNav(); 
            
    } else {   //runs on expand
            yesNav();  
    }
}
$("#collapse").click(hideNav);  //runs on load
