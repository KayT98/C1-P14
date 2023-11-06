let directionsService;
        let directionsRenderer;
        let geocoder;
        let map;
        let markers = []; // Declare the markers array

        function initMap() {
            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer();
            geocoder = new google.maps.Geocoder();
            
            

            const coordinates = { lat: 36.205021, lng: -95.868759};

            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 13,
                center: coordinates,
                mapTypeId: 'satellite'
            });
            directionsRenderer.setMap(map);
            map.setTilt(45);

            const marker = new google.maps.Marker({
                position: coordinates,
                map: map,
            });

            let infowindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent("Hello! Welcome to my site - TUL5");
                        infowindow.open(map, marker);
            });
            markers.push(marker);
		    map.addListener("click", (e) => {
                alert("You clicked the map at " + JSON.stringify(e.latLng.toJSON(), null, 2));
            });   
        }

        window.initMap = initMap;

        function getCoordinates() {
            let address = document.getElementById('address').value;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    let marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
  
        function calcRoute() {
            let start = document.getElementById('origin').value;
            let end = document.getElementById('destination').value;
            let request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                    directionsRenderer.setDirections(result);
                } else { alert("An unexpected error occurred")}
            });
        }
        
    