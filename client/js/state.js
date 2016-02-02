angular.module('ProjectOpenData')
.service('state', [function() {
	this.selected_region = "null";

	this.setSelectedRegion = function(region) {
		this.selected_region = region;
	};

}]);