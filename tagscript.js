

const checkForAppInDatabase = (appName) => {
  return new Promise((resolve) => {
    firebase.database().ref('/apps/' + appName).once('value')
      .then(function(snapshot) {
	return resolve(snapshot.exists());
      });
  });
}

function writeTag(tagId, lat, lon, color, message, username, appname) {
    var d = new Date();

    var obj = {
	username: username,
        latitude: lat,
        longitude: lon,
        color: color,
	message: message,
	date: d.toUTCString()
    };

    console.log(obj);

    firebase.database().ref('/apps/' + appname + "/tags/" + tagId).set(obj,
                                                 function(error) {
                                                     if (error) {
                                                         console.log("ERROR:",error);
                                                     } else {
                                                         console.log("SUCCESS");
                                                     }
                                                 });
    document.getElementById("message").value = '';
}

async function getLastTagNumInDBandWrite(color) {
    var highestnum = 0;
    firebase.database().ref('/apps/' + GLOBAL_APPNAME + "/tags/").once('value').then(function(snapshot) {
	var v = snapshot.val();
	for(const prop in v) {
	    const n = parseInt(prop.substring("geotag".length));
	    highestnum = Math.max(highestnum,n);
	    if (highestnum == NaN) {
		highestnum = 0;
	    }
	}
	var options = { enableHighAccuracy: false,
			timeout:10000};
	navigator.geolocation.getCurrentPosition(
            (position) => createTag(position,color,highestnum+1,GLOBAL_APPNAME),
            error,
	    options);
    });
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  if (err.code == 3) {
    console.warn('This may be because you are in a location where gps is weak. You may not be able to set a mark until you move');
  }
}
function getLocation(color) {
  if (navigator.geolocation) {
      if (color == 'black') {
	  var options = { enableHighAccuracy: false,
			  timeout:10000};
	  navigator.geolocation.getCurrentPosition(
              (position) => showPositionOnPage(position,color,"current location",""),
              error,
	      options);
      } else {
	  getLastTagNumInDBandWrite(color);
      }
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function createTag(position,color,tagnum,appname) {
    var message = $('#message').val();
    showPositionOnPage(position,color,message,tagnum);
    writeTag("geotag" + tagnum,
             position.coords.latitude,
             position.coords.longitude,
             color,
	     message,
	     $('#user-name').val(),
             appname);
}
function showPositionOnPage(position,color,message,number) {
    if (color != 'black') {
	var x = document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    }
    var lonDec = position.coords.longitude;
    var latDec = position.coords.latitude;
    showLngLatOnMap(lonDec,latDec,color,number,message);
    // TODO: We need to update the geotag with the with the number and message
    // so that you don't have to reload
    //too much effort to put latest number and message in
}

function showLngLatOnMap(lonDec,latDec,color,n,message) {
    var ll = new mapboxgl.LngLat(lonDec, latDec);

    if (color == 'black' && map.getStyle().sources["point"]) {
	console.log('black point: ',lonDec,latDec);
	//this works, but the black point changes every 15-30 seconds instead of 5
	map.getSource('point').setData({
	    "type": "FeatureCollection",
	    "features": [{
		"type": "Feature",
		"geometry": {
		    "type": "Point",
		    "coordinates": [lonDec, latDec ]
		},
		"properties": {
		    'description':
		    '<strong>geotag' + n + '</strong><p>' + message + '</p>',
		    "color": color
		}
	    }]
	});
    }
    else {
	map.addSource('point'+n, {
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
			'description':
			'<strong>geotag' + n + '</strong><p>' + message + '</p>',
			"color": color
		    }
		}]
	    }
	});

	// Possibly this is inefficient; possibly there should be a layer for all tags.
	map.addLayer({
	    "id": "point"+n,
	    "source": "point"+n,
	    "type": "circle",
	    "paint": {
		"circle-radius": 10,
		'circle-color': ['get', 'color']
	    }

	});

	map.on('click',"point"+n, function (e) {
	    var coordinates = e.features[0].geometry.coordinates.slice();
	    var description = e.features[0].properties.description;

	    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
		coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	    }

	    new mapboxgl.Popup()
		.setLngLat(coordinates)
		.setHTML(description)
		.addTo(map);
	});

	map.on('mouseenter', "point"+n , function () {
	    map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', "point"+n , function () {
	    map.getCanvas().style.cursor = '';
	});
    }
}

// THIS MAY HAVE TO BE GLOBAL
var map;

function initMap(appname) {
  // TODO: Neil, take this from an environment variable.
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0bHJlYWQiLCJhIjoiY2prcHdhbHFnMGpnbDNwbG12ZTFxNnRnOSJ9.1ilsD8zwoacBHbbeP0JLpQ';


    map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v9',
	center: [-96, 37.8],
	zoom: 3
    });

    if (appname){
	map.on('load', function () {
	    firebase.database().ref('/apps/' + appname + "/tags/").once('value').then(function(snapshot) {
		var v = snapshot.val();
		for(const prop in v) {
		    const n = parseInt(prop.substring("geotag".length));
		    gt = v[prop];
		    showLngLatOnMap(gt.longitude,gt.latitude,gt.color,n,gt.message);
		}
	    });
	});
    }
}
