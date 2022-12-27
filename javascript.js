var x = document.getElementById("demo");
var last_long = 0.0;
var last_lat = 0.0;
var lat;
var long;

total_dist = 0.0;
var position = 0.0;
var i = 0;
//test of git push

function start(){
    
    const success = (position) => {
        last_lat = lat;
        last_long = long;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(position);
        dist = measure(lat,long,last_lat,last_long);
        total_dist = total_dist + dist;
        console.log(total_dist);
    }
    const error = (position) => {
        console.log("Error, not connected to GPS");
    }

    navigator.geolocation.watchPosition(success, error);

    

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        x = "Geolocation is not supported by this browser.";
    }
    
}

function showPosition(position) {
    console.log("Test" + position.coords.latitude);
    console.log("Test" + position.coords.longitude);
    lat =  position.coords.latitude;
    long = position.coords.longitude;
}

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function https://en.wikipedia.org/wiki/Haversine_formula
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}