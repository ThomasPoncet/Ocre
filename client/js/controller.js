angular.module('ProjectOpenData', [])

.controller('MapController', ['$scope', '$compile', 'map', 'state', function ($scope, $compile, map, state) {
	$scope.state = state;

	//on instancie la map
	map.create("#map", "onMapClick", $scope);
	$scope.onMapClick = function(code_dep) {
		state.setSelectedRegion(code_dep);
	}
}])

.controller('SettingsBoard', ['$scope', 'state', function($scope, state) {
	$scope.state = state;
}]);