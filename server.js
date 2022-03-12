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

const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");

////// Setup DB //////

let UploadSchema = new mongoose.Schema({
  created: { type: Date, required: true, default: Date.now },
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  tagId: { type: String, required: true },
  longitude: { type: String },
  latitude: { type: String },
  imageDate: { type: String },
  color: { type: String },
  message: { type: String },
  
});

let Upload = mongoose.model("Upload", UploadSchema, "uploads");
mongoose
  // .connect(process.env.DATABASE, {
  .connect("mongodb://localhost:27017/pjournal", { // for dev
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Succesfully Connected to the MongoDB Database..`);
  })
  .catch(() => {
    console.log(`Error Connecting to the MongoDB Database...`);
  });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

////// STATIC FILES //////

app.use(express.static(__dirname));
app.use(cors());

//app.use(bodyParser.urlencoded({ extended:false }));
//app.use(bodyParser.json());

////// Multer upload //////

const os = require("os"); // Unused
const fs = require("fs");
const ExifReader = require("exifreader");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log("Computing file name: ", filename);
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Unused
    cb(null, file.originalname);
  },
});

const multerUpload = multer({ storage: storage });

////// API //////

app.post("/upload", multerUpload.single("file"), function (req, res) {
  // by the time we get here, multer
  // has already generated a hash name.
  // This has lost the mimetype information.
  console.log("req.body: ", req.body);
  const bodyobj = JSON.parse(req.body.obj);
  console.log("bodyobj", bodyobj);
  const title = req.body.title;
  const file = req.file;
  console.log("title: ", title);
  file.filename = file.originalname;
  console.log("file.path: ", file.path);
   
  try {   
    const data = fs.readFileSync(file.path);
    const tags = ExifReader.load(data);

    const upload = new Upload({
      filename: file.filename,
      filepath: file.path,
      tagId: bodyobj.tagId,
      longitude: bodyobj.longitude,//tags.GPSLongitude,
      latitude: bodyobj.latitude, //tags.GPSLatitude
      imageDate: bodyobj.date,
      color: bodyobj.color,
      message: bodyobj.message
    });
 
    // Save to database
    upload.save(function (err, u) {
      if (err) return console.error(err);
      console.log(u.filename + " saved to collection.");
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.get("/upload", function(req, res) {
  // Upload.findOne({ "profile.email": req.body.email }, function (err, upload) {
  //   if (err) return res.status(500).send("Error on the server.");
  //   if (!upload) return res.status(404).send("No upload found.");
  //   res.status(200).send(upload);
  // });
});

app.get("/tags", function(req, res) {
  // Upload.findOne({ "profile.email": req.body.email }, function (err, upload) {
  //   if (err) return res.status(500).send("Error on the server.");
  //   if (!upload) return res.status(404).send("No upload found.");
  //   res.status(200).send(upload);
  // });
});

////// Run Server //////

const port = process.env.PORT || 3000;
// var server = app.listen(port, () => {

app.listen(port, () => {
    console.log("PJournal listening on port " + port);
});

// module.exports = server;