var pfapp = angular.module('pfapp', ['highcharts-ng']);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.chartConfig = {
             //This is not a highcharts object. It just looks a little like one!
             options: {
                 //This is the Main Highcharts chart config. Any Highchart options are valid here.
                 //will be ovverriden by values specified below.
                 chart: {
                     type: 'bar'
                 },
                 tooltip: {
                     style: {
                         padding: 10,
                         fontWeight: 'bold'
                     }
                 },
             },

             //The below properties are watched separately for changes.

             //Series object (optional) - a list of series using normal highcharts series options.
             series: [{
                 data: [10, 15, 12, 8, 7]
             }],
             //Title configuration (optional)
             title: {
                 text: 'Hello'
             },
             //Boolean to control showng loading status on chart (optional)
             loading: false,
             //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
             //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
             xAxis: {
              currentMin: 0,
              currentMax: 20,
              title: {text: 'values'}
             },
             //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
             useHighStocks: false
             }

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
