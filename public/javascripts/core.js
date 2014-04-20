var pfapp = angular.module('pfapp', ['angularCharts']);

function mainController($scope, $http) {
	$scope.formData = {};

	// when submitting the KEY retrieve data
	$scope.getData = function(){
		$http.get('/api/daily/' + $scope.formData.text)
		.success(function(data) {
			$scope.rtData = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.chartConfig = {
		title : 'My Graph',
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

	$scope.chartData = {
		series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
		data : [{
			x : "Sales",
			y: [100,500, 0],
			tooltip:"this is tooltip"
		},
		{
			x : "Not Sales",
			y: [300, 100, 100]
		},
		{
			x : "Tax",
			y: [351]
		},
		{
			x : "Not Tax",
			y: [54, 0, 879]
		}]     
	};

	$scope.chartType = 'line';
}
