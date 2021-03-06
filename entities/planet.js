const planetRadiusMultiplier = 1000.0;

/**
* radius km
* orbitRadius 10^6 km
* orbitalVelocity km/s
*/
function Planet(radius, orbitRadius, orbitalVelocity, showOrbit) {
	this.radius = radius;
	this.orbitRadius = orbitRadius;
	this.orbitalVelocity = -orbitalVelocity;

	this.angle = randomBetween(0, 360);

	this.moons = [];

	// graphical stuff
	if (solarSystem.showPlanetaryOrbits) {
		this.orbit = new createjs.Shape();
		stage.addChild(this.orbit);
	}

	this.shape = new createjs.Shape();
	stage.addChild(this.shape);
}

Planet.prototype.addMoon = function(radius, orbitRadius, orbitalVelocity, showOrbit) {
	var moon = new Moon(this, radius, orbitRadius, orbitalVelocity, showOrbit); this.moons.push(moon);
}

Planet.prototype.update = function(forceTotalUpdate) {
	// when user zooms in/out
	if (forceTotalUpdate) {
		// orbit
		this.orbit.graphics.clear();
		if (solarSystem.showPlanetaryOrbits)
			this.orbit.graphics.beginStroke('rgb(210, 210, 210)').drawCircle(canvas.width / 2, canvas.height / 2, this.orbitRadius * zoom);

		// circle
		this.shape.graphics.clear();

		var virtualRadius = this.radius * zoom * planetRadiusMultiplier;
		if (virtualRadius > 0)
			this.shape.graphics.beginFill('black').drawCircle(canvas.width / 2, canvas.height / 2, virtualRadius);

		this.lastZoomUsed = zoom;
	}

	this.shape.x = Math.cos(this.angle) * this.orbitRadius * zoom;
	this.shape.y = Math.sin(this.angle) * this.orbitRadius * zoom;
}

Planet.prototype.setAngle = function(delta) {
	this.angle = (this.angle + timeMultiplier * delta * this.orbitalVelocity) % 360;
	this.update();

	for (var i = 0; i < this.moons.length; i++)
		this.moons[i].setAngle(delta);
}

function createPlanets() {
	// planets
	var mercury = new Planet(2439.7, 57.9 * tenToThe6, 47.4, true); solarSystem.planets.push(mercury);
	var venus = new Planet(6051.8, 108.2 * tenToThe6, 35.0, true); solarSystem.planets.push(venus);
	var earth = new Planet(6371.0, 149.6 * tenToThe6, 29.78, true); solarSystem.planets.push(earth);
	var mars = new Planet(3389.5, 227.9 * tenToThe6, 24.1, true); solarSystem.planets.push(mars);
	var jupiter = new Planet(69911.0, 778.6 * tenToThe6, 13.1, true); solarSystem.planets.push(jupiter);
	var saturn = new Planet(58232.0, 1433.5 * tenToThe6, 9.7, true); solarSystem.planets.push(saturn);
	var uranus = new Planet(25362.0, 2872.5 * tenToThe6, 6.8, true); solarSystem.planets.push(uranus);
	var neptune = new Planet(24622.0, 4495.1 * tenToThe6, 5.4, true); solarSystem.planets.push(neptune);
	var pluto = new Planet(1186.0, 5906.3 * tenToThe6, 4.67, true); solarSystem.planets.push(pluto);

	// moons
	earth.addMoon(1737.1, 0.3844 * tenToThe6, 1.022, true);
}

function updatePlanets() {
	for (var i = 0; i < solarSystem.planets.length; i++)
		solarSystem.planets[i].update(true);

	for (var i = 0; i < asteroidsBelt.length; i++)
		asteroidsBelt[i].update(true);
}

function updatePlanetsAngle(delta) {
	for (var i = 0; i < solarSystem.planets.length; i++)
		solarSystem.planets[i].setAngle(delta);

	for (var i = 0; i < asteroidsBelt.length; i++)
		asteroidsBelt[i].setAngle(delta);
}
