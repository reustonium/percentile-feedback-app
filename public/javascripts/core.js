var pfapp = angular.module('pfapp', []);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.users = [
		{'name': 'Andy',
		 'sex': 'male'},
		 {'name': 'Lisa',
		  'sex': 'female'}];

	// when submitting the KEY retrieve data
	$scope.getData = function(){
		$http.get('/api/daily/' + $scope.formData)
		.success(function(data) {
			$scope.rtData = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}
}
