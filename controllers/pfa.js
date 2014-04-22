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
    "type": "line"
}

for(var i=0; i<stuff.length; i++){
    series.data.push([
        stuff[i][0], stuff[i][1]
        ])    
}

return series;
}