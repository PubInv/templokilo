/*
  Geotagtext allows you to create map applications and record geomarkers in the app of your choosing.
  Copyright (C) 2021 Robert Read, Diego Aspinwall and Neil Martis
  Copyright (C) 2022 Robert L. Read

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


// This will actually work with units other than ms,
// so long as it is consistent.
// I don't know how to handler outside-of-range problems.
function computeTimeInterpolatedColor(start_ms,end_ms,time_ms) {
  const duration_ms = end_ms - start_ms;
  const fraction = (time_ms - start_ms) / (duration_ms);
  const interpolated_color = d3.interpolateRdYlBu(fraction);
  return interpolated_color;
}


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

function ExifDecodeTime(timeString,offset) {
  var mom = moment.utc(timeString,'YYYY:MM:DD hh:mm:ss');
  mom.utcOffset(offset);
  console.log("time parse:");
  console.log(timeString);
  console.dir(mom);
  console.log(mom.toString());
  var e_ms = mom.valueOf();
  if (mom.isValid())
    return e_ms;
  else
    return null;
}

// Note: Color her is should be "assigned color",
// we may use interplated color when we render this.
async function createPhotoUploadTag(file, tags, username, color) {
  // This should really come from the GUI somehow
  const title = "My file";
  const form = new FormData();
  const filename = file.name;
  form.append("title", title);
  form.append("file", file);
  form.append("filename", filename);

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
    console.dir("tags");
    console.dir(tags);

    // note: here I attempt to read time the photo was taken
    var DateTimeOriginal = tags.DateTimeOriginal.value[0];
    var DateTimeDigitized = tags.DateTimeDigitized.value[0];
    var DateTime = tags.DateTime.value[0];
    var mainTime = DateTimeDigitized || DateTimeOriginal || DateTime;
    // NOTE: This appears to be the EXIF format, although even
    // my phone appaears use different formats, so we have to wrap this
    // in a function and use some heurstics...

    var offsetTime = tags.OffsetTime.value[0];
    var e_ms = ExifDecodeTime(mainTime,offsetTime);
    var mainTimeUTC = moment.unix(e_ms/1000).utc().toString();

    // here we compute "color" from the time on our time scale
    // as an interploation
    var obj = {
      appname: GLOBAL_APPNAME ? GLOBAL_APPNAME : "abc",
      tagId: tagId,
      taginfo: {
        username: username,
        latitude: lat,
        longitude: lon,
        color: color,
        message: filename,
        date: mainTimeUTC
      },
    };
    form.append("obj", JSON.stringify(obj));

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
        $.ajax({
          method: "GET",
          url: "./tags/" + tagId,
          dataType: "json",
          data: { appName: GLOBAL_APPNAME }
        }).done(
          (data) => {
            adjust_global_times(mainTime);
            var filepath = data.filePath;
            const interpolated_color =
                  computeTimeInterpolatedColor(GLOBAL_START,GLOBAL_END,e_ms);

            showPositionOnPage(position, interpolated_color, message, tagnum, message);
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
// we will only one popup at a time.
var GLOBAL_POPUP = null;
function hideBasedOnTimes(start_ms,end_ms) {
  var layers = GLOBAL_ADDED_LAYERS;
  // now interate over sources, checking time!!
  for (const l in layers) {
    const layer = layers[l];
    const layer_ms = moment(layer.timestamp).valueOf();
    const v = (layer_ms >= start_ms && layer_ms <= end_ms)
          ? 'visible'
          : 'none';
    const official_layer = map.getLayer(layer.id);
    map.setLayoutProperty(official_layer.id,
                          'visibility',
                          v);
  }
}
function removeAllLayers() {
  var layers = GLOBAL_ADDED_LAYERS;
  // now interate over sources, checking time!!
  for (const l in layers) {
    const layer = layers[l];
    // We use the same source and layer id
    var id = layer.id;
    if (map.getLayer(id)) {
      map.removeLayer(id);
    }
    if (map.getSource(id)) {
      map.removeSource(id);
    }
  }
  GLOBAL_ADDED_LAYERS = [];
}
// if we embedded the file link, we could make this pop up render it,
// and then we could have it open the photo in a different page.
// I need to add a fileid for this to work.
function showLngLatOnMap(lonDec, latDec, color, n, message, filepath, timestamp) {
  var ll = new mapboxgl.LngLat(lonDec, latDec);

  // here we will interpolate color based on time.
  // This is NOT an intrinsic property of the point,
  // but a property of all the data.
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

    map.on("mouseenter", "point" + n, function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // We will now add a direct link to the photo to the HTML in the popup,
      // and then try to add a nice thumbnail.
      var fullHTML = `time: ${timestamp} <a href='${filepath}' target='_blank'> window</a> <div> <a href='${filepath}' download>download</a> </div>
<img src="./${filepath}" alt="${filepath}" height="300">
${description}`;
      if (GLOBAL_POPUP) GLOBAL_POPUP.remove();
      GLOBAL_POPUP = new mapboxgl.Popup().setLngLat(coordinates).setHTML(fullHTML).addTo(map);
    });

    // map.on("mouseenter", "point" + n, function () {
    //   map.getCanvas().style.cursor = "pointer";
    // });

    // It would be nice to pull the pop up down on hover, but that makes it impossible to reach links in it!
    //    map.on("mouseleave", "point" + n, function () {
    //      map.getCanvas().style.cursor = "";
    //      if (GLOBAL_POPUP) GLOBAL_POPUP.remove();
    //    });
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

  map.on("load",() => refreshAllData(appname));
}

function removeCurrentLoc() {
  var mapLayer = map.getLayer("point-current");

  if (typeof mapLayer !== "undefined") {
    map.removeLayer("point-current").removeSource("point-current");
  }
}


function refreshAllData(appname) {

  // first, remove all layers and markers and times
  clearWorkingSet();
  removeAllLayers();
 if (appname) {
      $.ajax({
        type: "GET",
        url: "returnTags",
        dataType: "json",
        data: { appName: appname },
        success: function (result) {
          var v = result;
          // now we manipulate the global time parameters, so
          // we can correctly compute time-color
          for (const prop in v) {
            const n = parseInt(prop.substring("geotag".length));
            gt = v[prop];
            adjust_global_times(gt.date);
          }
          for (const prop in v) {
            const n = parseInt(prop.substring("geotag".length));
            gt = v[prop];
            const time_ms = moment.utc(gt.date).valueOf();
            const color = computeTimeInterpolatedColor(GLOBAL_START,GLOBAL_END,time_ms);
            // Note: gt.color may remain of interest, but I am not currently rendering it.
            showLngLatOnMap(
              gt.longitude,
              gt.latitude,
              color,
              n,
              gt.message,
              gt.filePath,
              gt.date
            );
          }
        },
        error: function (e) {
          console.log("ERROR: ", e);
        },
      });
 }
}
