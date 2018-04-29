BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {



    init: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.stage.backgroundColor = '#fff';

        //HACK TO PRELOAD A CUSTOM FONT
        this.game.add.text(0, 0, "hack", {font:"1px officina_sans", fill:"#FFFFFF"});

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // If you wish to align your game in the middle of the page then you can
            // set this value to true. It will place a re-calculated margin-left
            // pixel value onto the canvas element which is updated on orientation /
            // resizing events. It doesn't care about any other DOM element that may
            // be on the page, it literally just sets the margin.
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            // Force the orientation in landscape or portrait.
            // * Set first to true to force landscape.
            // * Set second to true to force portrait.
            this.scale.forceOrientation(true, false);
            // Sets the callback that will be called when the window resize event
            // occurs, or if set the parent container changes dimensions. Use this
            // to handle responsive game layout options. Note that the callback will
            // only be called if the ScaleManager.scaleMode is set to RESIZE.
            this.scale.setResizeCallback(this.gameResized, this);
            // Set screen size automatically based on the scaleMode. This is only
            // needed if ScaleMode is not set to RESIZE.
           // this.scale.setScreenSize(true);
           //
           // this.scale.SetSce
            // Re-calculate scale mode and update screen size. This only applies if
            // ScaleMode is not set to RESIZE.
            this.scale.refresh();


            // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.scale.setMinMax(480, 260, 1024, 768);
            // this.scale.pageAlignHorizontally = true;
            // this.scale.pageAlignVertically = true;
            // this.scale.forceOrientation(true, false);
            // this.scale.setResizeCallback(this.gameResized, this);
            // this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            // this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'asset/airHockeySplash.png');
        this.load.image('preloaderBar', 'asset/preloader-bar.png');

    },

    create: function () {

        this.state.start('Preload');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};
