exports.parseData = function(rawData, todayDate){

var data = [];
for(var i=0; i<rawData.rows.length; i++){
    if (rawData.rows[i][3] > 0){
        var time = parseInt(rawData.rows[i][0].split("T")[1].split(":")[0]);
        var date = rawData.rows[i][0].split("T")[0];
        data.push([date, time, rawData.rows[i][1]]);
    }
}

var date = data[0][0];
var today=[];
var month=[];
var byHour=[];
var prod = 0;
var hour;

for(var i=1; i<data.length; i++){
    hour = data[i][1];
    //TODO this isn't quite right yet, offset by an hour
    if(hour == data[i-1][1]){
        prod += data[i][2];
        continue;
    }
    //Check for data from a single day
    if(date===data[i][0]){
        prod += data[i][2];
        if(todayDate==date){
            today.push([data[i][1], prod]);
        } else {
        	month.push([data[i][1], prod]);
        }
    } else {
        date = data[i][0];
        prod = 0;
    }
}

myData = {
	daily: today,
	monthly: month
};

    return myData;
}