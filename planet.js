const planetRadiusMultiplier = 1000.0;

/**
* radius km
* distanceFromSun 10^6 km
* orbitalVelocity km/s
*/
function Planet(radius, distanceFromSun, orbitalVelocity, showOrbit) {
	this.radius = radius;

	this.distanceFromSun = distanceFromSun;

	this.angle = randomBetween(0, 360);
	this.orbitalVelocity = -orbitalVelocity;

	this.showOrbit = showOrbit;

	// graphical stuff
	if (this.showOrbit) {
		this.orbit = new createjs.Shape();
		stage.addChild(this.orbit);
	}

	this.shape = new createjs.Shape();
	stage.addChild(this.shape);
}

Planet.prototype.update = function(forceTotalUpdate) {
	// when user zooms in/out
	if (forceTotalUpdate) {
		// orbit
		if (this.showOrbit) {
			this.orbit.graphics.clear();
			this.orbit.graphics.beginStroke('rgb(210, 210, 210)').drawCircle(canvas.width / 2, canvas.height / 2, this.distanceFromSun * zoom);
		}

		// circle
		this.shape.graphics.clear();

		var virtualRadius = this.radius * zoom * planetRadiusMultiplier;
		if (virtualRadius > 0)
			this.shape.graphics.beginFill('black').drawCircle(canvas.width / 2, canvas.height / 2, virtualRadius);

		this.lastZoomUsed = zoom;
	}

	this.shape.x = Math.cos(this.angle) * this.distanceFromSun * zoom;
	this.shape.y = Math.sin(this.angle) * this.distanceFromSun * zoom;
}

const timeMultiplier = 0.000005;

Planet.prototype.setAngle = function(delta) {
	this.angle = (this.angle + timeMultiplier * delta * this.orbitalVelocity) % 360;

	this.update();
}

var planets = [];

const minBeltDistanceFromSun = 329.1 * 1000000;
const maxBeltDistanceFromSun = 478.7 * 1000000;
var asteroidsBelt = [];

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function createPlanets() {
	// planets
	var mercury = new Planet(2439.7, 57.9 * tenToThe6, 47.4, true); planets.push(mercury);
	var venus = new Planet(6051.8, 108.2 * tenToThe6, 35.0, true); planets.push(venus);
	var earth = new Planet(6371.0, 149.6 * tenToThe6, 29.78, true); planets.push(earth);
	var mars = new Planet(3389.5, 227.9 * tenToThe6, 24.1, true); planets.push(mars);
	var jupiter = new Planet(69911.0, 778.6 * tenToThe6, 13.1, true); planets.push(jupiter);
	var saturn = new Planet(58232.0, 1433.5 * tenToThe6, 9.7, true); planets.push(saturn);
	var uranus = new Planet(25362.0, 2872.5 * tenToThe6, 6.8, true); planets.push(uranus);
	var neptune = new Planet(24622.0, 4495.1 * tenToThe6, 5.4, true); planets.push(neptune);
	var pluto = new Planet(1186.0, 5906.3 * tenToThe6, 4.67, true); planets.push(pluto);

	// asteroids - main belt
	var beltCenter = (minBeltDistanceFromSun + maxBeltDistanceFromSun) / 2.0;
	var maxDeviation = maxBeltDistanceFromSun - beltCenter;

	for (var i = 0; i < 1500; i++) {
		var randomX = randomBetween(-1, 1);
		var fx = (randomX > 0 ? 1 : -1) * randomX * randomX;

		var distanceFromSun = beltCenter + fx * maxDeviation;

		var radius = randomBetween(200, 600);
		var orbitalVelocity = randomBetween(4, 30);

		var asteroid = new Planet(radius, distanceFromSun, orbitalVelocity);

		asteroidsBelt.push(asteroid);
	};
}

function updatePlanets() {
	for (var i = 0; i < planets.length; i++)
		planets[i].update(true);

	for (var i = 0; i < asteroidsBelt.length; i++)
		asteroidsBelt[i].update(true);
}

function updatePlanetsAngle(delta) {
	for (var i = 0; i < planets.length; i++)
		planets[i].setAngle(delta);

	for (var i = 0; i < asteroidsBelt.length; i++)
		asteroidsBelt[i].setAngle(delta);
}
