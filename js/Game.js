/* jshint browser:true */
// create Game function in BasicGame
BasicGame.Game = function (game) {
    this.winPopup = null;
    this.buttonStyle = {font: "64px officina_sans", fill: "#ffffff", align: "center"};
    this.botState = 0;
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


        // //set up goals
        this.goalLeft = this.add.sprite(this.world.width / 2, 0, 'new_gate1');
        this.goalLeft.y = this.goalLeft.height / 2;
        this.goalLeft.tint = 0xbf1f2d;

        this.goalRight = this.add.sprite(this.world.width / 2, this.world.height,'new_gate');
        this.goalRight.y = this.world.height - this.goalRight.height / 2;
        this.goalRight.tint = 0x156cc1;

        //
         this.physics.p2.enable([this.goalLeft,this.goalRight], Settings.SHOW_GATE_COLLIDERS); //change to true to see
        //
        this.goalLeft.body.static = true;
        this.goalLeft.body.setRectangle(Settings.GATE_COLLIDER_WIDTH, Settings.GATE_COLLIDER_HEIGHT, Settings.ENEMY_GATE_COLLIDER_OFFSET_X, Settings.ENEMY_GATE_COLLIDER_OFFSET_Y);


        this.goalRight.body.static = true;
        this.goalRight.body.setRectangle(Settings.GATE_COLLIDER_WIDTH, Settings.GATE_COLLIDER_HEIGHT, Settings.PLAYER_GATE_COLLIDER_OFFSET_X, Settings.PLAYER_GATE_COLLIDER_OFFSET_Y);


        // отрисовка блоков с кругами
        this.drawCircles(graphics, this.world.width / 2, this.world.height / 2, 500, 800);

        this.drawCircles(graphics, this.world.width/ 6, this.world.height / 6, 80, 260);
        this.drawCircles(graphics, (this.world.width - this.world.width/ 6), this.world.height / 6, 80, 260);

        this.drawCircles(graphics, this.world.width/ 6, (this.world.height - this.world.height / 6), 80, 260);
        this.drawCircles(graphics, (this.world.width - this.world.width/ 6), (this.world.height - this.world.height / 6), 80, 260);

    },


    /// рисуем два круга с внутренним радиусом и позицией
    drawCircles : function(graphics, x, y, radius1, radius2)
    {
        graphics.drawCircle(x,y, radius1);
        graphics.drawCircle(x,y, radius2);
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
        this.playerSprite.y = this.world.height - this.playerSprite.height - 180;
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

        var force = 500; //change this for difficulty levels
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
        this.timerTxt = this.add.text(this.world.centerY-5, 5, 'New Puck: 5', { font: "16px officina_sans", fill: "#3369E8", align: "center" });
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

        this.styleWin = { font: "16px officina_sans", fill: "#009925", align: "center" };
        this.styleLose = { font: "16px officina_sans", fill: "#D50F25", align: "center" };

        this.playerStyle = {font: "64px officina_sans", fill: "#156cc1", align: "center"};
        this.enemyStyle = {font: "64px officina_sans", fill: "#bf1f2d", align: "center"};


        this.scoreLtxt = this.add.text(this.world.width /  6 , 60, '0', this.enemyStyle); // enemy score

        this.scoreRtxt = this.add.text(this.world.width - (this.world.width /  6), this.world.height  - 120, '0', this.playerStyle); // player score
    },


    update: function(){

        // if(Settings.USE_NEW_BOT === true){
        //     this.newBotLogic();
        // }else{
        //     this.oldBootLogic();
        // }
        // this.myBotLogic();
        this.newBotLogic();
    },

    // 0 - defense
    // 1 - attack
    // 2 - attackMove
    myBotLogic : function()
    {

        var botX = this.computerHandle.body.x;
        var botY = this.computerHandle.body.y;

        var puckX = this.puck.body.x;
        var puckY = this.puck.body.y;

        // defence
        if(this.botState == 0)
        {
            //защита это по факту слежение за положением херни по которой бъем
            // защищаемся пока расстояние от битка до шарика не будет определенным
            var distance =  this.puck.body.y - this.computerHandle.body.y;


            if(distance < Settings.DISTANCE_BETWEEN_PUCK_AND_BOT)
            {
                this.botState = 1;
            }else {
                this._moveTo(botX, botY, this.world.width / 4 + this.world.width / 2 * (puckX / (this.world.width)) , this.world.height / 6);
            }

        }

        // attack
        if(this.botState == 1)
        {
            if(this.ticks < 30)
            {
                this._moveTo(botX, botY, puckX, puckY);
                this.ticks++;
            }else {
                this.botState = 0;
                this.ticks = 0;
            }


        }
    },

    newBotLogic : function()
    {
        var botX = this.computerHandle.body.x;
        var botY = this.computerHandle.body.y;

        var puckX = this.puck.body.x;
        var puckY = this.puck.body.y;


        if(this.ticks < Settings.SKIP_TICKS_FROM_ATTACK)
        {
            // deffense
            this.ticks++;
            this._defense(botX, botY, puckX, puckY);
            return;
        }else {
            // select attack or defence?;
            this._makeDecision(botX, botY, puckX, puckY);
            this.ticks = 0;
        }
    },

    _defense : function (x, y, px, py)
    {
        if (py < y && Math.abs(this.world.width / 2 - px) > this.world.width / 5)
            return this._moveTo(x, y, px, py - Settings.PUCK_RADIUS);
        this._moveTo(x, y, this.world.width / 4 + this.world.width / 2 * (px / (this.world.width)) , this.world.height / 6);
        return true;
    },

    _makeDecision : function(x, y, px, py)
    {
       // console.log("make decision");

        // attack when puck is in our corner
        // var puckInCorner = px < this.world.width / 5 || px > 4 * this.world.width / 5;
        // console.log(puckInCorner);
        // console.log(py);
        // if (puckInCorner && py < 2 * Settings.PUCK_RADIUS ) {
        //     return ;
        // }


        if(py > this.world.height / 2 + Settings.PUCK_RADIUS)
        {
         //   console.log("skip attack");
            return;
        }


        // move to puck's position and hit puck to the second half of table
        if (py < (this.world.height / 2 ) + Settings.PUCK_RADIUS)
        {
           // console.log("attack");
            return this._moveTo(x, y, px, py - Settings.PUCK_RADIUS / 4);
        }

        //console.log("makeDecision defense");
        return this._defense(x, y, px, py);
    },



     _moveTo : function(ox, oy, px, py)
    {
        var speed = Math.min(640, this.world.width) / (40 + this.getRandom(20));


        // calculate deltas
        const dx = px - ox;
        const dy = py - oy;


        // calculate distance between puck and paddle position (we use Pythagorean theorem)
        const distance = Math.sqrt(dx * dx + dy * dy);
        // if total distance is greater than the distance, of which we can move in one step calculate new x and y coordinates somewhere between current puck and paddle position.
        if (distance > speed) {
            // x = current padle x position + equally part of speed on x axis
            px = ox + speed / distance * dx;
            py = oy + speed / distance * dy;
        }
        // move paddle to the new position
        // this.joint.setTarget(this.table.x2box2d(px), this.table.y2box2d(py));

        this.computerHandle.body.x = px;
        this.computerHandle.body.y = py;
        return true;
    },





    getRandom : function(number)
    {
        return Math.floor(Math.random() * number) + 1;
    },

    oldBootLogic : function()
    {
        if(this.ticks < Settings.BOT_DELAY_TICKS)
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
            this.computerHandle.body.y = Settings.DEFAULT_BOT_Y_POSITION;
            return;
        }


        // 1 player ai
        var deltaY;
        var	velDist;

        if(this.game.numPlayers == 1){
            if(this.puck.body.x > this.world.centerX - Settings.BOT_DELTA_X && this.puck.body.x < this.world.centerX + Settings.BOT_DELTA_X){
                this.computerHandle.body.x = this.puck.body.x;
            }

            // deltaY/4 will give the ai a margin of error big enough for the player to score something, change that around to see if it makes it easier or something
            deltaY = this.puck.body.y - this.computerHandle.body.y;


            if(deltaY >= 0 && deltaY < Settings.BOT_DELTA_Y){
                this.computerHandle.body.y = Settings.BOT_THRUST_FORWARD;  //thrust forward
                this.computerHandle.body.x = this.puck.body.x - deltaY / Settings.BOT_EASIER;
            }
            else if(deltaY < 0){
                this.computerHandle.body.y = Settings.BOT_THRUST_BACK;  //thrust back
                this.computerHandle.body.x = this.puck.body.x - deltaY / Settings.BOT_EASIER;

            }
            else
                this.computerHandle.body.y = Settings.BOT_THRUST_FORWARD;  //thrust forward


            // Gets the velocity distance (Magnitude)
            velDist = this.getDistance(this.puck.body.velocity.x, this.puck.body.velocity.y);

            if(velDist> Settings.BOT_DEFFENSIVE_VELOCITY)
            {
                // Makes the puck go defensive
                // If the puck is going too fast then make the computer try and defend the goal by spaztically moving side to side
                this.computerHandle.body.y = Settings.BOT_DEFFENSIVE_POSITION; // This will make the puck more 'defensive' but will make it easier
                this.computerHandle.body.x = this.world.centerX + this.rnd.integerInRange(-Settings.BOT_DELTA_X, Settings.BOT_DELTA_X);
            }
            if(this.puck.body.x> this.world.centerX / 2 && this.puck.body.x < this.world.centerX / 2)
            {
                // Flings the puck forward
                // If the puck is going too fast, just assume and fling towards the 3 quarter mark
                if(velDist> Settings.BOT_DEFFENSIVE_VELOCITY)
                    this.computerHandle.body.x = this.world.centerX * (3/4);
                else // Else just hit towards the puck with a margin of error
                    this.computerHandle.body.x = this.puck.body.x - deltaY / Settings.BOT_EASIER;
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
                this.drawWinnerWindow(false);
            }
            else
            {
                this.drawWinnerWindow(true);
            }
        }
    },

    drawWinnerWindow : function(isPlayer)
    {

        if(this.winPopup != null)
        {
            this.winPopup.destroy();
        }

        this.winPopup = WindowManager.endBattleWindow({winner : isPlayer, yourScore : this.scoreR, enemyScore : this.scoreL, reward : isPlayer ? Settings.WIN_REWARD : 0}, this.game);
    },

    replay : function()
    {
        this.game.numPlayers = 1;
        this.game.state.start('Game');
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