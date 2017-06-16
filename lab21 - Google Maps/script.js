(function (id) {
    "use strict";

    $(document).ready(function () {

        /* FILL THE  TABLE WITH THE NEST POSITIONS*/
        $.getJSON("http://api.b246b.ca/scripts/getboxids.php", outputNestsBoxes);

        function outputNestsBoxes(data) {
            for (var i = 0; i < data.length; i++) {
                $("#outputTable").append(
                    '<tr>' +
                    '<td>' + data[i].id.substring(0, 3) + '</td>' +
                    '<td>' + data[i].id.substring(4) + '</td>' +
                    '<td>' + data[i].type + '</td>' +
                    '<td class=\"centerElement"\">' +
                    '<input type=\"checkbox\" class=\"selected\" value="' + data[i].id + '"></td>' +
                    '</tr>'
                );
            }
        }

        /* INITIALIZE THE MAP */
        var myData = { map: null, oldMarkers: [] };
        initializeMap();

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

        /* START THE EVENT HANDLER AND FUNCTION TO SET THE MARKERS */
        $(id.selectID).click(fillMap);

        function fillMap() {
            var selected = [];
            $(".selected:checked").each(function () {
                selected.push($(this).val());
            });

            if (selected.length > 0)
                $.getJSON("http://api.b246b.ca/scripts/getLocations.php", {
                    boxes: selected
                }, showMarkers);
            else
                cleanMap();
        }

        function cleanMap() {
            // console.log("theMarkerData: ", theMarkerData);
            // if there is data	
            for (var j = 0; j < myData.oldMarkers.length; j++) {
                console.log(myData.oldMarkers[j]);
                myData.oldMarkers[j].setMap(null);
            }

            // empty the array itself
            myData.oldMarkers = [];
        }

        var showMarkers = function (theMarkerData) {  // This will be an array of records

            cleanMap()
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
                    title: theMarkerData[i].id,
                });


                var contentString = '<p><strong>' + theMarkerData[i].id + '</strong><br>' +
                    'Type: ' + theMarkerData[i].type + '<br>' +
                    'Location: ' + theMarkerData[i].location + '<br>' +
                    'Subarea: ' + theMarkerData[i].subarea + '</p>';

                // Create the information window using the content from above
                var infowindow = new google.maps.InfoWindow();
                // console.log(contentString);

                bindInfoWindow(marker, myData.map, infowindow, contentString);

                // keep each marker
                myData.oldMarkers.push(marker);

                // console.log(marker);
            }
        }


        function bindInfoWindow(marker, map, infoWindow, html) {
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            });
        }


        function showInfo(theMarkerData, marker) {
            console.log("theMarkerData: ", theMarkerData)
            // Build the content for a information window that is coming soon.  Notice you can use any html tags.
            var contentString = '<p><strong>' + theMarkerData.id + '</strong><br>' +
                'Type: ' + theMarkerData.type + '<br>' +
                'Location: ' + theMarkerData.location + '<br>' +
                'Subarea: ' + theMarkerData.subarea + '</p>';

            // Create the information window using the content from above
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            // show the information window
            infowindow.open(myData.map, marker);
        }




    });

})({
    formID: "#form1",
    selectID: "#select",
    mapID: "#map"
});
