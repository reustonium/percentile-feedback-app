var pfapp = angular.module('pfapp', ['highcharts-ng', 'ngPrettyJson']);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.chartConfig = {
		loading: true,
	};

	$scope.chartConfig.options = {
		colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
			"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
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
			}
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
			}
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

    $scope.chartConfig.loading = false;

    $scope.myJSON = {json: $scope.chartConfig};

	// when submitting the KEY retrieve data
	$scope.getData = function(){
		$scope.chartConfig.series = [];

		$http.get('/api/monthly/' + $scope.formData.text)
		.success(function(data){
			$scope.chartConfig.series.push(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		})

		$http.get('/api/daily/' + $scope.formData.text)
		.success(function(data) {
			$scope.chartConfig.loading = false;
			$scope.chartConfig.series.pop();
			$scope.chartConfig.series.push(data);
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};


}
