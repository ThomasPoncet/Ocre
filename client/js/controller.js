var app = angular.module('ProjectOpenData', []);

app.controller('MapController', ['$scope', 'map', function ($scope, map) {
	$scope.txt = "gtezsdfkljhsqdfkjsdqfjkhsqdklfjdsklfjqsdjfljkds";
	map.create("#map");
}]);

