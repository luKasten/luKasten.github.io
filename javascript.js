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
var time = 0;
var times = [];



//test of git push

function start(){

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
        time = time+timestamp;
        times.push(time)
        
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

    const error = (position) => {
        console.log("Error, not connected to GPS");
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
function reset(){
    Plotly.newPlot("chart", data);
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

var xArray = [50,60,70,80,90,100,110,120,130,140,150];
var yArray = [7,8,8,9,9,9,10,11,14,14,15];

// Define Data
var data = [{
    x: all_velocities,
    y: times,
    mode: "lines",
    type: "scatter"
}];

// Define Layout
var layout = {
    xaxis: {range: [40, 160], title: "Square Meters"},
    yaxis: {range: [5, 16], title: "Price in Millions"},
    title: "House Prices vs Size"
};

// Display using Plotly


