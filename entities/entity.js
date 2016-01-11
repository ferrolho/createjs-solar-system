/**
* Creates a new Entity.
*
* radius - km
* orbitRadius - 10^6 km
* orbitalVelocity - km/s
*/
function Entity(radius, orbitRadius, orbitalVelocity) {
	this.radius = radius;
	this.orbitRadius = orbitRadius;
	this.orbitalVelocity = -orbitalVelocity;

	this.angle = randomBetween(0, 360);

	// graphical stuff
	this.shape = new createjs.Shape();
	stage.addChild(this.shape);
}

Entity.prototype.update = function(forceTotalUpdate) {
	// when user zooms in/out
	if (forceTotalUpdate) {
		// orbit
		if (this.showOrbit) {
			this.orbit.graphics.clear();

			if (solarSystem.showPlanetaryOrbits)
				this.orbit.graphics.beginStroke('rgb(210, 210, 210)').drawCircle(canvas.width / 2, canvas.height / 2, this.orbitRadius * zoom);
		}

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

Entity.prototype.setAngle = function(delta) {
	this.angle = (this.angle + timeMultiplier * delta * this.orbitalVelocity) % 360;
	this.update();
}
