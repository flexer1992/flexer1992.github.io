
BasicGame.MainMenu = function (game) {

    //this.music = null;
    //this.playButton = null;
    this.templateWindow = null;


};

BasicGame.MainMenu.prototype = {

    create: function () {
        this.drawBackground();
        this.createPlayButton();
        // this.createRatingsButton();
        // this.createGatchaButton();
    },

    drawBackground : function()
    {
        var back = this.add.sprite(0,0, "main_bg");
        back.width = this.world.width;
        back.height = this.world.height;

        //draw cloud
        var cloudLeft = this.add.sprite(0,0,"cloud_2");
        cloudLeft.y = this.world.height - cloudLeft.height;

        var cloudright = this.add.sprite(0,0, "cloud_1");
        cloudright.x = this.world.width - cloudright.width;
        cloudright.y = this.world.height - cloudright.height;

        // draw logo
        var logo = this.add.sprite(0,0, "logo");
        logo.x = (this.world.width - logo.width) * 0.5;
        logo.y = logo.height / 2;

    },

    createPlayButton : function()
    {
        this.playButton = this.add.button(this.world.centerX, this.world.centerY + 134, 'btn_green', this.startGame, this);
        this.playButton.x -= this.playButton.width / 2;
        var text = this.add.text(0, 0, "Play!", {font: "80px officina_sans", fill: "#ffffff"});
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


        // this.ShowTemplateWindow();
    },


    ratingButtonListener : function()
    {
        console.log("click rating button");
    },

    gatchaButtonListener : function()
    {
        console.log("click gatcha button");
    },

    ShowTemplateWindow : function()
    {
        if(this.templateWindow != null)
        {
            this.templateWindow.destroy();
        }


        this.templateWindow = this.game.add.group();
        var back = this.game.add.sprite(0,0, "popup_bg");
        this.templateWindow.add(back);


        this.templateWindow.x = this.game.width / 2 - this.templateWindow.width / 2;
        this.templateWindow.y = this.game.height / 2 - this.templateWindow.height / 2;
    }
};