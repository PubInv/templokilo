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

// It is possible this accessToken will someday reach a limit. We recommend you change it if that occurs.
const MAPBOXGL_ACCESSTOKEN =
  "pk.eyJ1Ijoicm9iZXJ0bHJlYWQiLCJhIjoiY2prcHdhbHFnMGpnbDNwbG12ZTFxNnRnOSJ9.1ilsD8zwoacBHbbeP0JLpQ";

const checkForAppInDatabase = (appName) => {
  return new Promise((resolve) => {
    $.ajax({
      type: "GET",
      url: "checkForAppInDatabase",
      dataType: "json",
      data: { appName: appName },
      success: function (result) {
        return resolve(result.appExists);
      },
      error: function (e) {
        console.log("ERROR: ", e);
      },
    });
  });
};

function writeTag(
  tagId,
  lat,
  lon,
  color,
  message,
  username,
  appname,
  filepath
) {
  var d = new Date();

  var obj = {
    appname: appname,
    tagId: tagId,
    taginfo: {
      username: username,
      latitude: lat,
      longitude: lon,
      color: color,
      message: message,
      date: d.toUTCString(),
      filepath: filepath,
    },
  };

  //SERVER WRITE - POST, CAN ONLY GET 'GET' TO WORK

  $.ajax({
    type: "GET",
    url: "writeTag",
    dataType: "json",
    data: obj,
    success: function (result) {
      console.log("OBJ sent successfully");
    },
    error: function (e) {
      console.log("ERROR: ", e);
    },
  });

  document.getElementById("message").value = "";
}

function getLastTagNumInDB() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: "returnTags",
      dataType: "json",
      data: { appName: GLOBAL_APPNAME },
      success: function (result) {
        var highestnum = 0;
        var v = result;
        for (const prop in v) {
          const n = parseInt(prop.substring("geotag".length));
          highestnum = Math.max(highestnum, n);
          if (highestnum == NaN) {
            highestnum = 0;
          }
        }
        resolve(highestnum);
      },
      error: function (e) {
        console.log("ERROR: ", e);
      },
    });
  });
}

function getLastTagNumInDBSynchronously() {
  var highestnum = 0;
  getLastTagNumInDB().then(function (data) {
    highestnum = data;
    console.log("data in promise");
    console.log(data);
  });
  return highestnum;
}

async function getLastTagNumInDBandWrite(color) {
  var highestnum = 0;

  $.ajax({
    type: "GET",
    url: "returnTags",
    dataType: "json",
    data: { appName: GLOBAL_APPNAME },
    success: function (result) {
      var v = result;
      for (const prop in v) {
        const n = parseInt(prop.substring("geotag".length));
        highestnum = Math.max(highestnum, n);
        if (highestnum == NaN) {
          highestnum = 0;
        }
      }
      var options = { enableHighAccuracy: false, timeout: 10000 };
      navigator.geolocation.getCurrentPosition(
        (position) =>
          createTag(
            position,
            color,
            highestnum + 1,
            GLOBAL_APPNAME,
            "createdbyclick"
          ),
        error,
        options
      );
    },
    error: function (e) {
      console.log("ERROR: ", e);
    },
  });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  if (err.code == 3) {
    console.warn(
      "This may be because you are in a location where gps signal is weak. You may not be able to set a mark until you move."
    );
  }
}

function getLocation(color) {
  if (navigator.geolocation) {
    if (color == "black") {
      var options = { enableHighAccuracy: false, timeout: 10000 };
      navigator.geolocation.getCurrentPosition(
        (position) =>
          showPositionOnPage(position, color, "current location", "-current"),
        error,
        options
      );
    } else {
      getLastTagNumInDBandWrite(color);
    }
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function createPhotoUploadTag(file, tags, username, color) {
  // This should really come from the GUI somehow
  const message = "uploaded image";
  const title = "My file";
  const form = new FormData();
  form.append("title", title);
  form.append("file", file);
  form.append("filename", file.originalname);
  getLastTagNumInDB().then(function (highest_num) {
    var tagnum = highest_num + 1;
    var tagId = "geotag" + tagnum;
    // This tshould actually from the tags!
    // Hopefully this is a UTC
    var lat = parseFloat(tags.GPSLatitude.description);

    // note: By convention, East longitude is positive
    // Check
    var lon = parseFloat(tags.GPSLongitude.description);
    lon = tags.GPSLongitudeRef.value[0] == "W" ? -lon : lon;
    console.dir("tags",tags);


    // note: here I attempt to read time the photo was taken
    var DateTimeOriginal = tags.DateTimeOriginal.value[0];
    var DateTimeDigitized = tags.DateTimeDigitized.value[0];
    var DateTime = tags.DateTime.value[0];
    var mainTime = DateTimeDigitized || DateTimeOriginal || DateTime;
    // TODO: mainTime seems to be in a special EXIF format.
    // It will be better to convert to UTC time here.
    var obj = {
      appname: GLOBAL_APPNAME ? GLOBAL_APPNAME : "abc",
      tagId: tagId,
      taginfo: {
        username: username,
        latitude: lat,
        longitude: lon,
        color: color,
        message: message,
        date: mainTime,
      },
    };
    form.append("obj", JSON.stringify(obj));
    console.log("form");
    console.log(form);
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/upload",
      contentType: false,
      processData: false,
      data: form
    })
      .done((resp) => {
        console.log(resp);
        var position = { coords: { latitude: lat, longitude: lon } };
        // I might actually have to read the tag to get
        // the correct filepath here...
        console.log("GLOBAL_APPNAME");
        console.log(GLOBAL_APPNAME);
        $.ajax({
          method: "GET",
          url: "./tags/" + tagId,
          dataType: "json",
          data: { appName: GLOBAL_APPNAME }
        }).done(
          (data) => {
            // Possibly the first parameter in Ajax is just the data
            var filepath = data.filePath;
            showPositionOnPage(position, color, message, tagnum, filepath);
            adjust_global_times(mainTime)
          }).fail((error) => {
            console.log("error in Get:");
            console.log(error);
          });
      })
      .fail((error) => console.log(error));
  });
}

function createTag(position, color, tagnum, appname, filepath) {
  var message = $("#message").val();
  showPositionOnPage(position, color, message, tagnum, filepath);
  writeTag(
    "geotag" + tagnum,
    position.coords.latitude,
    position.coords.longitude,
    color,
    message,
    $("#user-name").val(),
    appname
  );
}
function showPositionOnPage(position, color, message, number, filepath) {
  if (color != "black") {
    var x = (document.getElementById("demo").innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude);
  }
  var lonDec = position.coords.longitude;
  var latDec = position.coords.latitude;
  showLngLatOnMap(lonDec, latDec, color, number, message, filepath);
}


// MapBox styles can have a lot of layers beyond what we explicitly add.
// It is therefore useful to keep our own array of layers for controlling
// visibility. This requires some management, particularly when
// it should be emptied on reconfi

var GLOBAL_ADDED_LAYERS = [];
function hideBasedOnTimes(start_ms,end_ms) {
  var layers = GLOBAL_ADDED_LAYERS;
  // now interate over sources, checking time!!
  console.dir("Begin List of Sources")
  for (const l in layers) {
    const layer = layers[l];
    const layer_ms = moment(layer.timestamp,'YYYY:MM:DD hh:mm:ss').valueOf();
    const v = (layer_ms >= start_ms && layer_ms <= end_ms)
          ? 'visible'
          : 'none';
    const official_layer = map.getLayer(layer.id);
    console.dir(official_layer);
    map.setLayoutProperty(official_layer.id,
                          'visibility',
                          v);
  }
}
// if we embedded the file link, we could make this pop up render it,
// and then we could have it open the photo in a different page.
// I need to add a fileid for this to work.
function showLngLatOnMap(lonDec, latDec, color, n, message, filepath, timestamp) {
  var ll = new mapboxgl.LngLat(lonDec, latDec);

  if (color == "black" && map.getStyle().sources["point-current"]) {
    map.getSource("point-current").setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lonDec, latDec],
          },
          properties: {
            description:
              "<strong>geotag" + n + "</strong><p>" + message + "</p>",
            color: color,
          },
        },
      ],
    });
  } else {
    map.addSource("point" + n, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lonDec, latDec],
            },
            properties: {
              description:
                "<strong>geotag" + n + "</strong><p>" + message + "</p>",
              color: color,
            },
          },
        ],
      },
    });

    const newLayer = {
      id: "point" + n,
      source: "point" + n,
      type: "circle",
      paint: {
        "circle-radius": 10,
        "circle-color": ["get", "color"],
      },
      timestamp: timestamp
    };
    map.addLayer(newLayer);
    GLOBAL_ADDED_LAYERS.push(newLayer);

    map.on("click", "point" + n, function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // We will now add a direct link to the photo to the HTML in the popup,
      // and then try to add a nice thumbnail.
      var fullHTML = `time: ${timestamp} <a href='${filepath}'>click for window</a> \br <a href='${filepath}'>click for download</a> \br
<img src="./${filepath}" alt="${filepath}" width="500" height="600">
${description}`;
      new mapboxgl.Popup().setLngLat(coordinates).setHTML(fullHTML).addTo(map);
    });

    map.on("mouseenter", "point" + n, function () {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "point" + n, function () {
      map.getCanvas().style.cursor = "";
    });
  }
}

var map;

function initMap(appname) {
  mapboxgl.accessToken = MAPBOXGL_ACCESSTOKEN;

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v9",
    center: [-96, 37.8],
    zoom: 3,
  });

  if (appname) {
    map.on("load", function () {
      $.ajax({
        type: "GET",
        url: "returnTags",
        dataType: "json",
        data: { appName: appname },
        success: function (result) {
          var v = result;
          for (const prop in v) {
            const n = parseInt(prop.substring("geotag".length));
            gt = v[prop];
            showLngLatOnMap(
              gt.longitude,
              gt.latitude,
              gt.color,
              n,
              gt.message,
              gt.filePath,
              gt.date
            );
            // now we manipulate the global time parameters
            adjust_global_times(gt.date);
          }
        },
        error: function (e) {
          console.log("ERROR: ", e);
        },
      });
    });
  }
}

function removeCurrentLoc() {
  var mapLayer = map.getLayer("point-current");

  if (typeof mapLayer !== "undefined") {
    map.removeLayer("point-current").removeSource("point-current");
  }
}
