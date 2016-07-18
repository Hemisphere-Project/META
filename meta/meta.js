var width = 960,
    height = 960;



var cluster = d3.layout.cluster()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

function elbow(d, i) {
  return "M" + d.source.y + "," + d.source.x
      + "V" + d.target.x + "H" + d.target.y;
}

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
    .append("g")
    .attr("transform", "translate(40,0)");
    

    
    




d3.json("planetaryagenda_cd.json", function(error, root) {
  if (error) throw error;


  var nodes = cluster.nodes(root),
      links = cluster.links(nodes);

/*  var link = svg.selectAll(".link")
      .data(links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);
*/
  var link = svg.selectAll(".link")
      .data(cluster.links(nodes))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", elbow);
      
      
  var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })


  var text = node.append("text")
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return "middle"; })
      //.attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .text(function(d) { return d.name; });
      
var bbox = text.node().getBBox();

var rect = node.append("rect")
    .attr("x", function(d) {return this.parentNode.getBBox().x - 3;})
    .attr("y", function(d) {return this.parentNode.getBBox().y - 3;})
    .attr("width", function(d) {return this.parentNode.getBBox().width + 6;})
    .attr("height", function(d) {return this.parentNode.getBBox().height + 6;})
    .style("fill", "#ccc")
    .style("fill-opacity", ".3")
    .style("stroke", "#666")
    .style("stroke-width", "1.5px");
    
    

      
  /*node.append("rect")
      .attr("width", 20)
      .attr("height",4)
      .attr("fill","#008d46");
*/
});

d3.select(self.frameElement).style("height", height + "px");

function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


