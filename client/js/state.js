angular.module('ProjectOpenData')
.service('state', [function() {
	this.selected_region = null;

	this.setSelectedRegion = function(region) {
		this.selected_region = region;
	};

	this.selected_partie = null;

	this.setSelectedPartie = function(partie) {
		this.selected_partie = partie;
	};

	this.data_set = null;

	this.setDataSet = function(dataSet) {
		this.data_set = dataSet;
	};

	this.region_number = 100;
}]);