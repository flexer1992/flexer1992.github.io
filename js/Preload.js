BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    //this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {

        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        var tmpImg1 = this.cache.getImage('preloaderBackground');
        this.add.sprite(this.world.centerX-tmpImg1.width/2.0, 10, 'preloaderBackground');

        this.preloadBar = this.add.sprite(50, 170, 'preloaderBar');

        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets
        this.load.image('puck', 'asset/rubber_puck3.png');
        this.load.image('paddle', 'asset/rubber_paddle.png');
        this.load.image('goalRight', 'asset/blueGoal.png');
        this.load.image('goalLeft', 'asset/redGoal.png');
        this.load.image('airhole', 'asset/hole4.png');
        this.load.image('players', 'asset/players.png');
        this.load.image('button1', 'asset/button1.png');
        this.load.image('button2', 'asset/button2.png');
        this.load.image('button3', 'asset/button3.png');
        this.load.image('button4', 'asset/button4.png');
        this.load.image('mainMenu', 'asset/buttons.png');


        //this.load.image('titlepage', 'images/title.jpg');
        //this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
        //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
        //this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
        //	+ lots of other required assets here

    },

    create: function () {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        //this.preloadBar.cropEnabled = false;

    },

    update: function () {

        //Todo: pause a bit

        this.state.start('MainMenu');

        /*
        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        {
            this.ready = true;
            //this.state.start('MainMenu');
        }
        */

    }

};