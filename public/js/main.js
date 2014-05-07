$(document).ready(function() {

    var chart;
    var requestToday = function(){
        //TODO: replace with today's date
        var today = moment().format('YYYY-MM-DD');
        console.log('today is this date: ' + today);
        $.ajax({
            url: '/api/getDay/' + today,
            success: function(data){
                console.log(data);
                chart.title.text = data[0];
                chart.series[0].setData(data[today],true);
            },
            cache: false
        });
    };

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'myChart',
            height: 500,
            backgroundColor: '#272B30',
            plotBorderColor: '#606063',
            style: {
                fontFamily: '"Unica One", sans-serif'
            },
            events: {
                load: function(){
                    requestToday();
                    setInterval(requestToday, 1000*60*5);
                }
            }
        },
        title: {
            text: 'Percentile Feedback',
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'

                }
            },
            tickInterval: 1
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            },
            min: 0
        },
        legend: {
            enabled: false
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)',
        series: [{
            name: 'today',
            data: [],
            type: 'spline',
            color: 'rgba(144,238,126,1)',
            marker: {
                enabled: false
            }
        },
        {
            name: 'hist',
            data: [],
            type: 'scatter',
            color: 'rgba(119, 152, 191, 0.3)',
            marker: {
                symbol: 'circle',
                radius: 6
            }
        }],
        credits: {
            enabled: false
        }
    });
});
