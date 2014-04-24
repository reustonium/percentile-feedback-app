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

    for(var i=0; i<data.length; i++){
        
        //add first value
        if(i===0){
            prod = data[i][2];
            month.push([data[i][1], prod]);
        } else {
            var sameDate = (data[i][0] === data[i-1][0]);
            var sameHour = (data[i][1] === data[i-1][1]);
            var isToday = (todayDate === data[i][0]);
            
            if(!sameDate){prod=data[i][2];}
            
            //if date and hour are the same, add prod, replace previous entry
            if(sameDate && !isToday){
                if(sameHour){month.pop();}
                prod += data[i][2];
                month.push([data[i][1], prod]);
            }
            
            if(isToday){
                if(today.length<1){prod=0;}
                if(sameHour){today.pop();}
                prod += data[i][2];
                today.push([data[i][1], prod]);
            }
        }
    }

    myData = {
        daily: today,
        monthly: month,
        date: todayDate
    };

    return myData;
}