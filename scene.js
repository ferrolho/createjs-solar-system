var bg, titleLabel, descriptionLabel, fpsLabel;

var asteroidsBelt = [];

function createSceneElements() {
	//createBackground();
	createPlanets();
	createTitle();
	createDescription();
	createFPS();
}

function updateSceneElements() {
	//updateBackground();
	updatePlanets();
}

function createBackground() {
	bg = new createjs.Shape();
	stage.addChild(bg);
}

function updateBackground() {
	bg.graphics.beginLinearGradientFill(['#fff', '#eee'], [0, 1], 0, 0, 0, canvas.height).drawRect(0, 0, canvas.width, canvas.height);
}

function createTitle() {
	titleLabel = new createjs.Text('SOLAR SYSTEM TO SCALE', 'bold 22px Playfair Display', '#000');
	titleLabel.x = 10;
	titleLabel.y = 10;
	stage.addChild(titleLabel);
}

function createDescription() {
	var description = 'This is a representation of our Solar System.\n';
	description += 'Planet\'s radius are multiplied by ' + planetRadiusMultiplier + '\n';
	description += 'for visualization purposes.\n';
	description += '\n';
	description += 'Use the mouse scroll wheel\n';
	description += 'to zoom in/out.\n';

	descriptionLabel = new createjs.Text(description, '18px Playfair Display', '#000');
	descriptionLabel.x = 10;
	descriptionLabel.y = 42;

	stage.addChild(descriptionLabel);
}

function createFPS() {
	var text = 'fps:\n';
	text += 'zoom: ' + (zoom * tenToThe6).toFixed(2);

	fpsLabel = new createjs.Text(text, '18px Playfair Display', '#000');

	fpsLabel.x = 10;
	fpsLabel.y = 174;

	stage.addChild(fpsLabel);
}

function updateFPS() {
	var text = 'fps: ' + Math.round(createjs.Ticker.getMeasuredFPS()) + '\n';
	text += 'zoom: ' + (zoom * tenToThe6).toFixed(2);

	fpsLabel.text = text;
}
