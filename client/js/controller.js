angular.module('ProjectOpenData', [])

.controller('MapController', ['$scope', '$compile', 'map', 'state', function ($scope, $compile, map, state) {
	map.create("#map", "onMapClick", $scope);
	$scope.state = state;

	$scope.onMapClick = function(code_dep) {
		console.log("modif callback " + code_dep);
		state.setSelectedRegion(code_dep);
	}

	
}])

.controller('SettingsBoard', ['$scope', 'state', function($scope, state) {
	$scope.state = state;
}]);