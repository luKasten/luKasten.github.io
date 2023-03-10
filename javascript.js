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
var flag = false;
var time;
var times = [];
var time_axis = [];

// Data Array for plotting at the end
var data = [{
    x: time_axis,
    y: all_velocities,
    mode: "lines",
    type: "scatter"
}];

// Define Layout of Plot
var layout = {
    xaxis: {title: "Time in seconds"},
    yaxis: {title: "Velocities in km/h"},
    title: "Velocities of the Journey"
};

// Will be executen when start button will be pressed

function start(){

    var error_banner = document.getElementById("error");
    error_banner.style.visability = "hidden";

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

        times.push(delta_t);
        
        //Calculate Total-Distance and Mean-Velocity
        total_dist = Math.round(sumArray(all_dist));
        mean_velocity = Math.round(meanArray(all_velocities));

        console.log(total_dist);
        console.log(mean_velocity);//test

        //Check if Values are NaNs and display it
        if (isNaN(velocity)){
            document.getElementById("velocity").innerHTML = "--";
        } else {
            document.getElementById("velocity").innerHTML = (Math.round(velocity*100)/100).toString();
        };

        if (isNaN(total_dist)){
            document.getElementById("total-dist").innerHTML = "--";
        } else {
            document.getElementById("total-dist").innerHTML = (Math.round(total_dist*100)/100).toString();
        };

        if (isNaN(delta_t)){
            document.getElementById("delta-t").innerHTML = "--";
        } else {
            document.getElementById("delta-t").innerHTML = delta_t.toString();
        };

        if (isNaN(dist)){
            document.getElementById("dist").innerHTML = "--";
        } else {
            document.getElementById("dist").innerHTML = (Math.round(dist*100)/100).toString();
        };
        
        if (isNaN(mean_velocity)){
            document.getElementById("mean-velocity").innerHTML = "--";
        } else {
            document.getElementById("mean-velocity").innerHTML = (Math.round(mean_velocity*100)/100).toString();
        };
        
        var btn_start = document.getElementById("btn-start");
        btn_start.style.backgroundColor = "#0DFF00";
    }

    // Errorhandling if the device has no GPS function

    const error = (position) => {
        error_banner.style.visibility = "visible";
    }

    

    if (flag == true) {

        setDatapoint();

    } else {
        flag = true;
        var btn_start = document.getElementById("btn-start");
        btn_start.textContent = "Set Datapoint";
        btn_start.style.backgroundColor = "#0D96FF";
        navigator.geolocation.watchPosition(success, error);
    }

    

}

// Resets all parameters and the journey can be restarted
function reset(){
    createTimeArray(times);
    console.log(time_axis)
    Plotly.newPlot("chart", data, layout);
    flag = false;
    all_dist = [];
    sum_velocity = 0;
    all_velocities = [];
    mean_velocity = 0;
    total_dist = 0;
    counter = 0;
    flag = false;
    var btn_start = document.getElementById("btn-start");
    btn_start.textContent = "Start Journey";
    

}

function createTimeArray(array){
    var sum = 0;
    for(let i =0;i<array.length;i++){
        if (isNaN(array[i])) {
            time_axis.push(sum+=1);
        } else {
            time_axis.push(sum += (array[i]/1000));
        }

    }

}

// adds Datapoint to table

function setDatapoint(){

    counter += 1;
    
    var table = document.getElementById('table');
    row = table.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    
    cell1.innerHTML = counter;
    cell2.innerHTML = delta_t;
    cell3.innerHTML = velocity;
    cell4.innerHTML = total_dist;
    
}

// means all values of an array

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

// summs all values of an array

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

// generally used geo measurement function https://en.wikipedia.org/wiki/Haversine_formula
// function taken from https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
// The haversine formula determines the great-circle distance between two points on a sphere given their longitudes and latitudes.

function measure(lat1, lon1, lat2, lon2){
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



