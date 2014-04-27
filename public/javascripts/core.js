var pfapp = angular.module('pfapp', ['highcharts-ng', 'ngPrettyJson']);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.chartConfig = {
		loading: true,
	};

	//TODO move this to a config JSON
	$scope.chartConfig.options = {
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
				stops: [
					[0, '#2a2a2b'],
					[1, '#3e3e40']
				]
			},
			style: {
				fontFamily: "'Unica One', sans-serif"
			},
			plotBorderColor: '#606063'
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
		maskColor: 'rgba(255,255,255,0.3)'
    };

    $scope.chartConfig.series = [{
    		name: 'blank',
            data: []
        }];

    $scope.chartConfig.loading = true;

    $scope.myJSON = {json: $scope.chartConfig};

	// when submitting the KEY retrieve data
	$scope.getData = function(){
		$scope.chartConfig.series = [];


		$http.get('/api/fetchData/' + $scope.formData.text + "/" + moment().format("YYYY-MM-DD"))
		.success(function(data) {
			$scope.chartConfig.loading = false;
			$scope.chartConfig.series.push({
			    "data": data.monthly,
			    "type": "scatter",
			    "color": 'rgba(119, 152, 191, 0.3)',
			    "marker": {
			        symbol: 'circle',
			        radius: 6
    			}
			});
			$scope.chartConfig.series.push({
				"data": data.daily,
				"type": 'spline',
				"color": 'rgba(144,238,126,1)',
				"marker":{
					enabled: false
				}
			});
			$scope.chartConfig.series.push({
				"data": [{
						y: data.pfa[0],
						name: "pfa"
					},{
						y: data.pfa[1],
						name: "bad"
					}

				],
				"type": "pie",
				"center": ["15%","25%"],
				"size": 150,
				"borderColor": 'rgba(0,0,0,0)',
				"enableMouseTracking": false,
				"endAngle": 90,
				"innerSize": "25%",
				"startAngle": -90,
				"dataLabels":{
					connectorWidth: 0,
					formatter: function(){
						var label = '';
						if(this.point.name === "pfa"){
							label = this.y + "%";
						}
						return label;
					},
					style: {
						fontWeight: 'bold',
						fontSize: 60,
						color: data.pfaColor
					},
					y: 110,
					x: 85
				},
				"colors": [data.pfaColor,'rgba(0,255,0,0)']
			});
			$scope.dateJSON = {json: data.date};
			$scope.pfa = {json: data.pfa};
			$scope.hist = {json: data.hist};
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};


}
