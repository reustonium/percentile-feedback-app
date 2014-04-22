exports.trimData = function(rawData){
    
var data = [];
for(var i=0; i<rawData.rows.length; i++){
    if (rawData.rows[i][3] > 0){
        var time = parseInt(rawData.rows[i][0].split("T")[1].split(":")[0]);
        data.push([time, rawData.rows[i][1]]);
    }
}

var output = [];
for (var i=0; i<data.length; i++){
    if(i===0){output.push([data[i][0], data[i][1]]);}
    else{
        if(data[i][0]==data[i-1][0]){
            var val = data[i][1]+data[i-1][1];
            output.pop();
            output.push([data[i][0], val]);
        } else {
            output.push([data[i][0], data[i][1]]);
        }
    }
}

var stuff = [];

for(var i=0; i<output.length; i++){
    if(i===0){stuff.push([output[i][0], output[i][1]]);}
    else{
        var val = output[i][1] + stuff[i-1][1];
        stuff.push([output[i][0], val]);
    }
}

var series = {
    "data": [],
    "type": "line",
    "color": 'rgba(144, 238, 126, 1)',
    "marker": {
        enabled: false
    }
}

for(var i=0; i<stuff.length; i++){
    series.data.push([
        stuff[i][0], stuff[i][1]
        ])    
}

return series;
}

exports.monthlyData = function(rawData){
    var data = [];
    for(var i=0; i<rawData.rows.length; i++){
        if (rawData.rows[i][3] > 0){
            var time = parseInt(rawData.rows[i][0].split("T")[1].split(":")[0]);
            var date = parseInt(rawData.rows[i][0].split("T")[0].split("-")[2]);
            data.push([date, time, rawData.rows[i][1]]);
        }
    }

    var date = data[0][0];

    var dailyData=[];
    var prod = 0;
    for(var i=0; i<data.length; i++){
        //Check for data from a single day
        if(date===data[i][0]){
            prod += data[i][2];
            dailyData.push([data[i][1], prod]);
        } else {
            date = data[i][0];
            prod = 0;
        }
    }

    myData = {
        "data": dailyData,
        "type": "scatter",
        "color": 'rgba(119, 152, 191, 0.2)',
        "marker": {
            symbol: 'circle'
        }
    };

    return myData;
}