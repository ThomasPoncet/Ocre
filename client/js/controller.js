angular.module('ProjectOpenData', ['nvd3'])

.controller('MapController', ['$scope', '$compile', 'map', 'state', 'dataProvider', function ($scope, $compile, map, state, dataProvider) {

    // Pourquoi ne pas initialiser l'état (tour = 1, parti = null, datasetId = null
    // Dans data provider si je vois null et null, je t'envoie rien et bim tu affiche la carte en couleur default.
    var draw_map = function() {
        dataProvider.getFrance(function (franceGeog) {
            dataProvider.getAllCorrelations(state.selected_tour, state.getSelectedPartieId(), state.getDatasetId(), function (data) {
                map.create("#map", "onMapClick", $scope, franceGeog, data);
            });

        });
    };

	$scope.state = state;

	$scope.onMapClick = function(code_dep) {
		state.setSelectedRegion(code_dep);
	};

    $scope.$watchGroup(["state.selected_tour", "state.selected_partie.length", "state.data_set"], function (newV, oldV) {
        if (newV[0] && newV[1] && newV[2]) {
            draw_map();
        }
    });

}])

.controller('SettingsBoard', ['$scope', 'state', 'dataProvider', function($scope, state, dataProvider) {
	$scope.state = state;


    $scope.$watch('state.selected_tour', function(n, o) {
        if(n && n != o) {
            state.update_listes();
        }
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
        if (state.available_parties.length == 0) {
            return;
        }

        dataProvider.loadAllResVotes(state.selected_tour, state.getSelectedPartieId(), function() {
            dataProvider.loadDataset(state.getDatasetId(), function() {

                $scope.data = [];
                for(var p = 0; p < state.selected_partie; p++) {
                    data.push({
                        "key" : state.selected_partie[p].name,
                        "values" : []
                    });

                    for(var i = 0; i < state.region_number; i++) {
                        $scope.data[p].values.push({
                            x : dataProvider.getResVote(state.selected_tour, i, state.selected_partie[p].id),
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
                            "axisLabel": "Pourcentage des votes"
                        },
                        "yAxis": {
                            "axisLabel": state.data_set.name,
                            "axisLabelDistance": -5
                        }

                    }
                };
            });
        });
	};

    //listener
	$scope.$watchGroup(['state.data_set', 'state.selected_partie.length', 'state.selected_tour'], function(newV, oldV) {
		genData();
	});
}])
.controller('CorelationCadran', ['$scope', 'state', 'dataProvider', 'cadran', function($scope, state, dataProvider, cadran) {
    $scope.state = state;

    var redraw = function() {
        dataProvider.getAllCorrelations(state.selected_tour, state.getSelectedPartieId(), state.getDatasetId(), function (data) {
            cadran.create("#cadran", $scope, data);
        });
    };

    $scope.$watchGroup(["state.selected_tour", "state.selected_partie.length", "state.data_set"], function(newV, oldV) {
        if(newV) {
            redraw();
        }
    });
}]);
