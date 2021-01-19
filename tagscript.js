//trying to find last tag posted
var LASTTAGNUM = 0;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDT6vGeYFgQJbuQvvtVQQHpuoKxcs5TDRE",
    authDomain: "geotagtext.firebaseapp.com",
    databaseURL: "https://geotagtext.firebaseio.com",
    projectId: "geotagtext",
    storageBucket: "geotagtext.appspot.com",
    messagingSenderId: "1071662476331"
};
firebase.initializeApp(config);


firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
});

var ref = firebase.database().ref();

firebase.database().ref('/').once('value').then(function(snapshot) {
    console.log("snapshot",snapshot);
});


firebase.database().ref('/tags').once('value').then(function(snapshot) {
    console.log("tags snapshot",snapshot);
    console.log("tags val snapshot",snapshot.val());
});

function writeTag(tagId, lat, lon, color, message) {
    if (message) {
	console.log("Message: ",message);
    }
    else {
	console.log("No message");
	message = null;
	//isn't showing up in obj if null
    }

    var obj = {
        latitude: lat,
        longitude: lon,
        color: color,
	message: message
    };
    //just putting message into this obj to see if it works
    //the latest geotag is written into geotag45, regardless of yes/no message.
    //I tested this on the master branch and same problem happened.
    console.log(obj);

    firebase.database().ref('tags/' + tagId).set(obj,
                                                 function(error) {
                                                     if (error) {
                                                         // The write failed...
                                                         console.log("ERROR:",error);
                                                     } else {
                                                         // Data saved successfully!
                                                         console.log("SUCCESS");
                                                     }
                                                 });
    document.getElementById("message").value='';
    //erase input message
}



var x = document.getElementById("demo");


function getLocation(color) {
  // LASTTAGNUM is global to this function
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => createTag(position,color,LASTTAGNUM+1));
      LASTTAGNUM++;
    } else {
        //        x.innerHTML = "Geolocation is not supported by this browser.";
        alert("Geolocation is not supported by this browser.");
    }
}
var lcnt = 0;

function createTag(position,color,tagnum) {
    showPositionOnPage(position,color);
  writePosition(position,color,tagnum);
}
function writePosition(position,color,tagnum) {
    var lonDec = position.coords.longitude;
    var latDec = position.coords.latitude;
    var tagmessage = document.getElementById('message').value;
    writeTag("geotag" + tagnum,latDec,lonDec,color,tagmessage);
}
function showPositionOnPage(position,color) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
	"<br>Longitude: " + position.coords.longitude;
    var lonDec = position.coords.longitude;
    var latDec = position.coords.latitude;
    showLngLatOnMap(lonDec,latDec,color);
}

function showLngLatOnMap(lonDec,latDec,color,n) {
    var ll = new mapboxgl.LngLat(lonDec, latDec);

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
                    "color": color,
                    "title": "Waterloo",
                    "icon": "monument"
                }
            }]
        }
    });

    map.addLayer({
        "id": "point"+n,
        "source": "point"+n,
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            'circle-color': ['get', 'color']
        }
    });


//  lcnt++;
//  console.log("LCNT: ",lcnt);
    // checking to see if this is updating

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
		console.log("Found this result");
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


//The tag number bug is somewhere in here. showLngLatOnMap... isn't getting called enough, so lcnt isn't updating enough to create a new tag. Instead it's rewriting an old one.
map.on('load', function () {
  firebase.database().ref('/tags').once('value').then(function(snapshot) {
    var v = snapshot.val();
    for(const prop in v) {
      console.log("prop =",prop);
      const n = parseInt(prop.substring("geotag".length));
        gt = v[prop];
      console.log("gt = gt");
      showLngLatOnMap(gt.longitude,gt.latitude,gt.color,n);
      LASTTAGNUM = Math.max(LASTTAGNUM,n);
    }
    });
});
