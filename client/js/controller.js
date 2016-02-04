angular.module('ProjectOpenData', ['nvd3'])

.controller('MapController', ['$scope', '$compile', 'map', 'state', 'dataProvider', function ($scope, $compile, map, state, dataProvider) {

	dataProvider.getFrance(function(franceGeog){
		map.create("#map", "onMapClick", $scope, franceGeog);
	});

	// Only for test !
	// dataProvider.getAllCorrelations("1", ["LFN", "LUD"], "2", function(listes){
 // 		console.log(listes);
	// 	setTimeout(function(){
	// 		dataProvider.getAllCorrelations("1", ["LFN", "LUD"], "2", function(listes){
	// 	 		console.log(listes);
	// 		});
	// 	}, 3000);
 // 	});

	// Only for test !
	// dataProvider.getRegion(84, function(regionGeog){
	// 	map.create("#region", "onMapClick", $scope, regionGeog);
	// });

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
.controller('PanelPlotCloud', ['$scope', 'state', 'dataProvider', function($scope, state, dataProvider) {
	$scope.state = state;


	var genData = function() {
		$scope.data = [{
			key : 'Group 0',
			values : []
		}];

		for(var i = 0; i < state.region_number; i++) {
			$scope.data[0].values.push({
				x : dataProvider.getValueInDefaultDataSet(state.selected_partie, i),
				y : dataProvider.getValueInDataSet(state.data_set, i)
			});
		};

		$scope.options = {
		    chart: {
		    	"type": "scatterChart",
		    	"height": 450,
		    	"scatter": {
		      		"onlyCircles": true
		    	},
		    	"showDistX": true,
		    	"showDistY": true,
		    	"duration": 350,
		    	"xAxis": {
		      		"axisLabel": state.selected_partie + " (%)"
		    	},
		    	"yAxis": {
		      		"axisLabel": state.data_set,
		      		"axisLabelDistance": -5
		    	}

			}
		};
	};

	$scope.$watch('state.selected_partie', function(newV, oldV) {
		genData();
	});
	$scope.$watch('state.data_set', function(newV, oldV) {
		genData();
	});

	genData();


}]);
