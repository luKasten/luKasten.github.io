var last_long;
var last_lat;
var lat;
var long;
var timestamp;
var last_timestamp;
var velocity;
var all_dist = [];
var dist;
var sum_velocity = 0;
var all_velocities = [];
var mean_velocity = 0;
var total_dist = 0;
var counter = 0;



//test of git push

function start(){
    
    counter = 1;
    

    const success = (position) => {     
        //Set the last position   
        last_lat = lat;
        last_long = long;
        
        //Set the new position with timestamp
        lat = position.coords.latitude;
        long = position.coords.longitude;
        var timestamp = position.timestamp;

        //Calculate the time difference between two steps
        delta_t = timestamp - last_timestamp;
        last_timestamp = position.timestamp;

        //Calculate distance between two steps
        dist = measure(lat,long,last_lat,last_long);

        //Calculate velocity between two steps
        velocity = Math.round(dist / (delta_t/(60*60)));

        //Add variables to Dataarrays
        all_velocities.push(velocity);
        all_dist.push(dist);
        
        //Calculate Total-Distance and Mean-Velocity
        total_dist = Math.round(sumArray(all_dist));
        mean_velocity = Math.round(meanArray(all_velocities));

        console.log(total_dist);
        console.log(mean_velocity);//test

        //Check if Values are NaNs and display it
        if (isNaN(velocity)){
            document.getElementById("velocity").innerHTML = "--";
        } else {
            document.getElementById("velocity").innerHTML = Math.round(velocity).toString();
        };

        if (isNaN(total_dist)){
            document.getElementById("total-dist").innerHTML = "--";
        } else {
            document.getElementById("total-dist").innerHTML = Math.round(total_dist).toString();
        };

        if (isNaN(delta_t)){
            document.getElementById("delta-t").innerHTML = "--";
        } else {
            document.getElementById("delta-t").innerHTML = delta_t.toString();
        };

        if (isNaN(dist)){
            document.getElementById("dist").innerHTML = "--";
        } else {
            document.getElementById("dist").innerHTML = dist.toString();
        };
        
        if (isNaN(mean_velocity)){
            document.getElementById("mean-velocity").innerHTML = "--";
        } else {
            document.getElementById("mean-velocity").innerHTML = Math.round(mean_velocity).toString();
        };
    }

    const error = (position) => {
        console.log("Error, not connected to GPS");
    }

    navigator.geolocation.watchPosition(success, error);

    

}

function meanArray(array){
    var sum = 0;
    amount_NaN = 0;
    for(var i = 0; i<array.length; i++){
        if (isNaN(array[i])) {
            amount_NaN += 1;
        } else {
            sum += array[i]
        }
        
    }
    return sum/(array.length-amount_NaN);
}

function sumArray(array){
    var sum = 0;
    for(var i = 0; i<array.length; i++){
        if (isNaN(array[i])) {
            
        } else {
            sum += array[i]
        }
        
    }
    return sum;
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

