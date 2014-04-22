var pfapp = angular.module('pfapp', ['highcharts-ng', 'ngPrettyJson']);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.chartConfig = {
		loading: true,
	};

	$scope.chartConfig.options = {
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
   		legend: {
			enabled: false
		}
    };

    $scope.chartConfig.series = [{
    		name: 'blank',
            data: []
        }];

    $scope.chartConfig.title = {
    	text: 'Percentile Feedback'
    };

    $scope.chartConfig.loading = false;

    $scope.myJSON = {json: $scope.chartConfig};

	// when submitting the KEY retrieve data
	$scope.getData = function(){

		//TODO call monthly API
		//push data to new chartConfig.series

		//TODO push data to new chartConfig.series
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
