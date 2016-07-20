var width = 960,
height = 960;
var nodeWidth = 100;
var nodeHeight = 30;
var width = window.innerWidth*0.9,
height = window.innerHeight*0.9;

var i = 0,
duration = 750, 
root;

var colors = ["black","#FEBC59","#E64047","#4AA6E7"];



var tree = d3.layout.tree()
.size([height, width ]);
//.nodeSize([nodeHeight,nodeWidth]);

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





d3.json("planetaryagenda_cd.json", function(error, data) {
		if (error) throw error;
		
		
		root = data;
		root.x0 = height / 2;
		root.y0 = 0;
		
		addGroupToData(data)
		
		
		var nodes = tree.nodes(root),
		links = tree.links(nodes);
		
		
		function collapse(d) {
			if (d.children) {
				d._children = d.children;
				d._children.forEach(collapse);
				d.children = null;
			}
		}
		
		root.children.forEach(collapse);
		update(root);
		
});

//d3.select(self.frameElement).style("height", height + "px");
function update(source) {
	
	// Compute the new tree layout.
	var nodes = tree.nodes(root).reverse(),
	links = tree.links(nodes);
	
	// Normalize for fixed-depth.
	nodes.forEach(function(d) { d.y = d.depth * 180; });
	
	// Update the nodes…
	var node = svg.selectAll("g.node")
	.data(nodes, function(d) { return d.id || (d.id = ++i); });
	
	// Enter any new nodes at the parent's previous position.
	var nodeEnter = node.enter().append("g")
	.attr("class", "node")
	.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	.on("click", click);
	
	/*nodeEnter.append("circle")
	.attr("r", 1e-6)
	.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
	
	nodeEnter.append("text")
	.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
	.attr("dy", ".35em")
	.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	.text(function(d) { return d.name; })
	.style("fill-opacity", 1e-6);
	*/
	
	
	var rect = nodeEnter.append("rect")
	.style("stroke", function(d) { return colors[d.gp]; })
	.style("stroke-width", "1.5px");
	
	
	var text = nodeEnter.append("text")
	.attr("dy", ".31em")
	.attr("text-anchor", function(d) { return "middle"; })
	.attr("fill",function(d) { return colors[d.gp]; })
	.text(function(d) { return d.name; });
	
	rect.attr("x", function(d) {return this.parentNode.getBBox().x - 3;})
	.attr("y", function(d) {return this.parentNode.getBBox().y - 3;})
	.attr("width", function(d) {return this.parentNode.getBBox().width + 6;})
	.attr("height", function(d) {return this.parentNode.getBBox().height + 6;})
	
	
	
	
	
	
	// Transition nodes to their new position.
	var nodeUpdate = node.transition()
	.duration(duration)
	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
	
	nodeUpdate.select("rect")
	.style("fill", function(d) { return d._children ? "white" : colors[d.gp]; });
	
	nodeUpdate.select("text")
	.style("fill", function(d) { return d._children ? colors[d.gp] : "#FFF"; });
	
	
	// Transition exiting nodes to the parent's new position.
	var nodeExit = node.exit().transition()
	.duration(duration)
	.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	.remove();
	
	nodeExit.select("rect")
	.attr("stroke-opacity", 1e-6);
	
	nodeExit.select("text")
	.style("fill-opacity", 1e-6);// strange ~~~~~
	
	
	// Update the links…
	var link = svg.selectAll("path.link")
	.data(links, function(d) { return d.target.id; });
	
	// Enter any new links at the parent's previous position.
	link.enter().insert("path", "g")
	.attr("class", "link")
	.attr("stroke", function(d) { console.log(d); return colors[d.target.gp]; })
	.attr("d", function(d) {
			var o = {x: source.x0, y: source.y0};
			return diagonal({source: o, target: o});
	});
	
	// Transition links to their new position.
	link.transition()
	.duration(duration)
	.attr("d", diagonal);
	
	// Transition exiting nodes to the parent's new position.
	link.exit().transition()
	.duration(duration)
	.attr("d", function(d) {
			var o = {x: source.x, y: source.y};
			return diagonal({source: o, target: o});
	})
	.remove();
	
	// Stash the old positions for transition.
	nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
	});
}

// Toggle children on click.
function click(d) {
	if (d.children) {
		d._children = d.children;
		d.children = null;
	} else {
		d.children = d._children;
		d._children = null;
	}
	update(d);
}


function zoom() {
	svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}




function addGroupToData(data){

	var currDepth = 0;
	var currBranch = 0;
	function walkNodes(obj){
		console.log(obj.name+"    "+currDepth+"    "+currBranch);
		if(!Array.isArray(obj))
			obj.gp = currBranch;
		
		for (var key in obj)
		{
			if (typeof obj[key] == "object" && obj[key] !== null){
				
				currDepth++;
				if(currDepth == 2) currBranch++; // 2 car on compte les array dans currDepth
			
				walkNodes(obj[key]);
			}
		}
			currDepth--;
	}
	
	walkNodes(data);
	
	
}





