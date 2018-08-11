 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.3/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
   

# This is the index file

 <div id="mapid"></div>

<style>
#mapid {height: 180px; }
</style>


 <!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.3.3/dist/leaflet.js"
   integrity="sha512-tAGcCfR4Sc5ZP5ZoVz0quoZDYX5aCtEm/eu1KhSLj2c9eFrylXZknQYmxUssFaVJKvvc0dJQixhGjG2yXWiV9Q=="
   crossorigin=""></script>

<script>
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// pk.eyJ1Ijoicm9iZXJ0bHJlYWQiLCJhIjoiY2lvcTkyejZtMDAxdHUzbTB0Z3R5MmIxZyJ9.wabsdiW8W9nY-48LRiclmw


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={pk.eyJ1Ijoicm9iZXJ0bHJlYWQiLCJhIjoiY2lvcTkyejZtMDAxdHUzbTB0Z3R5MmIxZyJ9.wabsdiW8W9nY-48LRiclmw}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
</script>
