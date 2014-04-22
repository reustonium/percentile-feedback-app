var pfapp = angular.module('pfapp', ['highcharts-ng', 'ngPrettyJson']);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.chartConfig = {};

	$scope.chartConfig.options = {
        chart: {
            //type: 'scatter'
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        }
    };

    $scope.chartConfig.series = [{
            data: [10, 15, 12, 8, 7],
            color: 'rgba(0, 0, 255, 0.2)',
            type: 'scatter'
        }];

    $scope.chartConfig.title = {
    	text: 'Percentile Feedback'
    };

    $scope.chartConfig.loading = false;

    $scope.myJSON = {json: $scope.chartConfig};

	// when submitting the KEY retrieve data
	$scope.getData = function(){
		$http.get('/api/daily/' + $scope.formData.text)
		.success(function(data) {
			//$scope.chartData = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};


}
