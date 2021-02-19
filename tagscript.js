function writeTag(tagId, lat, lon, color, message, appname, username) {

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
    console.log("appName = ", GLOBAL_APPNAME);
    firebase.database().ref('/apps/' + GLOBAL_APPNAME + "/tags/").once('value').then(function(snapshot) {
	//GET RID OF V
	var v = snapshot.val();
	for(const prop in v) {
	    const n = parseInt(prop.substring("geotag".length));
	    highestnum = Math.max(highestnum,n);
	    if (highestnum == NaN) {
		highestnum = 0;
	    }
	}
	console.log("Highest num: ", highestnum);
	//GET RID OF OPTIONS
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
}
function getLocation(color) {
    //MAKE INTO IF, ELSE IF, ELSE??
  if (navigator.geolocation) {
      if (color == 'black') {
	  console.log("BLACK");
	  var options = { enableHighAccuracy: false,
			  timeout:10000};
	  navigator.geolocation.getCurrentPosition(
              (position) => showPositionOnPage(position,color),
              error,
	      options);
      }
      else {
	  getLastTagNumInDBandWrite(color);
      }
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function createTag(position,color,tagnum,appname) {
    showPositionOnPage(position,color);
    writePosition(position,color,tagnum,appname);
}
function writePosition(position,color,tagnum,appname) {
    var lonDec = position.coords.longitude;
    var latDec = position.coords.latitude;
    var tagmessage = document.getElementById('message').value;
    var tagusername = document.getElementById('user-name').value;
    writeTag("geotag" + tagnum,latDec,lonDec,color,tagmessage,appname,tagusername);
}
function showPositionOnPage(position,color) {
    if (color != 'black') {
	var x = document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    }
    var lonDec = position.coords.longitude;
    var latDec = position.coords.latitude;
    var message = 'Reload to see your latest message';
    var icon = "music-15.svg"
    //PUT DIRECTLY INTO SHOWLNGLATONMAP

    showLngLatOnMap(lonDec,latDec,color," submitted now",message,icon);
    //too much effort to put latest number and message in
}

function showLngLatOnMap(lonDec,latDec,color,n,message,icon) {
    var ll = new mapboxgl.LngLat(lonDec, latDec);

    if (message == undefined) {
	message = ''
    }
    //THIS COULD BE DELETED

    //console.log(map.getStyle().sources); //POINT SOURCES

    if (color == 'black' && map.getStyle().sources["point submitted now"]) {
	//var x = map.getSource('point submitted now');
	//console.dir(x);
	//x.setData({
	//DELETE ABOVE AND MAYBE TITLE, DESCRIPTION AND ICON BELOW
	map.getSource('point submitted now').setData({
	    "type": "FeatureCollection",
	    "features": [{
		"type": "Feature",
		"geometry": {
		    "type": "Point",
		    "coordinates": [lonDec, latDec ]
		},
		"properties": {
		    "description": "<p>hello</p>",
		    "color": color,
		    "title": "Waterloo",
		    "icon": "monument"
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
			"color": color,
			"title": "Waterloo",
			"icon": "monument"
			//"icon": icon
		    }
		}]
	    }
	});

	// Possibly this is inefficient; possibly there should be a layer for all tags.
	map.addLayer({
	    "id": "point"+n,
	    "source": "point"+n,

	    /*
	      if we figured this out, icon is already passed into this function
	      'type': 'symbol',
	      'layout': {
	      //'icon-image': '{icon}',
	      'icon-image': "music-15.svg",
	      'icon-allow-overlap': true
	      }
	    */

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

//IS THIS USED ANYWHERE???
function getDMS2DD(days, minutes, seconds, direction) {
    direction.toUpperCase();
    var dd = days + minutes/60 + seconds/(60*60);
    if (direction == "S" || direction == "W") {
        dd = dd*-1;
    } //don't change N and E
    return dd;
}

// THIS MAY HAVE TO BE GLOBAL
var map;

function initMap(appname,icon) {
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
		//DELTE V AND N??
		for(const prop in v) {
		    const n = parseInt(prop.substring("geotag".length));
		    gt = v[prop];
		    showLngLatOnMap(gt.longitude,gt.latitude,gt.color,n,gt.message,icon);
		}
	    });
	});
    }
}
