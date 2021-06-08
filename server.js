const express = require('express');
const app = express();


const firebase = require("firebase/app");

require("firebase/auth");
require('firebase/database');

const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
};

firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
});

const ref = firebase.database().ref();

app.use(express.static(__dirname));

//app.use(bodyParser.urlencoded({ extended:false }));
//app.use(bodyParser.json());

function returnFirebaseSnapshot(req, ref, res) {
    var appName = req.query.appName;
    firebase.database().ref('/apps/'+appName+ref).once('value')
        .then(function(snapshot) {
	    res.send(JSON.stringify(snapshot));
	});
}
app.get('/returnTags', function (req, res) {
    returnFirebaseSnapshot(req,'/tags/', res);
});

app.get('/reconfigureFromApp', function (req, res) {
    returnFirebaseSnapshot(req,'', res);
});

app.get('/checkForAppInDatabase', function (req, res) {
    var appName = req.query.appName;
    firebase.database().ref('/apps/'+appName).once('value')
        .then(function(snapshot) {
	    //var exists = JSON.stringify({appExists : snapshot.exists()});
	    res.send(JSON.stringify({appExists : snapshot.exists()}));
	});
});

app.get('/writeTag', function (req, res) {
    var obj = req.query.taginfo;
    obj["latitude"] = parseFloat(obj.latitude);
    obj["longitude"] = parseFloat(obj.longitude);    
    firebase.database().ref('/apps/' + req.query.appname + "/tags/" + req.query.tagId).set(obj,
                                                 function(error) {
                                                     if (error) {
                                                         console.log("ERROR:",error);
                                                     }
                                                 });
});

app.get('/actuallyCreate', function (req, res) {
    var config = req.query.obj;
    for (const property in config) {
	if (config[property] == "false") {config[property] = false;}
	if (config[property] == "true") {config[property] = true;}
    }
    config.tags = {};
    firebase.database().ref('apps/' + req.query.appname).set(config,
						   function(error) {
						       if (error) {
							   // The write failed...
							   console.log("ERROR:",error);
						       } else {
							   // Data saved successfully!
							   console.log("SUCCESS");
						       }
						   });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
