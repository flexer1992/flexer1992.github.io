
BasicGame.MainMenu = function (game) {

    //this.music = null;
    //this.playButton = null;

};

BasicGame.MainMenu.prototype = {

    create: function () {
        // Add logo to the center of the stage
        //background to look like air hockey table
        this.add.tileSprite(0, 0, this.world.width, this.world.height, 'airhole');
        var tmpImg1 = this.cache.getImage('preloaderBackground');
        var tmpImg2 = this.cache.getImage('players');
        this.add.sprite(this.world.centerX-tmpImg1.width/2.0, 10, 'preloaderBackground');
        this.add.sprite(this.world.centerX-tmpImg2.width/2.0, tmpImg1.height+30, 'players');


        this.createPlayButton();
        this.createRatingsButton();
        this.createGatchaButton();


    },


    createPlayButton : function()
    {
        this.playButton = this.add.button(this.world.centerX, this.world.centerY + 134, 'button_green_normal', this.startGame, this, 'button_green_hover', 'button_green_normal', 'button_green_hover','button_green_normal');
        this.playButton.x -= this.playButton.width / 2;
        var text = this.add.text(0, 0, "Play !", {font: "32px Arial", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = this.playButton.width / 2;
        text.y = this.playButton.height / 2;
        this.playButton.addChild(text);
        this.playButton.scale.set(GameApp.SCALE_RATIO);
    },

    createRatingsButton : function() {

        this.ratingButton = this.add.button(this.world.centerX, this.world.centerY - 134, 'button_yellow_normal', this.ratingButtonListener, this, 'button_yellow_hover', 'button_yellow_normal', 'button_yellow_hover','button_yellow_normal');
        this.ratingButton.x -= this.ratingButton.width / 2;
        var text = this.add.text(0, 0, "Ratings", {font: "32px Arial", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = this.ratingButton.width / 2;
        text.y = this.ratingButton.height / 2;
        this.ratingButton.addChild(text);
        this.ratingButton.scale.set(GameApp.SCALE_RATIO);

    },

    createGatchaButton : function()
    {
        this.gatchaButton = this.add.button(this.world.centerX, this.world.centerY, 'button_yellow_normal', this.gatchaButtonListener, this, 'button_yellow_hover', 'button_yellow_normal', 'button_yellow_hover','button_yellow_normal');
        this.gatchaButton.x -= this.gatchaButton.width / 2;
        var text = this.add.text(0, 0, "Gatcha", {font: "32px Arial", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = this.gatchaButton.width / 2;
        text.y = this.gatchaButton.height / 2;
        this.gatchaButton.addChild(text);
        this.gatchaButton.scale.set(GameApp.SCALE_RATIO);
    },

    update: function () {
        //	Do some nice funky main menu effect here
    },

    startGame: function (btn) {
        this.game.numPlayers = 1;
        this.game.state.start('Game');

    },


    ratingButtonListener : function()
    {
        console.log("click rating button");
    },

    gatchaButtonListener : function()
    {
        console.log("click gatcha button");
    }
};