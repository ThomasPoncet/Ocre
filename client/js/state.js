angular.module('ProjectOpenData')
.service('state', ['dataProvider', function(dataProvider) {
	this.region_number = 100;

	this.selected_tour = 1;

	this.selected_region = null;

	this.available_parties = [];

	this.data_set = 1;

	this.available_dataSet = [];

	this.update_listes = function() {
		var f = function(state) {
			return function (data) {
				state.available_parties = data;
				state.selected_partie = [data[0]];
			}
		};

		dataProvider.getListes(this.selected_tour, f(this));
	};

	var f = function(state) {
		return function (data) {
			state.available_dataSet = data;
			state.data_set = data[0];
		}
	};

	dataProvider.getDatasetList(f(this));

	this.update_listes();

	this.setSelectedRegion = function(region) {
		this.selected_region = region;
	};

	this.selected_partie = [];

	this.setSelectedPartie = function(partie) {
		this.selected_partie = partie;
	};


	this.setDataSet = function(dataSet) {
		this.data_set = dataSet;
	};


	this.setTour = function(tour) {
		if(tour == 1 || tour == 2) {
			this.selected_tour = tour;
		}
	};

	this.getSelectedPartieId = function () {
		var res = [];
		for(var partie of this.selected_partie) {
			res.push(partie.id);
		}
		return res;
	};

	this.getDatasetId = function() {
		return this.data_set.id;
	}
}]);