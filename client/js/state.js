angular.module('ProjectOpenData')
.service('state', [function() {
	this.selected_region = null;

	this.setSelectedRegion = function(region) {
		this.selected_region = region;
	};

	this.selected_partie = ["LFN"];

	this.setSelectedPartie = function(partie) {
		this.selected_partie = partie;
	};

	this.data_set = 0;

	this.setDataSet = function(dataSet) {
		this.data_set = dataSet;
	};

	this.region_number = 100;

	this.selected_tour = 1;

	this.setTour = function(tour) {
		if(tour == 1 || tour == 2) {
			this.selected_tour = tour;
		}
	}
}]);