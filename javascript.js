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
var counter = 0;



//test of git push

function start(){
    
    counter = 1;
    

    const success = (position) => {
        console.log("Total Distance: " + total_dist +", Typeof Total Distance: " + typeof(total_dist));
        //total_dist = total_dist_temp;
        last_lat = lat;
        last_long = long;
        
        lat = position.coords.latitude;
        long = position.coords.longitude;
        var timestamp = position.timestamp;
        delta_t = timestamp - last_timestamp;
        last_timestamp = position.timestamp;
        console.log(position);
        dist = measure(lat,long,last_lat,last_long);
        velocity = Math.round(dist / (delta_t/(60*60)))

        all_velocities.push(velocity);
        all_dist.push(dist);
        //console.log("Dist: " + dist +", Typeof Dist: " + typeof(dist));
        //console.log("Total dist: " + dist +", Typeof Total Dist: " + typeof(total_dist));
        //console.log("Velocity: " + velocity +", Typeof Velocity: " + typeof(velocity));
        //console.log("sum_velocity: " + sum_velocity +", Typeof sum_Velocity: " + typeof(sum_velocity));
        //console.log("Counter: " + counter +", Typeof counter: " + typeof(counter));

        var total_dist = sumArray(all_dist);

        mean_velocity = meanArray(all_velocities);

        console.log(mean_velocity);
        

        //console.log("Total dist: " + dist +", Typeof Total Dist: " + typeof(total_dist));
        //console.log("Mean velo: " + mean_velocity +", Typeof Mean Velocity: " + typeof(mean_velocity));


        if (isNaN(velocity)){
            document.getElementById("velocity").innerHTML = "--";
        } else {
            document.getElementById("velocity").innerHTML = velocity.toString();
        };

        if (isNaN(total_dist)){
            document.getElementById("total-dist").innerHTML = "--";
        } else {
            document.getElementById("total-dist").innerHTML = total_dist.toString();
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
            document.getElementById("mean-velocity").innerHTML = mean_velocity.toString();
        };

        counter += 1
    }

    const error = (position) => {
        console.log("Error, not connected to GPS");
    }

    navigator.geolocation.watchPosition(success, error);

    

}

function meanArray(array){
    var sum = 0;
    for(var i = 0; i<array.length; i++){
        if (isNaN(array[i])) {
            
        } else {
            sum += array[i]
        }
        
    }
    return sum/array.length;
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

