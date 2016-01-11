/**
* radius km
* orbitRadius 10^6 km
* orbitalVelocity km/s
*/
function Moon(planet, radius, orbitRadius, orbitalVelocity, showOrbit) {
	this.planet = planet;
	this.radius = radius;
	this.orbitRadius = orbitRadius;
	this.orbitalVelocity = -orbitalVelocity;
	this.showOrbit = showOrbit;

	this.angle = randomBetween(0, 360);

	// graphical stuff
	if (this.showOrbit) {
		this.orbit = new createjs.Shape();
		stage.addChild(this.orbit);
	}

	this.shape = new createjs.Shape();
	stage.addChild(this.shape);
}

Moon.prototype.update = function() {
	// orbit
	if (this.showOrbit) {
		this.orbit.graphics.clear();
		this.orbit.graphics.beginStroke('rgb(210, 210, 210)').drawCircle(canvas.width / 2, canvas.height / 2, this.orbitRadius * zoom);
		this.orbit.x = this.planet.shape.x;
		this.orbit.y = this.planet.shape.y;
	}

	// circle
	this.shape.graphics.clear();

	var virtualRadius = this.radius * zoom * planetRadiusMultiplier;
	if (virtualRadius > 0)
		this.shape.graphics.beginFill('black').drawCircle(canvas.width / 2, canvas.height / 2, virtualRadius);

	this.shape.x = this.orbit.x + Math.cos(this.angle) * this.orbitRadius * zoom;
	this.shape.y = this.orbit.y + Math.sin(this.angle) * this.orbitRadius * zoom;
}

Moon.prototype.setAngle = function(delta) {
	this.angle = (this.angle + timeMultiplier * delta * this.orbitRadius * this.orbitalVelocity) % 360;
	this.update();
}
