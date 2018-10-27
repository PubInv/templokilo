var x = document.getElementById("demo");
function getLocation(color) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => showPosition(position,color));
    } else {
      //        x.innerHTML = "Geolocation is not supported by this browser.";
      alert("Geolocation is not supported by this browser.");
    }
}
var lcnt = 0;
function showPosition(position,color) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
	"<br>Longitude: " + position.coords.longitude;
    var lonDec = position.coords.longitude;
    var latDec = position.coords.latitude;
    var ll = new mapboxgl.LngLat(lonDec, latDec);

    // var marker = new mapboxgl.Marker()
    //     .setLngLat(ll)
    //     .addTo(map);

    map.addSource('point'+lcnt, {
        "type": "geojson",
        "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [lonDec, latDec ]
                    },
                    "properties": {
                        "color": color,                        
                        "title": "Waterloo",
                        "icon": "monument"
                    }
                }]
            }
    });

    map.addLayer({
        "id": "point"+lcnt,
        "source": "point"+lcnt,
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            'circle-color': ['get', 'color']
        }
    });
    lcnt++;
}
 
// https://stackoverflow.com/questions/8678371/how-to-convert-gps-degree-to-decimal-and-vice-versa-in-jquery-or-javascript-and
function getDMS2DD(days, minutes, seconds, direction) {
    direction.toUpperCase();
    var dd = days + minutes/60 + seconds/(60*60);
    //alert(dd);
    if (direction == "S" || direction == "W") {
        dd = dd*-1;
    } // Don't do anything for N or E
    return dd;
}


document.getElementById("file-input").onchange = function(e) {
    var file = e.target.files[0]
    if (file && file.name) {
	Tesseract.recognize(file,{
	    lang: 'eng',
	})
		.then(function(result){
		    console.log("Foud this result");
		    console.log(result);
		});
	
        EXIF.getData(file, function() {
	    
	    var exifData = EXIF.pretty(this);
	    if (exifData) {
	    } else {
		alert("No EXIF data found in image '" + file.name + "'.");
		return;
	    }

	    var lat = this.exifdata.GPSLatitude;
	    if (lat) {

		// We probably need to get the direction from exif.
		var latDec = getDMS2DD(lat[0],lat[1],lat[2],this.exifdata.GPSLatitudeRef);

		var lon = this.exifdata.GPSLongitude;

		var lonDec = getDMS2DD(lon[0],lon[1],lon[2],this.exifdata.GPSLongitudeRef);		    

		var ll = new mapboxgl.LngLat(lonDec, latDec);

		var marker = new mapboxgl.Marker()
		    .setLngLat(ll)
		    .addTo(map);
	    } else {
		alert("Unable to extract location data!");
	    }

	
	    
        });
    }
}

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0bHJlYWQiLCJhIjoiY2prcHdhbHFnMGpnbDNwbG12ZTFxNnRnOSJ9.1ilsD8zwoacBHbbeP0JLpQ';
var map = new mapboxgl.Map({
    container: 'map',
     style: 'mapbox://styles/mapbox/light-v9',
    center: [-96, 37.8],
    zoom: 3
});

var radius = 20;


map.on('load', function () {
    // Add a source and layer displaying a point which will be animated in a circle.
    // map.addSource('point', {
    //     "type": "geojson",
    //     "data": pointOnCircle(0)
    // });
    map.addSource('point', {
        "type": "geojson",
        "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-80.5204, 43.46667 ]
                    },
                    "properties": {
                        "color": "blue",                        
                        "title": "Waterloo",
                        "icon": "monument"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-122.414, 37.776]
                    },
                    "properties": {
                        "color": "green",
                        "title": "Mapbox SF",
                        "icon": "gradient"
                    }
                }]
            }
    });

    map.addLayer({
        "id": "point",
        "source": "point",
        "type": "circle",
        // "paint": {
        //     "circle-radius": 10,
        //     'circle-color': [
        //         'match',
        //         ['get', 'color'],
        //         'red', 'red',
        //         'blue', 'blue',
        //         /* other */ '#ccc'
        //     ]
        // }
        "paint": {
            "circle-radius": 10,
            'circle-color': ['get', 'color']
        }
    });
});
