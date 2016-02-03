angular.module('ProjectOpenData', ['chart.js'])

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

	$scope.available_parties = ["FN", "centre", "UMP", "Verts"];
	$scope.available_dataSet = ["Chomage", "viol infantile"];

	$scope.selectDataSet = function(dataset) {
		state.setDataSet(dataset);
	};
	$scope.selectPartie = function(partie) {
		state.setSelectedPartie(partie);
	};
	$scope.unselectRegion = function() {
		state.setSelectedRegion(null);
	}

}])
.controller('PanelPlotCloud', ['$scope', function($scope) {
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  	$scope.series = ['Series A', 'Series B'];
  	$scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  	];
  	$scope.onClick = function (points, evt) {
    	console.log(points, evt);
  	};
}]);