const planetRadiusMultiplier = 1000.0;

function Planet(radius, distanceFromSun, orbitalVelocity) {
	this.radius = radius;

	this.distanceFromSun = distanceFromSun;

	this.angle = 0;
	this.orbitalVelocity = -orbitalVelocity;

	// graphical stuff
	this.orbit = new createjs.Shape();
	stage.addChild(this.orbit);

	this.shape = new createjs.Shape();
	stage.addChild(this.shape);
}

Planet.prototype.update = function() {
	this.shape.x = Math.cos(this.angle) * this.distanceFromSun * zoom;
	this.shape.y = Math.sin(this.angle) * this.distanceFromSun * zoom;

	this.orbit.graphics.clear();
	this.shape.graphics.clear();

	this.orbit.graphics.beginStroke('rgb(210, 210, 210)').drawCircle(canvas.width / 2, canvas.height / 2, this.distanceFromSun * zoom);

	var realRadius = this.radius * zoom * planetRadiusMultiplier;

	if (realRadius > 0)
		this.shape.graphics.beginFill('black').drawCircle(canvas.width / 2, canvas.height / 2, realRadius);
}

Planet.prototype.setAngle = function(delta) {
	this.angle = (this.angle + 0.00002 * delta * this.orbitalVelocity) % 360;

	this.update();
}

var planets = [];

function createPlanets() {
	var mercury = new Planet(2439.7, 57.9 * tenToThe6, 47.4); planets.push(mercury);
	var venus = new Planet(6051.8, 108.2 * tenToThe6, 35.0); planets.push(venus);
	var earth = new Planet(6371.0, 149.6 * tenToThe6, 29.78); planets.push(earth);
	var mars = new Planet(3389.5, 227.9 * tenToThe6, 24.1); planets.push(mars);
	var jupiter = new Planet(69911.0, 778.6 * tenToThe6, 13.1); planets.push(jupiter);
	var saturn = new Planet(58232.0, 1433.5 * tenToThe6, 9.7); planets.push(saturn);
	var uranus = new Planet(25362.0, 2872.5 * tenToThe6, 6.8); planets.push(uranus);
	var neptune = new Planet(24622.0, 4495.1 * tenToThe6, 5.4); planets.push(neptune);
	var pluto = new Planet(1186.0, 5906.3 * tenToThe6, 4.67); planets.push(pluto);
}

function updatePlanets() {
	for (var i = 0; i < planets.length; i++)
		planets[i].update();
}

function updatePlanetsAngle(delta) {
	for (var i = 0; i < planets.length; i++)
		planets[i].setAngle(delta);
}
