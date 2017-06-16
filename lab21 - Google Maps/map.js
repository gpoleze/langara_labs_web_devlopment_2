(function () {
    "use strict";

    $(document).ready(function () {
        //REgister handlers
        initializeMap();
    });

    var myData = { map: null, oldMarkers: [] };

    function initializeMap() {
        // make a coordinate for the center of the map
        var mapCenter = new google.maps.LatLng(49.2433311, -122.9432924);
        // decide some of the options for the map itself
        var myOptions = {
            zoom: 13,
            center: mapCenter,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // creates a new map based on the id in the html and the options built above.
        myData.map = new google.maps.Map($("#map").get(0), myOptions);
    }

    var fnShowMarkers = function (theMarkerData) {  // This will be an array of records
        console.log("theMarkerData: ", theMarkerData);
        // if there is data	
        if (theMarkerData.length > 0) {
            // erase the old markers off the map one by one
            for (var j = 0; j < myData.oldMarkers.length; j++) {
                myData.oldMarkers[j].setMap(null);
            }
            // empty the array itself
            myData.oldMarkers = [];
            // put new markers on the map one by one
            for (var i = 0; i < theMarkerData.length; i++) {
                // build a new location
                var location = new google.maps.LatLng(theMarkerData[i].latitude, theMarkerData[i].longitude);
                // make a marker for it
                var marker = new google.maps.Marker({
                    id: i,
                    position: location,
                    map: myData.map,
                    animation: google.maps.Animation.DROP,
                    title: theMarkerData[i].type
                });
                // keep each marker
                myData.oldMarkers.push(marker);
            }
        }
    }

    Window.showMarkers = fnShowMarkers;

    google.maps.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(locations[i][0] + " ID=" + marker.id);
            infowindow.open(map, marker);
        }
    })(marker, i));

})();