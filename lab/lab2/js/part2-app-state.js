/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */

// Use the data source URL from lab 1 in this 'ajax' function:
var downloadData = $.ajax("https://raw.githubusercontent.com/aakims/OST4GIS-week4/master/data/syriaRefugeeSites2016.csv").then(function (res) {console.log(res); return res;});

// Write a function to prepare your data (clean it up, organize it as you like, create fields, etc)

// converting csv to json with added ObjectID field
// http://techslides.com/convert-csv-to-json-in-javascript
var csvToJson = function(csvData) {
  var dataRows = csvData.split("\n");
  var jsonReady = [];
  var keys = "ObjectID" + "," + dataRows[0];
  keys = dataRows[0].split(",");

  for (var rowIndex = 1; rowIndex < dataRows.length; rowIndex++) {
    var dataObj = {};
    var objID = rowIndex;
    var currentRow = rowIndex + "," + dataRows[rowIndex];
    currentRow = dataRows[rowIndex].split(",");

    for (var colIndex = 0; colIndex < keys.length; colIndex++) {
      dataObj[keys[colIndex]] = currentRow[colIndex];
    }

    jsonReady.push(dataObj);
  }

  return JSON.parse(JSON.stringify(jsonReady));
};

// only selecting a few useful fields + omit rows that are missing location data

//TODO: START HERE
var fieldsToKeep = ["ObjectID", "Country","Designation","AdministrativeDivision", "Name", "Lat","Long","fips"];

// tried chaining and played around with 'return' placement within pickAndClean function. Confirmed that during the code execution I do get a json data, but consle.log(parsed) keeps returning undefined; so I guess something isn't working right here. 
var pickAndClean = function(jsonObj) {
return  _.pick(jsonObj, function(key) {
    return _.contains(fieldsToKeep, key);
  });
  /*
  jsonObj = _.omit(jsonObj, function(value) {
    return (jsonObj.Country === "Turkey");
  });
  return jsonObj; */
};


var parseData = function(csvData) {
  var jsonData = csvToJson(csvData);
  console.log(jsonData);
  pickAndClean(jsonData);
};

// Write a function to use your parsed data to create a bunch of marker objects (don't plot them!)

// object style specifications
var popupText = function(jsonObj) {
    return "<h4>" + jsonObj.Name + "," + jsonObj.Country + "</h4>" + "<h5>" +
      "<ul><li>Designation:  " + jsonObj.Designation + "</li>" +
      "<li>Administrative Division:  " + jsonObj.AdministrativeDivision + "</li></ul>";
  };

  var makeMarkers = function(jsonObj) {
      return L.marker([jsonObj.Lat, jsonObj.Long], {
          icon: centerIcon(jsonObj)
        })
        .bindPopup(popupText(jsonObj));
    };

// Now we need a function that takes this collection of markers and puts them on the map
var plotMarkers = function(json) {
  _.each(json, function(jsonObj) {
    var jsonMarkers = makeMarkers(jsonObj);
    L.layerGroup().addLayer(jsonMarkers);
  });
  L.layerGroup().addTo(map);
};

// At this point you should see a bunch of markers on your map.
// Don't continue on until you can make them appear!

/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are (nearly) immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

// Look to the bottom of this file and try to reason about what this function should look like
var removeMarkers = function() {};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file for the stretch goal.
===================== */

/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
  var parsed = parseData(data);
  console.log(parsed);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
  removeMarkers(markers);
});
