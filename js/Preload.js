BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    //this.ready = false;

};

BasicGame.Preloader.prototype = {

    drawPreloader : function(){

        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar

        var back =  this.add.sprite(0, 0, 'main_bg');
        back.width = this.world.width;
        back.height = this.world.height;


        var logo = this.add.sprite(0,0, 'logo');
        logo.scale.set(scaleRatio, scaleRatio);

        logo.x = (this.world.width - logo.width) / 2;
        logo.y = 200 * scaleRatio;


        var preloader_bg = this.add.sprite(0, 0, "prbar_bg");
      //  preloader_bg.scale.set(scaleRatio, scaleRatio);

        preloader_bg.x = (this.world.width - preloader_bg.width)/ 2;
        preloader_bg.y = (this.world.height - preloader_bg.height) / 2;

        this.preloadBar = this.add.sprite(0, 0, "prbar_color");
    //    this.preloadBar.scale.set(scaleRatio, scaleRatio);

        this.preloadBar.x = (this.world.width - this.preloadBar.width)/ 2;
        this.preloadBar.y = (this.world.height - this.preloadBar.height) / 2;
        this.preloadBar.tint = 0x3f9dfc;




        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

    },

    preload: function () {

        this.drawPreloader();

        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets

        this.load.image("new_gate", 'asset/gates.png');
        this.load.image("new_gate1", 'asset/gatesLeft.png');



        for (var key in Settings.resources)
        {
            this.load.image(key, Settings.resources[key]);
        }
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