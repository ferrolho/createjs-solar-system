/**
* Creates a new Asteroid.
*
* radius - km
* orbitRadius - 10^6 km
* orbitalVelocity - km/s
*/
function Asteroid(radius, orbitRadius, orbitalVelocity) {
	Entity.apply(this, arguments);
}

Asteroid.prototype = new Entity();

