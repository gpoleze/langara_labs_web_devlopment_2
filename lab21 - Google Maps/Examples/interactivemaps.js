(function (parameter) {
	'use strict';
	
	$(document).ready(function(){
 	    registerHandlers();
		initializeMap();
	});
	
	// one scoped object
	// keeps a reference to the map and to an array of old markers on the map
	var myData = { map: null, oldMarkers: [] };
	
	var initializeMap = function () {
		// make a coordinate for the center of the map
		var mapCenter = new google.maps.LatLng(49.239569,-123.021469);
		// decide some of the options for the map itself
		var myOptions = {
		  zoom: 11,
		  center: mapCenter,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		// creates a new map based on the id in the html and the options built above.
		myData.map = new google.maps.Map(langara.get(parameter.canvasID, true),
			myOptions);
		
		// create marker on the map	with a mouse over title
		var marker = new google.maps.Marker({
		  position: mapCenter, 
		  map: myData.map, 
		  title:"Hello World!"
		  }); 
		
		// Build the content for a information window that is coming soon.  Notice you can use any html tags.
		var contentString = '<h2>An interactive system</h2><p>Use the controls and see the markers change</p>';  
		
		// Create the information window using the content from above
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		// show the information window
		infowindow.open(myData.map,marker);
		
		// set a time out function that will automatically close the information window and make the marker invisible
		setTimeout(function(){ infowindow.close(); marker.setVisible(false); }, 8000);  // close the window after 8 secs 
		 
	  }
	
	// This is the function activated by the button on the screen.  It grabs the appropriate fields from the form
	// and does the AJAX call
	var getMarkers = function () {
		// give me the value of only the radio button that is checked.  Nice bit of jQuery, eh?
		var whichLocation = $("input[type=radio]:checked").val();
		var request = $.ajax({
				cache: false,
				url: "mapdata.php",
				type: "GET",
				data: {location : whichLocation},
				dataType: "json",
				success: showMarkers
			});
	  }
	
	// This is the function that is called when the AJAX call is finished.  It parses through the new data and places 
	// the next collection of markers on the map.  
	var showMarkers = function(theMarkerData) {  // This will be an array of records
	
		// if there is data	
		if (theMarkerData.length > 0) {
			// erase the old markers off the map one by one
			for (var j=0; j<myData.oldMarkers.length; j++)
			{
				myData.oldMarkers[j].setMap(null);
			}
			// empty the array itself
			myData.oldMarkers = [];
			// put new markers on the map one by one
			for (var i=0; i<theMarkerData.length; i++) {
				// build a new location
				var location = new google.maps.LatLng(theMarkerData[i].lat,theMarkerData[i].long);
				// make a marker for it
				var marker = new google.maps.Marker({
				  position: location, 
				  map: myData.map,
				  animation: google.maps.Animation.DROP, 
				  title:theMarkerData[i].comment
				  });
				// keep each marker
				myData.oldMarkers.push( marker ); 
			}
		}
	  }
	  
	  var registerHandlers = function ()
	  {
		langara.registerEventHandler(parameter.buttonID, 'click', getMarkers);
	  };
	
})( {buttonID:'myButton',
     canvasID: 'map_canvas'} );