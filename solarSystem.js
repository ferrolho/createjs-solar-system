function SolarSystem() {
	this.initDatGuiElements();

	this.planets = [];
}

/**
* Initializes the dat.GUI elements.
*/
SolarSystem.prototype.initDatGuiElements = function() {
	this.showPlanetaryOrbits = true;

	this.showAsteroidsMainBelt = true;

	this.speed = 0.8;
}

SolarSystem.prototype.togglePlanetaryOrbits = function() {
	console.log('togglePlanetaryOrbits: ' + this.showPlanetaryOrbits)
}
