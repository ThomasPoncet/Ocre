var app = angular.module('ProjectOpenData')
.factory('map', ['$compile', 'dataProvider', 'state', function($compile, dataProvider, state) {
  // factory function body that constructs shinyNewServiceInstance
  var map = {};

  map.create = function(domId, callback_name, $scope, geojson, data) {
    var width = angular.element(domId).parent()[0].offsetWidth;

    $(domId).empty();
    var height = 500;
    /* On créait un nouvel objet path qui permet
      * de manipuler les données géographiques.
    */
    var path = d3.geo.path();

    // On définit les propriétés de la projection à utiliser
    var projection = d3.geo.conicConformal() // Lambert-93
          .center([2.454071, 47.279229]) // On centre la carte sur la France
          .scale(2500)
          .translate([width / 2, height / 2]);

    path.projection(projection); // On assigne la projection au path

    /*
   * On créait un nouvel élément svg à la racine de notre div #map,
   * définie plus haut dans le HTML
   */
    var svg = d3.select(domId).append("svg")
      .attr("width", width)
      .attr("height", height);

    /*
   * On créait un groupe SVG qui va accueillir
   * tous nos départements
   */
    var deps = svg
      .append("g")
      .attr("id", "departements");

    /*
    * On charge les données GeoJSON
    */
    // d3.json(geoShape, function(req, geojson) {

      /*
      * On "bind" un élément SVG path pour chaque entrée
      * du tableau features de notre objet geojson
      */
      var features = deps
        .selectAll("path")
        .data(geojson.features);

      /*
      * On cr"éé un ColorScale, qui va nous-
      * permettre d'assigner plus tard une
      * couleur de fond à chacun de nos
      * départements
      */
      var colorScale = d3.scale.category10();
      //
    //   var echelle = svg.append("g").append("path")
    //   .attr("fill", )
      /*
      * Pour chaque entrée du tableau feature, on
      * créait un élément SVG path, avec les
      * propriétés suivantes
      */

      var key = function(obj) {
        return parseInt(obj, 12);
      };
      var color = {};
      for(var i = 0 ; i < data.points.length; i++) {
        color[key(data.points[i].dept_id)] = data.points[i].color;
      }

      features.enter()
        .append("path")
        .attr('class', 'departement')
        .attr('fill', function(d, i) {
          return color[key(d.properties.CODE_DEPT)];
        })
        .attr("d", path)
        .attr("ng-click", function(d) {
          return callback_name + '("' + d.properties.CODE_DEPT + '")';
        });

        var template = $compile(angular.element(domId).html())($scope);
        angular.element(domId).append(template);
    // });
  };

  return map;
}]);
