var app = angular.module('ProjectOpenData')
.factory('map', ['$compile', function($compile) {
  // factory function body that constructs shinyNewServiceInstance
  var map = {};

  map.create = function(domId, callback_name, $scope) {
    var width = angular.element(domId).parent()[0].offsetWidth;
    var height = 370;
    /*
      * On créait un nouvel objet path qui permet
      * de manipuler les données géographiques.
    */
    var path = d3.geo.path();

    // On définit les propriétés de la projection à utiliser
    var projection = d3.geo.conicConformal() // Lambert-93
          .center([2.454071, 47.279229]) // On centre la carte sur la France
          .scale(2000)
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
    d3.json('static/DEPARTEMENTmin.json', function(req, geojson) {

      /*
      * On "bind" un élément SVG path pour chaque entrée
      * du tableau features de notre objet geojson
      */
      var features = deps
        .selectAll("path")
        .data(geojson.features);

      /*
      * On cr"éé un ColorScale, qui va nous
      * permettre d'assigner plus tard une
      * couleur de fond à chacun de nos
      * départements
      */
      var colorScale = d3.scale.category20c();

      /*
      * Pour chaque entrée du tableau feature, on
      * créait un élément SVG path, avec les
      * propriétés suivantes
      */
      features.enter()
        .append("path")
        .attr('class', 'departement')
        .attr('fill', function(d) {
          return colorScale(+d.properties.CODE_DEPT);
        })
        .attr("d", path)
        .attr("ng-click", function(d) {
          return callback_name + '("' + d.properties.CODE_DEPT + '")';
        });

        var template = $compile(angular.element(domId).html())($scope);
        angular.element(domId).replaceWith(template);
    });
  };
/*
  map.centered = null;

  map.countyClickHandler = function(deps, path, width, height, callback) {
    return function(d) {
      var x, y, k;

      if (d && map.centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 5;
        map.centered = d;
        //on appelle le callback
        callback(d3.select(this).attr("data-code"));
      } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        map.centered = null;
      }

      deps.selectAll("path")
      .classed("active", map.centered && function(d) { return d === map.centered; });

      var trStr = "translate(" + width / 2 + "," + height / 2 + ")" +
      "scale(" + k + ")translate(" + -x + "," + -y + ")";

      deps.transition()
      .duration(1000)
      .attr("transform", trStr);
    };
  };
*/
  return map;
}]);
