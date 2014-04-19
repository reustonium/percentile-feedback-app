var pfapp = angular.module('pfapp', []);

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
	}
}
