function MetaPath(lastNode,root){
	this.gp = lastNode.gp;
	this.axe = this.getAxe(lastNode.gp,root);
	this.subcategory = "Cheese and biscuits bocconcini port-salut dsd sdgyzer Cheese and biscuits";
	this.nodes = [];
	this.lastNode = lastNode;	
	
	//this.extractNodes(this.lastNode);
}

// buggy
MetaPath.prototype.extractNodes = function(d){
	
	function walkParents(obj){
		
		for (var key in obj)
		{
			if (typeof obj[key] == "object" && obj[key] !== null && key === "parent"){
				
				this.nodes.push(obj[key]);
			
				walkParents(obj[key]);
			}
		}
	}
	
	walkParents(d);
}


MetaPath.prototype.getAxe = function(gp,root){
	return root.children[gp-1].name;	
}




