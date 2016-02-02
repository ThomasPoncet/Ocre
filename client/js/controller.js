var app = angular.module('ProjectOpenData', []);

app.controller('MapController', ['$scope', 'map', 'state', function ($scope, map, state) {
	$scope.state = state;

	map.create("#map", function(code_dep) {
		state.setSelectedRegion(code_dep);
		console.log(code_dep);
	});
}]);

app.controller('SettingsBoard', ['$scope', 'state', function($scope, state) {
	$scope.state = state;
	$scope.b = "00"
	$scope.update = function() {
		console.log(",kfds");
		$scope.b =  state.selected_region;
	}
}]);