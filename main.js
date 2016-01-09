const tenToThe6 = 1000000;
const timeMultiplier = 0.000005;

include('scene.js', 'planet.js', 'moon.js', function() {
	main();
});

var canvas;
var stage;

function main() {
	// resize event listener
	window.addEventListener('resize', resize, false);

	// create a new stage and point it at our canvas:
	canvas = document.getElementById('canvas');
	stage = new createjs.Stage(canvas);

	addMouseWheelListener();

	createSceneElements();
	
	resize();

	// Ticker
	createjs.Ticker.setFPS(120);
	createjs.Ticker.addEventListener('tick', tick);
}

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function addMouseWheelListener() {
	if (canvas.addEventListener) {
		// IE9, Chrome, Safari, Opera
		canvas.addEventListener("mousewheel", MouseWheelHandler, false);

		// Firefox
		canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	} else {
		// IE 6/7/8
		canvas.attachEvent("onmousewheel", MouseWheelHandler);
	}
}

const sensibility = 0.08;

var virtualZoom = 1.0;
var zoom = virtualZoom / tenToThe6;

function MouseWheelHandler(e) {
	// cross-browser wheel delta
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	virtualZoom += sensibility * virtualZoom * delta;

	if (virtualZoom > 10)
		virtualZoom = 10;
	else if (virtualZoom < 0.05)
		virtualZoom = 0.05;

	zoom = virtualZoom / tenToThe6;

	// add funcs callbacks here
	updatePlanets();

	return false;
}

function tick(event) {
	updateFPS();

	//console.log('total time: ' + createjs.Ticker.getTime());
	updatePlanetsAngle(event.delta);

	// draw the updates to stage:
	stage.update(event);
}

function resize() { 
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	updateSceneElements();
}
