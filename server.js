/*
Geotagtext allows you to create map applications and record geomarkers in the app of your choosing.
Copyright (C) 2021 Robert Read, Diego Aspinwall and Neil Martis

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const express = require('express');
const app = express();
var cors = require('cors');

const firebase = require("firebase/app");

require("firebase/auth");
require('firebase/database');

const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
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
app.use(cors());

//app.use(bodyParser.urlencoded({ extended:false }));
//app.use(bodyParser.json());

var returnFirebaseSnapshot = (req, ref, res) => {
    var appName = req.query.appName;
    firebase.database().ref('/apps/'+appName+ref).once('value')
        .then((snapshot) =>
	    {res.send(JSON.stringify(snapshot));}
	);
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
        .then((snapshot) =>
	    {res.send(JSON.stringify({appExists : snapshot.exists()}));}
	);
});

function writeTagIntoDB(obj,req) {
  console.log("writing");
  console.log(obj);
    firebase.database().ref('/apps/' + req.query.appname + "/tags/" + req.query.tagId).set(obj,
                                                 function(error) {
                                                     if (error) {
                                                         console.log("ERROR:",error);
                                                     }
                                                 });
}

app.get('/writeTag', function (req, res) {
  var obj = req.query.taginfo;
  obj["latitude"] = parseFloat(obj.latitude);
  obj["longitude"] = parseFloat(obj.longitude);
  writeTagIntoDB(obj,req);
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


const multer  = require('multer');
const os = require('os');
//const ExifReader = require('exif-js')
const ExifReader = require('exifreader');
const fs = require('fs')

const upload = multer({ dest: "./uploads" });

app.post('/upload',upload.single('file'),
         function(req, res) {
           console.log("req.body");
           console.log(req.body);
           var myobj = JSON.parse(req.body.obj);
           console.log("myobj");
           console.log(myobj);
           const title = req.body.title;
           const file = req.file;
           console.log(title);
           file.filename = file.originalname;
           console.log("file.path");
           console.log(file.path);
           console.log("file.path");

           var fake_req = {};
           fake_req.query = {};

           console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
           console.log("appname");
           console.log(myobj.appname);
           console.log("tagid");
           console.log(myobj.tagId);

           fake_req.query.appname = myobj.appname;
           fake_req.query.tagId = myobj.tagId;



           // Now I attempt to create a tag corresponding
           // to this upload.
           // We have to create a correct object with
           // latitude and longitude, and we also add
           // the a "path" which will be the path
           // to the file that was just written by multer.
           // This will allows use to render it later.

           var obj = {};
           try {
             const data = fs.readFileSync(file.path)
             const tags = ExifReader.load(data);
             writeTagIntoDB(myobj.taginfo,fake_req);
           } catch (err) {
             console.error(err)
           }

           res.sendStatus(200);
         });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('myapp listening on port ' + port);
});
