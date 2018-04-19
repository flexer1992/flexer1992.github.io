/* jshint browser:true */
// create Game function in BasicGame
BasicGame.Game = function (game) {


};


// set Game function prototype
BasicGame.Game.prototype = {
    init: function () {
        // TODO: Add logo to the center of the stage

        this.AllScore = Settings.COUNT_TO_WIN;

        //background to look like air hockey table
        this.add.tileSprite(0, 0, this.world.width, this.world.height, 'airhole');

        this.stage.backgroundColor = '#fff';
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.restitution = Settings.RESTITUTION; //this gives bounce

        //draw the board
        var graphics = this.add.graphics(0, 0);
        graphics.beginFill(0xc0c0c0,0);
        graphics.lineStyle(4, 0xD62D20, 0.5);


        console.log(this.world.width);
        console.log(this.world.height);

        // graphics.moveTo(this.world.width/2 + 50, this.world.height / 2);
        // graphics.lineTo(this.world.width, this.world.height / 2);
        // graphics.moveTo(this.world.width/2 - 50, this.world.height/2);
        // graphics.lineTo(0, this.world.height / 2);




        // graphics.moveTo(this.world.centerX, 100);
        // graphics.lineTo(this.world.centerX, this.world.height/2 -50);
        // graphics.moveTo(this.world.centerX, this.world.height/2 +50 );
        // graphics.lineTo(this.world.centerX, this.world.height -100);
        //

        // graphics.drawCircle(this.world.centerX, this.world.centerY, 50);
        //
        // graphics.drawCircle(this.world.width / 2, this.world.height, 100);
        // graphics.drawCircle(this.world.width / 2, 0, 100);

        // //set up goals
        this.goalLeft = this.add.sprite(this.world.width / 2, 6, 'goalLeft');
        this.goalRight = this.add.sprite(this.world.width / 2, this.world.height - 12,'goalRight');
        //
         this.physics.p2.enable([this.goalLeft,this.goalRight], true); //change to true to see
        //
        this.goalLeft.body.static = true;
        this.goalLeft.body.setRectangle(100, 15, -4);
        this.goalRight.body.static = true;
        this.goalRight.body.setRectangle(100, 15,6);


        // отрисовка блоков с кругами
        this.drawCircles(graphics, this.world.width / 2, this.world.height / 2, 500, 800);

        this.drawCircles(graphics, this.world.width/ 6, this.world.height / 6, 80, 260);
        this.drawCircles(graphics, (this.world.width - this.world.width/ 6), this.world.height / 6, 80, 260);

        this.drawCircles(graphics, this.world.width/ 6, (this.world.height - this.world.height / 6), 80, 260);
        this.drawCircles(graphics, (this.world.width - this.world.width/ 6), (this.world.height - this.world.height / 6), 80, 260);

        console.log(GameApp.SCALE_RATIO);





    },


    /// рисуем два круга с внутренним радиусом и позицией
    drawCircles : function(graphics, x, y, radius1, radius2)
    {
        graphics.drawCircle(x,y, radius1);
        graphics.drawCircle(x,y, radius2)

    },


    preload: function () {
        // Here we load the assets required for our preloader

    },

    create: function () {


        // Add puck to the center of the stage
        this.puck = this.add.sprite(this.world.centerX, this.world.centerY,'newPuck');
        this.puck.anchor.setTo(0.5, 0.5);

        // turn false the collision circle in production
        this.physics.p2.enable(this.puck, false); //change to true to see hitcircle
        this.puck.body.setCircle(70);
        this.puck.body.collideWorldBounds = true;

        //add paddles up to 4 (able to add multiple paddles)
        this.paddles = this.add.group();

        //one player setup with two paddles one named
        this.computer = this.paddles.create(this.world.width / 2, 180  ,'bitok');
        this.computer.tint = 0xaa1111;


        this.playerSprite = this.paddles.create(this.world.width / 2, this.world.height - 180 ,'bitok');
        this.playerSprite.tint = 0x1a79d7;

        this.physics.p2.enable(this.paddles, false); //change to true to see hitcircle


        this.computerHandle = this.add.sprite(this.world.width / 2, 180 );
        this.physics.p2.enable(this.computerHandle, false); //true for view

        this.computerHandle.body.setCircle(5);
        this.computerHandle.anchor.setTo(0.5, 0.5);

        this.computerHandle.body.x = this.world.width / 2;
        this.computerHandle.body.y = 180;

        this.computer.anchor.setTo(0.5, 0.5);
        this.computer.body.x = this.world.width / 2;

        var force = 250; //change this for difficulty levels
        this.physics.p2.createLockConstraint(this.computerHandle, this.computer, [1,1], force);
        this.computerHandle.body.static = true;

        // // paddles.setAll functin can set properties too.
        this.paddles.forEach(function(paddle){
            paddle.anchor.setTo(0.5, 0.5);
            paddle.body.collideWorldBounds = true;
            paddle.body.setCircle(117);
        });

        this.goalLeft.bringToTop();
        this.goalRight.bringToTop();


        this.puck.body.createBodyCallback(this.goalLeft, this.scoreLeft, this);
        this.puck.body.createBodyCallback(this.goalRight, this.scoreRight, this);



        this.physics.p2.setImpactEvents(true);

        //input event liseteners
        this.input.onDown.add(this.paddleGrab, this);
        this.input.onUp.add(this.paddleDrop, this);
        this.input.addMoveCallback(this.paddleMove, this);

        // for eject puck timer
        this.timerTxt = this.add.text(this.world.centerY-5, 5, 'New Puck: 5', { font: "16px Arial", fill: "#3369E8", align: "center" });
        this.timerTxt.anchor.setTo(0.5, 0.5);
        this.timerTxt.visible = false;
        this.timerTxt.angle = 90;

        this.initScoreContainer();
    },


    initScoreContainer : function()
    {
        this.counter = Settings.TIME_TO_NEW_PUCK;

        this.scoreL = 0;
        this.scoreR = 0;

        this.styleWin = { font: "16px Arial", fill: "#009925", align: "center" };
        this.styleLose = { font: "16px Arial", fill: "#D50F25", align: "center" };

        this.playerStyle = {font: "64px Arial", fill: "#156cc1", align: "center"};
        this.enemyStyle = {font: "64px Arial", fill: "#bf1f2d", align: "center"};


        this.scoreLtxt = this.add.text(this.world.width /  6 , 60, '0', this.enemyStyle); // enemy score

        this.scoreRtxt = this.add.text(this.world.width - (this.world.width /  6), this.world.height  - 120, '0', this.playerStyle); // player score
    },


    update: function(){

        if(this.ticks< 4)
        {
            this.ticks++;
            return;
        }
        else
        {
            this.ticks=	0;
        }



        if(this.computerHandle.body.y > this.world.centerY)
        {
            this.computerHandle.body.y = 180;
            return;
        }



        // 1 player ai
        var deltaY;
        var xConstraint = 80;
        var	velDist;

        if(this.game.numPlayers == 1){
            if(this.puck.body.x > this.world.centerX - xConstraint && this.puck.body.x < this.world.centerX + xConstraint){
                this.computerHandle.body.x = this.puck.body.x;
            }

            // deltaY/4 will give the ai a margin of error big enough for the player to score something, change that around to see if it makes it easier or something
            deltaY = this.puck.body.y - this.computerHandle.body.y;


            if(deltaY>=0 && deltaY<70){
                this.computerHandle.body.y = 180;  //thrust forward
                this.computerHandle.body.x = this.puck.body.x -deltaY/4;
            }
            else if(deltaY<0){
                this.computerHandle.body.y = 120;  //thrust back
                this.computerHandle.body.x = this.puck.body.x-deltaY/4;

            }
            else
                this.computerHandle.body.y = 180;  //thrust forward


            // Gets the velocity distance (Magnitude)
            velDist=	this.getDistance(this.puck.body.velocity.x, this.puck.body.velocity.y);



            if(velDist> 2000)
            {
                // Makes the puck go defensive
                // If the puck is going too fast then make the computer try and defend the goal by spaztically moving side to side
                this.computerHandle.body.y =	80; // This will make the puck more 'defensive' but will make it easier
                this.computerHandle.body.x =	this.world.centerX + this.rnd.integerInRange(-xConstraint, xConstraint);
            }
            if(this.puck.body.x> this.world.centerX/ 2 && this.puck.body.x< this.world.centerX*(3/4))
            {
                // Flings the puck forward
                // If the puck is going too fast, just assume and fling towards the 3 quarter mark
                if(velDist> 2000)
                    this.computerHandle.body.x = this.world.centerX*(3/4);
                else // Else just hit towards the puck with a margin of error
                    this.computerHandle.body.x = this.puck.body.x-deltaY/4;
            }
        }
    },



    getDistance:	function(x, y)	{
        return (Math.sqrt(x*x+y*y));
    },

    ticks:	0,

    scoreLeft: function (body1, body2){
        this.AllScore--;
        this.puck.body.velocity.x=	0;
        this.puck.body.velocity.y=	0;
        this.scoreR++;
        this.scoreRtxt.setText(this.scoreR);
        this.puck.kill();
        this.timer = this.time.events.loop(500, this.updateCounter, this);
        this.aiTimer=	this.time.events.loop(80, function()
            {
                // Makes the computer angry
                // this.computerHandle.body.x =	65+this.rnd.integerInRange(-4, 80);
                // this.computerHandle.body.y =	this.world.centerY+this.rnd.integerInRange(-80, 80);

                this.computerHandle.body.x =	this.world.centerX + this.rnd.integerInRange(-80, 80);;
                this.computerHandle.body.y =	120  +  this.rnd.integerInRange(-4, 80) ;



            },
            this);
    },

    scoreRight: function (body1, body2){
        this.AllScore--;
        this.puck.body.velocity.x=	0;
        this.puck.body.velocity.y=	0;
        this.scoreL++;
        this.scoreLtxt.setText(this.scoreL);
        this.puck.kill();
        this.timer = this.time.events.loop(500, this.updateCounter, this);
        this.computerHandle.body.x=	this.world.centerX;

        this.aiTimer=	this.time.events.loop(180, function()
            {
                // Makes the computer giddy
                this.computerHandle.body.y =	120 + this.rnd.integerInRange(-4, 80);
            },
            this);
    },


    updateCounter: function(timer) {
        this.timerTxt.visible = true;
        this.counter--;


        if(this.counter > 0)
        {
            this.timerTxt.setText('New Puck: ' + this.counter);
        }
        else
        {
            this.time.events.remove(this.timer);
            this.time.events.remove(this.aiTimer);
            this.counter = Settings.TIME_TO_NEW_PUCK;
            this.ejectPuck();
            this.timerTxt.visible = false;
        }


        if(this.AllScore <= 0)
        {
            this.time.events.remove(this.timer);
            this.time.events.remove(this.aiTimer);
            this.timerTxt.visible = false;


            if(this.scoreL > this.scoreR)
            {
                //TODO enemy win
                console.log("enemy winnwe")
            }
            else
            {
                //TODO player win
                console.log("player winner");
            }
        }
    },


    ejectPuck: function(){
        this.puck.body.x = this.world.centerX;
        this.puck.body.y = this.world.centerY;
        this.puck.body.velocity.y = 50;
        this.puck.body.velocity.x = this.rnd.integerInRange(-70, 70);
        this.puck.revive();
    },


    newGame: function(){
        this.state.start('MainMenu');
    },


    // utility functions for the paddles *****************
    paddleGrab: function (pointer) {

        var bodies = this.physics.p2.hitTest(pointer.position);

        if (bodies.length != 0){

            pointer.handle = this.add.sprite(pointer.x, pointer.y);
            this.physics.p2.enable(pointer.handle,false);
            pointer.handle.body.setCircle(5);
            pointer.handle.anchor.setTo(0.5, 0.5);
            pointer.handle.body.static = true;
            pointer.handle.body.collideWorldBounds = true;

            //basically the pointer gets reference to new handle sprite, paddle and paddle spring
            //not sure this is the best thing to do but it's for multitouch.
            pointer.paddle = bodies[0].parent.sprite;  //paddle sprite clicked gets pointer object
            //Docs.... createLockConstraint(bodyA, bodyB, offset, angle, maxForce)
            pointer.paddleSpring = this.physics.p2.createLockConstraint(pointer.handle, bodies[0].parent.sprite );
            //console.log("hello" + bodies.length);
        }

    },
    paddleMove: function(pointer, x, y, isDown) {
        //at this point the spring is attached
        if(pointer.paddle){
            //TODO: Keep paddle on table.
             pointer.handle.body.x = x;
             pointer.handle.body.y = y;

            // pointer.handle.body.x +=  pointer.movementX * Settings.MONE_USER_PADDLE;
            // pointer.handle.body.y += pointer.movementY * Settings.MONE_USER_PADDLE;
        }
    },

    paddleDrop: function(pointer){
        if(pointer.handle){
            pointer.handle.destroy();
            pointer.paddle = null;
            this.physics.p2.removeConstraint(pointer.paddleSpring);
        }
    }

};