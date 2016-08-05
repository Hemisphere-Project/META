$(document).ready(function() {

		
/*********************************************************************/
/**************************** GLOBALS ********************************/
/*********************************************************************/


		
var nodeWidth = 300;
var nodeHeight = 30;
var width = (window.innerWidth-300),
height = window.innerHeight;

var initialScale = 2;
var screenCenter = {"x":width/2,"y":height/2};


var randBot;

var i = 0,
duration = 750, 
root;

var colors = ["black","#FEBC59","#E64047","#4AA6E7"];




/*********************************************************************/
/********************** COMPLETE PATH CLASS **************************/
/*********************************************************************/


var completePaths = [];
completePaths.maxLength = 3;

completePaths.addPath = function(d){
	completePaths.push(new MetaPath(d));	
}

completePaths.removePath = function(d){
	for(var k=0;k<completePaths.length;k++){
		if(completePaths[k].lastNode === d) return completePaths.splice(k,1);	
	}
}

completePaths.updateDisplay = function(){
	$(".selected-paths-section").empty();
	$(".paths-summary-container").empty();
	for(var k=0;k<completePaths.length;k++){
		$(".selected-paths-section").append("<div id='"+completePaths[k].lastNode.name+"' class='path' style='border-color:"+colors[completePaths[k].gp]+"'><div class='close-btn'></div><div class='axe'><span class='axe-prefix' style='color:"+colors[completePaths[k].gp]+"'>AXE: </span><span>"+completePaths[k].axe+"<span></div><div class='subcategory'><span class='category-prefix' style='color:"+colors[completePaths[k].gp]+"'>SUBCATEGORY: </span><span>"+completePaths[k].subcategory+"</span></div></div>");
		$(".paths-summary-container").append("<div id='"+completePaths[k].lastNode.name+"' class='path' style='border-color:"+colors[completePaths[k].gp]+"'><div class='axe'><span class='axe-prefix' style='color:"+colors[completePaths[k].gp]+"'>AXE: </span><span>"+completePaths[k].axe+"<span></div><div class='subcategory'><span class='category-prefix' style='color:"+colors[completePaths[k].gp]+"'>SUBCATEGORY: </span><span>"+completePaths[k].subcategory+"</span></div></div>");

	}
}


/*********************************************************************/
/**************************** D3JS TREE*******************************/
/*********************************************************************/



var tree = d3.layout.tree()
.nodeSize([nodeHeight,nodeWidth]);

var diagonal = d3.svg.diagonal()
.projection(function(d) { return [d.y, d.x]; });




/*********************************************************************/
/****************************** SVG **********************************/
/*********************************************************************/


var svg = d3.select(".planetary-agenda-container").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate("+screenCenter.x+","+screenCenter.y+")scale("+initialScale+")")


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
		
		svg.transition()
		.duration(duration)
		.attr("transform", function() { 
			return "translate("+svgCurrTranslate[0]+","+svgCurrTranslate[1]+")scale(" + svgCurrScale + ")"; 
		});
		
		zoom.translate([svgCurrTranslate[0], svgCurrTranslate[1]]);
		
	}
		
}


/*********************************************************************/
/**************************** ZOOM ***********************************/
/*********************************************************************/

var zoom = d3.behavior.zoom();
d3.select("svg").call(zoom.scaleExtent([1, 2]).on("zoom", onZoom));

zoom.scale(initialScale);
zoom.translate([width/2, height/2]);

function onZoom() {
	svgCurrTranslate = d3.event.translate;
	svgCurrScale = d3.event.scale;
	//zoom.center([d3.event.sourceEvent.clientX,d3.event.sourceEvent.clientY]);
	svg.attr("transform", "translate(" + svgCurrTranslate + ")scale(" + svgCurrScale + ")");
}

$( "svg" ).mousemove(function(event) {
  zoom.center([event.clientX,event.clientY]);
});


/*********************************************************************/
/**************************** JSON LOAD ******************************/
/*********************************************************************/


var templateUrl = location.protocol+'//'+location.host+location.pathname;		

d3.json(templateUrl+"/wp-content/uploads/planetaryagenda_cd.json", function(error, data) {
		if (error) throw error;
		
		
		root = data;
		root.x0 = 0;
		root.y0 = 0;
		
		addGroupParam(data);
				
		var nodes = tree.nodes(root),
		links = tree.links(nodes);
		
		addSelectedParam(nodes);
		
		

		 randBot = new RandomBot(root);
		
		
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
	.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; });
	//.on("click", click);
	
	 d3.selectAll(".node").on('click',click);
	
	
	
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

var nodeClickEnabled = true;
// Toggle children on click.
function click(d) {
	
	// disable mouse click during robot dance
	if(!nodeClickEnabled) return;
	
	// disable mouse click if completepath array is full ! A changer
	//if(completePaths.length >= completePaths.maxLength) return;
	if(!d.children && !d._children && completePaths.length >= completePaths.maxLength && !d.selected) return;
	
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
	completePaths.updateDisplay();
	updateButtonsStatus();
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



/*********************************************************************/
/**************************** UX *************************************/
/*********************************************************************/

function updateButtonsStatus(){
	if(completePaths.length >= completePaths.maxLength){
		$("#generate-btn").addClass("disabled");
		$("#validate-btn").removeClass("disabled");
	}else{
		$("#generate-btn").removeClass("disabled");
		$("#validate-btn").addClass("disabled");	
	}
	if(root._children){
		$("#reset-btn").addClass("disabled");
	}else{
		$("#reset-btn").removeClass("disabled");
	}
}


$(".step-next-button").on("click", function(event){
	console.log(".step-next-button");	
	$.fn.fullpage.moveTo("meta-workshop",2);
});

$("#generate-btn").on("click", function(event){
	console.log("#generate-btn");	
	randBot.start();
});

$("#reset-btn").on("click", function(event){
	console.log("#reset-btn");
	
	randBot.stop();
	
	unselectChildren(root);
	collapse(root);
	update(root);
	completePaths.updateDisplay();
	updateButtonsStatus();
	
	updateSVGPos(root);
	
		
});

$("#validate-btn").on("click", function(event){
	console.log("#validate-btn");	
	$.fn.fullpage.moveTo("meta-workshop",3);
});

$('body').on('click', '.path .close-btn', function(event) {
		console.log(event.currentTarget.parentNode.id);
		for(var k = 0; k<completePaths.length; k++)
			if(completePaths[k].lastNode.name === event.currentTarget.parentNode.id){
				completePaths[k].lastNode.selected = false;
				update(completePaths[k].lastNode);
				completePaths.splice(k,1); 
			}
			
		completePaths.updateDisplay();
		updateButtonsStatus();
});


var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}
if ((is_chrome)&&(is_opera)) {is_chrome=false;}
    
    
var PDFOutput = false;
if(is_safari) PDFOutput = true; // for the moment force pdf download for safari

$("#save-as-pdf-btn").on("click", function(event){
	console.log("#save-as-pdf-btn");	
        $("#save-as-pdf-btn").addClass("hidden");
        html2canvas($('#summary-slide'), {
        		onrendered: function(canvas) {
        			/*$('body').append("<img src='"+canvas.toDataURL("image/jpeg,1.0")+"' />");*/
        			if(!PDFOutput){
        					download(canvas.toDataURL("image/jpeg,1.0"),"summary.jpg","image/jpeg");		
        			}else{
        				var img =canvas.toDataURL();
        				var pdf = new jsPDF("landscape","mm",[$('#summary-slide').width(),$('#summary-slide').height()]);
        				pdf.addImage(img, 'JPEG', 0, 0, $('#summary-slide').width(),$('#summary-slide').height());
        				pdf.save('summary.pdf');
        			}
        			$("#save-as-pdf-btn").removeClass("hidden");
        		},
        		background:"#000",
        });
});


/*********************************************************************/
/**************************** RandomBot CLASS ************************/
/*********************************************************************/

function RandomBot(){
	this.maxSelectedPath = 3;
	this.intervalHandler = null;
	this.selectionPeriod = 1000;
	this.isRunning = false;
	
	this.currentSelection = null;
}

RandomBot.prototype.start = function(){
	
	if(this.isRunning) return;
	
	this.isRunning = true;
	// diable node click
	nodeClickEnabled = false;
	
	
	
	if(completePaths.length < completePaths.maxLength)
		this.randomSelect();
	else
		self.stop();
	
	var self = this;
	this.intervalHandler = setInterval(function(){
		if(completePaths.length < completePaths.maxLength)
			self.randomSelect();
		else
			self.stop();
	},this.selectionPeriod);	
}

RandomBot.prototype.stop = function(){
	clearInterval(this.intervalHandler);
	
	this.currentSelection = null;
	
	//enable node click
	nodeClickEnabled = true;
	
	updateButtonsStatus();
	
	this.isRunning = false;
}

RandomBot.prototype.randomSelect = function(){
	console.log("random selection");
	
	var self = this;
	function selectNext(node){
		if(node.selected && node.children){// est selectionné et a des enfants
			selectNext(node.children[Math.floor(Math.random()*node.children.length)]);
		}else if(node.selected && !node.children){ // est selectionné et n'as pas d'enfant
			selectNext(root);
		}else{
			self.selectNode(node);	
		}
		
	}
	
	if(!this.currentSelection){
		selectNext(root)
	}else{
		selectNext(this.currentSelection);	
	}
	update(this.currentSelection);
	
}

RandomBot.prototype.selectNode = function(d){
	this.currentSelection = d;

	updateSVGPos(d);
	
	updateButtonsStatus();
	
	
	// push pop paths
	if(!d.children && !d._children){
		if(d.selected){
			completePaths.removePath(d);
		}else{
			completePaths.addPath(d);
		}
		completePaths.updateDisplay();
	}
	
	
	d.selected = true;
	if(d._children){
		d.children = d._children;
		d._children = null;
	}
	
}




});


