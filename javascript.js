var last_long;
var last_lat;
var lat;
var long;
var velocity;

var total_dist = 0.0;
var i = 0;
var timestamp;
var last_timestamp;
var velocity;


//test of git push

function start(){

    
    
    const success = (position) => {
        
        last_lat = lat;
        last_long = long;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        var timestamp = position.timestamp;
        delta_t = timestamp - last_timestamp;
        last_timestamp = position.timestamp;
        console.log(position);
        dist = measure(lat,long,last_lat,last_long);
        velocity = dist / (delta_t/(1000*60*60));
        console.log("Dist: " + dist +", Typeof Dist: " + typeof(dist));
        console.log("Velocity: " + velocity +", Typeof Velocity: " + typeof(velocity));
        total_dist = total_dist + dist;
        console.log("Total Distance: " + dist +", Typeof Total Distance: " + typeof(dist));

        if (isNaN(velocity)){
            document.getElementById("velocity").innerHTML = "--";
        } else {
            document.getElementById("velocity").innerHTML = velocity.toString();
        }

        if (isNaN(total_dist)){
            document.getElementById("total-dist").innerHTML = "--";
        } else {
            document.getElementById("total-dist").innerHTML = total_dist.toString();
        }

        if (isNaN(delta_t)){
            document.getElementById("delta-t").innerHTML = "--";
        } else {
            document.getElementById("delta-t").innerHTML = delta_t.toString();
        }


        
        
        
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