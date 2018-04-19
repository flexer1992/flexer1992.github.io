
var GameApp = GameApp || {};
GameApp.USE_DEVICE_PIXEL_RATIO = true; // here you can change to use or not the device pixel ratio - it is not supported by all browsers

if (GameApp.USE_DEVICE_PIXEL_RATIO) {
    GameApp.DEVICE_PIXEL_RATIO = window.devicePixelRatio;
    GameApp.CANVAS_WIDTH = window.innerWidth * GameApp.DEVICE_PIXEL_RATIO;
    GameApp.CANVAS_HEIGHT = window.innerHeight * GameApp.DEVICE_PIXEL_RATIO;
} else {
    GameApp.DEVICE_PIXEL_RATIO = 1.0;
    GameApp.CANVAS_WIDTH = window.innerWidth * GameApp.DEVICE_PIXEL_RATIO;
    GameApp.CANVAS_HEIGHT = window.innerHeight * GameApp.DEVICE_PIXEL_RATIO;
}

GameApp.ASPECT_RATIO = GameApp.CANVAS_WIDTH / GameApp.CANVAS_HEIGHT;
GameApp.ASPECT_RATIO_ROUND = Math.round(GameApp.ASPECT_RATIO);

if (GameApp.ASPECT_RATIO > 1) {
    GameApp.SCALE_RATIO = GameApp.CANVAS_HEIGHT / GameApp.CANVAS_WIDTH;
} else {
    // GameApp.SCALE_RATIO = GameApp.CANVAS_WIDTH/ GameApp.CANVAS_HEIGHT;
    GameApp.SCALE_RATIO = GameApp.CANVAS_WIDTH/ GameApp.CANVAS_WIDTH;
}


// GameApp.SCALE_RATIO = window.devicePixelRatio / 3;
GameApp.NEW_SCALE_RATION = window.devicePixelRatio / 3;
GameApp.SCALE_RATIO1 = GameApp.CANVAS_HEIGHT / GameApp.CANVAS_WIDTH;


console.log("maybe aspect => " + GameApp.NEW_SCALE_RATION);
console.log("test calculate => " + GameApp.CANVAS_HEIGHT / GameApp.CANVAS_WIDTH);

var game = new Phaser.Game(GameApp.CANVAS_WIDTH, GameApp.CANVAS_HEIGHT, Phaser.AUTO, 'game');


//  Add the States your game has.
//  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
game.state.add('Game', BasicGame.Game);
game.state.add('MainMenu', BasicGame.MainMenu);
game.state.add('Preload', BasicGame.Preloader);
game.state.add('Boot', BasicGame.Boot);


game.state.start('Boot');



LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame){
Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
this.style = {'font': '10px Arial', 'fill': 'black'};
this.label = new Phaser.Text(game, 0, 0, "Label", this.style);
this.addChild(this.label);
this.setLabel("Label");};
LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;
LabelButton.prototype.setLabel = function(label){
this.label.setText(label);
this.label.x = Math.floor((this.width - this.label.width)*0.5);
this.label.y = Math.floor((this.height - this.label.height)*0.5);};


