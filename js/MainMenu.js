
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

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        //this.music = this.add.audio('titleMusic');
        //this.music.play();

        //this.add.sprite(0, 0, 'titlepage');

        this.playBtn1 = this.add.button(this.world.centerX-90, 160, 'button1', this.startGame, this);
        this.playBtn1.val = 1;
        // this.playBtn2 = this.add.button(this.world.centerX-30, 160, 'button2', this.startGame, this);
        // this.playBtn2.val = 2;
        // this.playBtn3 = this.add.button(this.world.centerX+30, 160, 'button3', this.startGame, this);
        // this.playBtn3.val = 3;
        // this.playBtn4 = this.add.button(this.world.centerX+90, 160, 'button4', this.startGame, this);
        // this.playBtn4.val = 4;
        //this.playButton = this.add.button(50, this.world.centerY, 'button1', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

    },

    update: function () {

        //	Do some nice funky main menu effect here

    },

    startGame: function (btn) {
        this.game.numPlayers = btn.val;
        this.game.state.start('Game');

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //this.music.stop();

        //	And start the actual game
        //this.state.start('Game');

    }

};