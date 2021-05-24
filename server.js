const express = require('express');
const app = express();

/*

Config Vars:
process.env.
apiKey
authDomain
databaseURL
mapbox_accessToken
messagingSenderId
projectId
storageBucket

*/

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require('firebase/database');

console.dir(firebase);
console.dir("XXXX")
console.dir(firebase.apps);


var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
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
//This should all be in server.js, right??



app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.send('Hello, mundo!');
});

app.get('/x', function (req, res) {
  res.send('Hello, mr. X!:'+process.env.apiKey);
});

app.get('/reconfigureFromApp', function (req, res) {
    var appName = req.query.appName;
    firebase.database().ref('/apps/'+appName).once('value')
        .then(function(snapshot) {
	    var SNAPSHOT = JSON.stringify(snapshot);
	    res.send(SNAPSHOT);
	});
});

app.get('/checkForAppInDatabase', function (req, res) {
    var appName = req.query.appName;
    firebase.database().ref('/apps/'+appName).once('value')
        .then(function(snapshot) {
	    var SNAPSHOT = JSON.stringify({appExists : snapshot.exists()});
	    //var SNAPSHOT = JSON.stringify({appExists : true});
	    res.send(SNAPSHOT);
	});
});

app.get('/initMap', function (req, res) {
    //SAME AS /reconfigureFromApp!!!!
    var appName = req.query.appName;
    firebase.database().ref('/apps/'+appName+'/tags/').once('value')
        .then(function(snapshot) {
	    var SNAPSHOT = JSON.stringify(snapshot);
	    res.send(SNAPSHOT);
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
