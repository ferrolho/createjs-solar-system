/**
* Creates a representation of the Solar System.
*/
function SolarSystem() {
	this.initDatGuiElements();

	this.planets = [];

	this.addAsteroids();
}

/**
* Initializes the dat.GUI elements.
*/
SolarSystem.prototype.initDatGuiElements = function() {
	this.showPlanetaryOrbits = true;

	this.showAsteroidsMainBelt = true;

	this.speed = 0.8;
}

SolarSystem.prototype.toggleAsteroidsMainBelt = function() {
	for (var i = 0; i < asteroidsBelt.length; i++) {
		if (this.showAsteroidsMainBelt)
			stage.addChild(asteroidsBelt[i].shape);
		else
			stage.removeChild(asteroidsBelt[i].shape);
	}
}

/**
* Listens to this.showPlanetaryOrbits changes.
*/
SolarSystem.prototype.togglePlanetaryOrbits = function() {
	updatePlanets();
}

const minBeltDistanceFromSun = 329.1 * tenToThe6;
const maxBeltDistanceFromSun = 478.7 * tenToThe6;

SolarSystem.prototype.addAsteroids = function() {
	// asteroids - main belt
	var beltCenter = (minBeltDistanceFromSun + maxBeltDistanceFromSun) / 2.0;
	var maxDeviation = maxBeltDistanceFromSun - beltCenter;

	for (var i = 0; i < 1500; i++) {
		var randomX = randomBetween(-1, 1);
		var fx = (randomX > 0 ? 1 : -1) * randomX * randomX;

		var distanceFromSun = beltCenter + fx * maxDeviation;

		var radius = randomBetween(200, 400);
		var orbitalVelocity = randomBetween(4, 30);

		var asteroid = new Asteroid(radius, distanceFromSun, orbitalVelocity);

		asteroidsBelt.push(asteroid);
	}
}
