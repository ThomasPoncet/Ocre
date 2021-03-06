angular.module('ProjectOpenData')
.factory("cadran", ["state", function(state) {
    var cadran = {};

    cadran.create = function(domId, $scope, geojson) {
        var width = angular.element(domId)[0].offsetWidth;
        var height = 370;


        var max_min = geojson.graph_metadata.max;

        var xValue = function(d) { return +d.votes_normalized;}, // data -> value
            xScale = d3.scale.linear().domain([-max_min, +max_min]).range([-width/2, width/2]), // value -> display
            xMap = function(d) { return xScale(-xValue(d));}, // data -> display
            xAxis = d3.svg.axis().scale(xScale).orient("up").ticks(0);

// setup y
        var yValue = function(d) { return +d.other_normalized;}, // data -> value
            yScale = d3.scale.linear().domain([-max_min, +max_min]).range([-height/2, height/2]), // value -> display
            yMap = function(d) { return yScale(yValue(d));}, // data -> display
            yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(0);

// setup fill color
        var cValue = function(d) { return d.color;};

        var old_svg = d3.select(domId).select("svg");
        if(old_svg) {
            old_svg.remove();
        }

        var svg = d3.select(domId)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");
           // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
//        var tooltip = d3.select("body").append("div")
//            .attr("class", "tooltip")
//            .style("opacity", 0);


            // don't want dots overlapping axis, so add in buffer to data domain
            //xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
            //yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

            // x-axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + width/2 +", " + height/2 + ")")
                .call(xAxis);

            // Add the text label for the x axis
            svg.append("text")
                .attr("transform", "translate(" + (width * 0.75) + " ," + (height * .55) + ")")
                .attr("id", "labelx_candran")
                .style("text-anchor", "middle")
                .text("% Vote Normalisé");

            // y-axis
            svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + width/2 +", " + height/2 + ")")
                .call(yAxis);

            // Add the text label for the Y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", width / 2)
                .attr("x", 0 - height / 3)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text(state.data_set.name);

            // draw dots
            svg.selectAll(".dot")
                .data(geojson.points)
                .enter().append("circle")
                .attr("transform", "translate(" + width/2 +", " + height/2 + ")")
                .attr("class", "dot")
                .attr("r", 3.5)
                .attr("cx", xMap)
                .attr("cy", yMap)
                .attr("stroke", "black")
                .style("fill", function(d) { return cValue(d);});
               /* .on("mouseover", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d)
                            + ", " + yValue(d) + ")")
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })*/
               /* .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });*/

            // draw legend
        /*    var legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            // draw legend colored rectangles
            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            // draw legend text
            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) { return d;});*/
    };

    return cadran;
}]);