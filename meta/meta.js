var nodeWidth = 100;
var nodeHeight = 30;
var width = window.innerWidth*0.9,
height = window.innerHeight*0.9;
var initialScale = 1;
var screenCenter = {"x":width/2,"y":height/2};


var i = 0,
duration = 750, 
root;

var colors = ["black","#FEBC59","#E64047","#4AA6E7"];

/* PATH LIST */

var completePaths = [];
completePaths.addPath = function(d){
	completePaths.push(new MetaPath(d));	
}
completePaths.removePath = function(d){
	for(var k=0;k<completePaths.length;k++){
		if(completePaths[k].lastNode === d) return completePaths.splice(k,1);	
	}
}

/* */


var tree = d3.layout.tree()
//.size([height, width ]);
.nodeSize([nodeHeight,nodeWidth]);

var diagonal = d3.svg.diagonal()
.projection(function(d) { return [d.y, d.x]; });

function elbow(d, i) {
	return "M" + d.source.y + "," + d.source.x
	+ "V" + d.target.x + "H" + d.target.y;
}


/* SVG */

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
//.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
.append("g")
.attr("transform", "translate("+screenCenter.x+","+screenCenter.y+")scale("+initialScale+")")


d3.select("svg").on("click", function() {
		/*var coords = d3.mouse(this);
		console.log(coords);
		//if(d3.event.target.nodeName != "svg"){
			var targetX = 2*screenCenter.x - coords[0],
				targetY = 2*screenCenter.y - coords[1];
				console.log(coords+"  "+targetX+"  "+targetY);
				svg.attr("transform", "translate("+targetX+","+targetY+")scale(" + svgCurrScale + ")");
				//svgCurrTranslate = [targetX,targetY];
				//zoom.translate(svgCurrTranslate);
		//}*/
		
 });


var svgCurrTranslate = [width/2,height/2];
var svgCurrTranslateOffset = [0,0];
var svgCurrScale = initialScale;


function updateSVGPos(node){
	
	if(!node.children && !node._children)
		return;//si terminaison on se casse
	
	
	if(svgCurrTranslateOffset[0] != node.x || svgCurrTranslateOffset[1] != node.y ){
		
		svgCurrTranslateOffset[0] = node.y*svgCurrScale;
		svgCurrTranslateOffset[1] = node.x*svgCurrScale;
		svgCurrTranslate[0] = screenCenter.x - svgCurrTranslateOffset[0];
		svgCurrTranslate[1] = screenCenter.y - svgCurrTranslateOffset[1];
		
		//svg.attr("transform", "translate("+svgCurrTranslate[0]+","+svgCurrTranslate[1]+")scale(" + svgCurrScale + ")");
		
		svg.transition()
		.duration(duration)
		.attr("transform", function() { 
			return "translate("+svgCurrTranslate[0]+","+svgCurrTranslate[1]+")scale(" + svgCurrScale + ")"; 
		});
		
		zoom.translate([svgCurrTranslate[0], svgCurrTranslate[1]]);
		
	}
		
}

/* ZOOM */

var zoom = d3.behavior.zoom();
d3.select("svg").call(zoom.scaleExtent([1, 2]).on("zoom", onZoom));

zoom.scale(initialScale);
zoom.translate([width/2, height/2]);

function onZoom() {
	//console.log(d3.event.translate);
	svgCurrTranslate = d3.event.translate;
	svgCurrScale = d3.event.scale;
	svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function onMouseClick(d,i){
	var mousePos = d3.mouse(svg);
	//console.log(mousePos);	
	//svg.attr("transform", "translate(" + mousePos[0] +","+mousePos[1] + ")scale(" + zoom.scale() + ")");
	
}



d3.json("planetaryagenda_cd.json", function(error, data) {
		if (error) throw error;
		
		
		root = data;
		root.x0 = 0;
		root.y0 = 0;
		
		addGroupParam(data);
				
		var nodes = tree.nodes(root),
		links = tree.links(nodes);
		
		addSelectedParam(nodes);
		
		

		
		//root.children.forEach(collapse);
		collapse(root);
		update(root);
		
});


function update(source) {
	
	// Compute the new tree layout.
	var nodes = tree.nodes(root).reverse(),
	links = tree.links(nodes);
	
	// Normalize for fixed-depth.
	nodes.forEach(function(d) { d.y = d.depth * 150; });
	
	// Update the nodes…
	var node = svg.selectAll("g.node")
	.data(nodes, function(d) { return d.id || (d.id = ++i); });
	
	// Enter any new nodes at the parent's previous position.
	var nodeEnter = node.enter().append("g")
	.attr("class", "node")
	.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	.on("click", click);
	
	
	
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
	.attr("transform", function(d) { 
		return "translate(" + d.y + "," + d.x + ")"; 
	});
	
	//si on vient de cliquer le noeud ou si c'est une terminaison, on le selectionne
	nodeUpdate.select("rect")
	.style("fill", function(d) { 
		//return d._children ? "white" : colors[d.gp]; 
		return d.selected ? colors[d.gp] : "white";
	});
	
	nodeUpdate.select("text")
	.style("fill", function(d) { 
		//return d._children ? colors[d.gp] : "#FFF"; 
		return d.selected ? "white" : colors[d.gp];
	});
	
	
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
	.attr("stroke", function(d) { return colors[d.target.gp]; })
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
	 //var coords = d3.mouse(this);
	/*svgCurrTranslate[0]+=d.x;
	svgCurrTranslate[1]+=d.y;
	svg.attr("transform", "translate(" + svgCurrTranslate + ")scale(" + svgCurrScale + ")");
	*/
	updateSVGPos(d);
	// push pop paths
	if(!d.children && !d._children){
		if(d.selected){
			completePaths.removePath(d);
		}else{
			completePaths.addPath(d);
		}
	}
	
	//console.log(completePaths);
	// select / unselect nodes
	d.selected = !d.selected;
	if(!d.selected) unselectChildren(d);
	
	// fold / unfold branches
	if (d.children) {
		//d._children = d.children;
		//d.children = null;
		collapse(d);
	} else {
		d.children = d._children;
		d._children = null;
	}
	update(d);
}




function collapse(d) {
	if (d.children) {
		d._children = d.children;
		d._children.forEach(collapse);
		d.children = null;
	}
}


function addGroupParam(data){

	var currDepth = 0;
	var currBranch = 0;
	function walkNodes(obj){
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

function addSelectedParam(nodes){
	nodes.forEach(function(d) { d.selected = false });
}

function unselectChildren(d){
	
	if(!d.children && !d._children && d.selected) completePaths.removePath(d);
	
	d.selected = false;
	if (d.children) {
		d.children.forEach(unselectChildren);
	}	
}



