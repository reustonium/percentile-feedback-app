exports.trimData = function(rawData){
	var data = [];
	for(var i=0; i<rawData.rows.length; i++){
	    if (rawData.rows[i][3] > 0){
	        var time = parseInt(rawData.rows[i][0].split("T")[1].split(":")[0]);
	        data.push([time, rawData.rows[i][1]]);
	    }
	}
	return data;
}