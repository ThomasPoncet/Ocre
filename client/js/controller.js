angular.module('ProjectOpenData', ['nvd3'])

.controller('MapController', ['$scope', '$compile', 'map', 'state', 'dataProvider', function ($scope, $compile, map, state, dataProvider) {

    var draw_map = function() {
        dataProvider.getFrance(function (franceGeog) {

            dataProvider.getAllCorrelations(state.selected_tour, state.selected_partie, state.data_set, function (data) {
                map.create("#map", "onMapClick", $scope, franceGeog, data);
            });

        });
    };

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
	};

    $scope.$watchGroup(["state.selected_tour", "state.selected_partie", "state.data_set"], function(newV, oldV) {
        draw_map();
    });
}])

.controller('SettingsBoard', ['$scope', 'state', 'dataProvider', function($scope, state, dataProvider) {
	$scope.state = state;

    var update_listes = function() {
        dataProvider.getListes(state.selected_tour, function(data) {
            $scope.available_parties = data;
        });
    };
    update_listes();
    $scope.$watch('state.selected_tour', function(n, o) {
        if(n) {
            update_listes();
        }
    });

    dataProvider.getDatasetList(function(data) {
         $scope.available_dataSet = data;
    });

	$scope.selectDataSet = function(dataset) {
		state.setDataSet(dataset);
	};
	$scope.selectPartie = function(partie) {
        var index = state.selected_partie.indexOf(partie);
        if(index == -1) {
            state.selected_partie.push(partie);
        } else {
            state.selected_partie.splice(index, 1);
        }
	};
	$scope.unselectRegion = function() {
		state.setSelectedRegion(null);
	};
    $scope.changeTour = function () {
        state.setTour(3 - state.selected_tour);
    }

}])
.controller('PanelPlotCloud', ['$scope', 'state', 'dataProvider', function($scope, state, dataProvider) {
	$scope.state = state;


	var genData = function() {

		$scope.data = [];
        for(var p = 0; p < state.selected_partie; p++) {
            data.push({
                "key" : state.selected_partie[p].name,
                "values" : []
            });

            for(var i = 0; i < state.region_number; i++) {
                $scope.data[p].values.push({
                    x : dataProvider.getResVote(state.selected_tour, i, state.selected_partie[p]),
                    y : dataProvider.getValueInDataSet(state.data_set, i)
                });
            }
        }



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


}])
.controller('CorelationCadran', ['$scope', 'state', 'dataProvider', 'cadran', function($scope, state, dataProvider, cadran) {
    $scope.state = state;

    var redraw = function() {
        dataProvider.getAllCorrelations(state.selected_tour, state.selected_partie, state.data_set, function (data) {
            cadran.create("#cadran", $scope, data);
        });
    };

    $scope.$watch('state.selected_tour', function(newV, oldV) {
        if(newV) {
            redraw();
        }
    });
    $scope.$watch('state.selected_partie', function(newV, oldV) {
        if(newV) {
            redraw();
        }
    });
    $scope.$watch('state.data_set', function(newV, oldV) {
        if(newV) {
            redraw();
        }
    });
    redraw();
}]);
