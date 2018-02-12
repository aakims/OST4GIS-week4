/**
 * Using ajax, download some data from a remote server and log it to the console
 */

// selected data: https://raw.githubusercontent.com/aakims/OST4GIS-week4/master/data/syriaRefugeeSites2016.csv
//source: https://data.world/us-state-hiu/ff383a8b-396a-4d78-b403-687b0a783769

$.ajax("https://raw.githubusercontent.com/aakims/OST4GIS-week4/master/data/syriaRefugeeSites2016.csv").then(function(res) {
  console.log(res);
});

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 2
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// L.terminator().addTo(map)
