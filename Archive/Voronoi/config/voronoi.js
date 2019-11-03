jQuery.noConflict();

VoronoiApp = function() {
	this.width = 600;
	this.height = 400;
	this.bbox = {
		xl : 0, xr : this.width,
		yt : 0, yb : this.height
	};
	this.vertices = [];
	this.voronoi = new Voronoi();
	this.displayVoronoi = true;
};

VoronoiApp.prototype.start = function(canvasId) {
	var me = this;

	var canvas = document.getElementById(canvasId);
	canvas.width = this.width;
	canvas.height = this.height;
	paper.setup(canvas);

	var tool = new paper.Tool();
	tool.onMouseUp = function(event) {
		me.addPoint(event.point);
	}

	jQuery("#erase").click(function() {
		me.vertices = [];
		me.render();
	});

	jQuery("#radio-voronoi").click(function() {
		me.displayVoronoi = true;
		me.render();
	});

	jQuery("#radio-delaunay").click(function() {
		me.displayVoronoi = false;
		me.render();
	});

	jQuery("#circles").mouseover(function() {
		me.render('circle');
	});

	jQuery("#delaunay-edges").mouseover(function() {
		me.render('delaunay');
	});

	jQuery("#voronoi-edges").mouseover(function() {
		me.render('voronoi');
	});

	jQuery("#delaunay-edges").mouseout(function() {
		me.render();
	});

	jQuery("#voronoi-edges").mouseout(function() {
		me.render();
	});

	jQuery("#circles").mouseout(function() {
		me.render();
	});

	this.render();

};

VoronoiApp.prototype.toggleDiagram = function() {
	this.displayVoronoi = !this.displayVoronoi;
	this.render();
};

VoronoiApp.prototype.addPoint = function(point) {
	this.vertices.push(point);
	this.render();
};

VoronoiApp.prototype.render = function(highlight) {
	var diagram = this.voronoi.compute(this.vertices, this.bbox);
	var oppositColor;

	paper.project.activeLayer.removeChildren();

	var background = new paper.Rectangle(0, 0, this.width, this.height);
	var bg = new paper.Path.Rectangle(background);

	if (this.displayVoronoi && highlight !== 'voronoi') {
		this.renderVoronoi(diagram);
		this.renderPoint();		
	} else if (!this.displayVoronoi) {
		this.renderDelaunay(diagram);
	}

	if (this.displayVoronoi) {
		oppositColor = 'green';
		bg.fillColor = 'red';
	} else {
		oppositColor = 'red';
		bg.fillColor = 'green';
	}

	if (highlight === 'delaunay') {
		this.renderDelaunay(diagram, oppositColor);
	}
	if (highlight === 'voronoi') {
		this.renderVoronoi(diagram, oppositColor);
		this.renderPoint(oppositColor);		
	}
	if (highlight === 'circle') {
		this.renderCircle(diagram, oppositColor);
	}

	paper.view.draw();
};

VoronoiApp.prototype.renderVoronoi = function(diagram, color) {
	if (diagram) {
		for (var i = 0; i < diagram.edges.length; i++) {
			var edges =  diagram.edges[i];
			var path = new paper.Path();
			path.strokeColor = 'black';
			if (color) {
				path.strokeColor = color;
			}

			if (edges.lSite && edges.rSite) {
				path.add(edges.va);
				path.add(edges.vb);
			}
		}
	}
};

VoronoiApp.prototype.renderCircle = function(diagram, color) {
	if (diagram) {
		for (var i = 0; i < diagram.edges.length; i++) {
			var edges =  diagram.edges[i];
			var center = new paper.Point(edges.va);
			var outter = new paper.Point(edges.lSite);

			if (center.x <= 1 || center.y <= 1 || center.x >= this.width - 1 || center.y >= this.height - 1) {
				continue;
			}

			var path = new paper.Path.Circle(center, center.getDistance(outter));
			path.strokeColor = 'blue';
			if (color) {
				path.strokeColor = color;
			}
		}
	}
};

VoronoiApp.prototype.renderDelaunay = function(diagram, color) {
	if (diagram) {
		for (var i = 0; i < diagram.edges.length; i++) {
			var edges =  diagram.edges[i];
			var path = new paper.Path();
			path.strokeColor = 'black';
			if (color) {
				path.strokeColor = color
			}

			if (edges.lSite && edges.rSite) {
				path.add(edges.lSite);
				path.add(edges.rSite);
			}
		}
	}
};

VoronoiApp.prototype.renderPoint = function(color) {
	for (var i = 0; i < this.vertices.length; i++) {
		var path = new paper.Path.Circle(this.vertices[i], 2);
		path.strokeColor = 'black';
		path.fillColor = 'black';
		if (color) {
			path.strokeColor = color;
			path.fillColor = color;
		}
	}
};
