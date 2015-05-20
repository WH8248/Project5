Udacity Neighborhood Map: Project 5 William Harris

Help from:
Introduction to the Google Maps API - https://www.youtube.com/watch?v=ZE8ODPL2VPI
w3schools - http://www.w3schools.com/googleapi/google_maps_basic.asp and many other places
http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
http://simpleweatherjs.com/
http://www.w3schools.com/cssref/css3_pr_mediaquery.asp
Examples from Git Hub


To run the app please download the zip files avalilbe at the URL below to your local and open the index.html:
https://github.com/WH8248/Project5


This is a Map of Branson MO and several destinations
When the Map opens 
	drops markers of the destinations
	Adds a list on the top left of the destination
	Adds a "collapse" icon under the list
	Adds the "Reset Map" icon bottom right
	Using simpleweather API adds the temp and weather icon in the top right

On a destination Marker click
	Centers map at marker
	zooms in on marker location
	opens infowindow with:
		Google Maps API street view of the destination
		Lists the name of the destination
		Gives the address of the destination
		Provides a clickable URL of the destination

On a destination List click
	Centers map at marker
	zooms in on marker location
	opens infowindow with:
		Google Maps API street view of the destination
		Lists the name of the destination
		Gives the address of the destination
		Provides a clickable URL of the destination

On text entered in Search box searches title for match and returns only matches

On a "collapse" click the list is hidden and displays an "expand" icon

On a "expand" click the list is hidden and displays an "collapse" icon

On "Reset Map" click
	Resets the map to the original size
	clears any open infowindows

The map will size for the screen
	if the width is too small to properly display the weather it is not displayed
	if the length is too short to properly display the list it is not displayed
	The zoom for the map will adjust so all the markers fit properly
	