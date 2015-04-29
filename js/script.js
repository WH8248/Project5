// list of places in Branson Possibly move to new file in future
var destinations = [
    {   
    title: "Silver Dollar City",
    lat: 36.670464,  
    lng: -93.337082,
    streetAddress: "399 Silver Dollar City Parkway",
    cityAddress: "Branson, MO 65616",
    url: "http://www.bransonsilverdollarcity.com/",
    type: "attraction",
    id: "nav0",
    visible: ko.observable(true),
    },
    {   
    title: "World's Largest Toy Museum",
    lat: 36.646402, 
    lng: -93.287108,
    streetAddress: "3609 West Highway 76",
    cityAddress: "Branson, MO 65616",
    url: "http://www.worldslargesttoymuseum.com/",
    type: "attraction",
    id: "nav1",
    visible: ko.observable(true),
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
    },
    {   
    title: "Ride The Ducks Branson",
    lat: 36.641179,  
    lng: -93.262898,
    streetAddress: "2320 MO-76",
    cityAddress: "Branson, MO 65616",
    type : "attraction",
    url: "http://www.ridetheducks.com/",
    id: "nav3",
    visible: ko.observable(true),
    },
    {
    title: "The Dinosaur Museum",
    lat:  36.647290,
    lng:  -93.287874,
    streetAddress: "3617 W 76 Country Blvd",
    cityAddress: "Branson, MO 65616",
    type: "attraction",
    url: "http://www.bransonworld.com/branson-attractions/tickets/branson-s-dinosaur-museum.html",
    id: "nav4",
    visible: ko.observable(true),
    },
    {   
    title: "Steak 'n Shake",
    lat:  36.651709, 
    lng: -93.297484,
    streetAddress: "1386 MO-376",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "http://www.steaknshake.com/locations/24123-steak-n-shake",
    id: "nav5",
    visible: ko.observable(true),
    },
    {
    title: "Burger Shack",
    lat: 36.640837, 
    lng: -93.256901,
    streetAddress: "1946 W 76 Country Blvd",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "http://www.urbanspoon.com/r/98/1702373/restaurant/The-Burger-Shack-Branson",
    id: "nav6",
    visible: ko.observable(true),
    },
    {
    title: "Red Lobster",
    lat: 36.652191, 
    lng: -93.288218,
    streetAddress: "3559 Shepherd of the Hills Expy",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "http://www.redlobster.com/",
    id: "nav7",
    visible: ko.observable(true),
    },
    {
    title: "Dannas BBQ",
    lat:  36.618744,
    lng:  -93.283614,
    streetAddress: "963 MO-165",
    cityAddress: "Branson, MO 65616",
    type: "food",
    url: "http://dannasbbq.com/",
    id: "nav8",
    visible: ko.observable(true),
    }   
];


// View map

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(36.643673,-93.218514),
    zoom:12,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"), mapProp);

var markerOptions = {
    position: new google.maps.LatLng(36.643673,-93.218514),
    animation:google.maps.Animation.BOUNCE
};
var marker = new google.maps.Marker(markerOptions);
marker.setMap(map);

var point = new google.maps.LatLng(36.670464,-93.337082);  // lat long on silver $ testing
var mark = new google.maps.Marker({
    position:point,
    map:map,
    title:'Silver Dollar City',
    //icon:'img/fun.png',
    //infowindow
})

}
google.maps.event.addDomListener(window, 'load', initialize);



//***** KO testing
// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
// Define a "Person" class that tracks its own name and children, and has a method to add a new child
var Person = function(name, children) {
    this.name = name;
    this.children = ko.observableArray(children);
 
    this.addChild = function() {
        this.children.push("New child");
    }.bind(this);
}
 
// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
var viewModel = {
    people: [
        new Person("Annabelle", ["Arnie", "Anders", "Apple"]),
        new Person("Bertie", ["Boutros-Boutros", "Brianna", "Barbie", "Bee-bop"]),
        new Person("Charles", ["Cayenne", "Cleopatra"])
        ],
    showRenderTimes: ko.observable(false)
};
 
ko.applyBindings(viewModel);