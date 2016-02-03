angular.module('ProjectOpenData', [])

.controller('MapController', ['$scope', '$compile', 'map', 'state', 'dataProvider', function ($scope, $compile, map, state, dataProvider) {
	dataProvider.getListes(1, function(listes){
		console.log(listes);
	});
	dataProvider.getFrance(function(franceGeog){
		map.create("#map", "onMapClick", $scope, franceGeog);
	});
	// Only for test !
	dataProvider.getRegion(84, function(regionGeog){
		map.create("#region", "onMapClick", $scope, regionGeog);
	});

	// map.create("#map", "onMapClick", $scope, 'static/DEPARTEMENTmin.json');
	$scope.state = state;

	//on instancie la map
	// map.create("#map", "onMapClick", $scope);
	$scope.onMapClick = function(code_dep) {
		state.setSelectedRegion(code_dep);
	}
}])

.controller('SettingsBoard', ['$scope', 'state', function($scope, state) {
	$scope.state = state;
}]);
