var pfapp = angular.module('pfapp', ['angularCharts']);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.chartData = {
		"series": ["daily"],
		"data": [{
			"x":"test",
			"y":[0]
		}]
	};

	// when submitting the KEY retrieve data
	$scope.getData = function(){
		$http.get('/api/daily/' + $scope.formData.text)
		.success(function(data) {
			$scope.chartData = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.chartConfig = {
		title : 'Productivity',
		tooltips: true,
		labels : false,
/*		mouseover: function() {},
		mouseout: function() {},
		click: function() {},*/
		legend: {
			display: true,
		    //could be 'left, right'
		    position: 'left'
		}
	};

	$scope.chartType = 'line';
}
