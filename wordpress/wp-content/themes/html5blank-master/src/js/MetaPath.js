
function MetaPath(lastNode){
	this.gp = lastNode.gp;
	this.axe = "";//this.getAxe(lastNode.gp,root);
	this.subcategory = "";
	this.nodes = [];
	this.lastNode = lastNode;	
	
	this.extractNodes(this.lastNode);
	
	this.axe = this.nodes[this.nodes.length-2].name;
	this.subcategory = this.nodes[this.nodes.length-3].name;
}

MetaPath.prototype.extractNodes = function(d){
	var self = this;
	function walkParents(obj){
				
		self.nodes.push(obj);
		if(obj.parent)
			walkParents(obj.parent);
	}
	
	walkParents(d);
}






