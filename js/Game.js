/* jshint browser:true */
// create Game function in BasicGame
BasicGame.Game = function (game) {
    this.winPopup = null;
    this.buttonStyle = {font: "64px officina_sans", fill: "#ffffff", align: "center"};
    this.botState = 0;
    this.isFirstTimeInOpponentsHalf = true;
    this.offsetXFromTarget = 0;
    this.bot = {};
};


// set Game function prototype
BasicGame.Game.prototype = {
    init: function () {
        // TODO: Add logo to the center of the stage

        this.bot = UserData.GetCurrentBot();

        let boardSetting = UserData.GetCurrentField();

        this.isFirstTimeInOpponentsHalf = true;

        this.AllScore = Settings.COUNT_TO_WIN;


        this.stage.backgroundColor = boardSetting.fieldColor;

        //background to look like air hockey table
        let dots = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'field_dot');
        dots.tint = boardSetting.dotColor;


        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.restitution = Settings.RESTITUTION; //this gives bounce

        //draw the board
        var graphics = this.add.graphics(0, 0);
        graphics.beginFill(0xc0c0c0, 0);
        graphics.lineStyle(4, boardSetting.linesColor, 0.5);


        // //set up goals
        this.goalLeft = this.add.sprite(this.world.width / 2, 0, 'new_gate1');
        this.goalLeft.scale.set(scaleRatio);
        this.goalLeft.y = this.goalLeft.height / 2;
        this.goalLeft.tint = 0xbf1f2d;

        this.goalRight = this.add.sprite(this.world.width / 2, this.world.height,'new_gate');
        this.goalRight.scale.set(scaleRatio);
        this.goalRight.y = this.world.height - this.goalRight.height / 2;
        this.goalRight.tint = 0x156cc1;

        //
         this.physics.p2.enable([this.goalLeft,this.goalRight], Settings.SHOW_GATE_COLLIDERS); //change to true to see
        //
        this.goalLeft.body.static = true;
        this.goalLeft.body.setRectangle(Settings.GATE_COLLIDER_WIDTH * scaleRatio, Settings.GATE_COLLIDER_HEIGHT * scaleRatio,
            Settings.ENEMY_GATE_COLLIDER_OFFSET_X * scaleRatio, Settings.ENEMY_GATE_COLLIDER_OFFSET_Y *scaleRatio);


        this.goalRight.body.static = true;
        this.goalRight.body.setRectangle(Settings.GATE_COLLIDER_WIDTH * scaleRatio, Settings.GATE_COLLIDER_HEIGHT * scaleRatio,
            Settings.PLAYER_GATE_COLLIDER_OFFSET_X * scaleRatio, Settings.PLAYER_GATE_COLLIDER_OFFSET_Y * scaleRatio);


        // отрисовка блоков с кругами
        this.drawCircles(graphics, this.world.width / 2, this.world.height / 2, 500 * scaleRatio, 800 * scaleRatio);

        this.drawCircles(graphics, this.world.width/ 6, this.world.height / 6, 80 * scaleRatio, 260 * scaleRatio);
        this.drawCircles(graphics, (this.world.width - this.world.width/ 6), this.world.height / 6, 80 * scaleRatio, 260 * scaleRatio);

        this.drawCircles(graphics, this.world.width/ 6, (this.world.height - this.world.height / 6), 80 * scaleRatio, 260 * scaleRatio);
        this.drawCircles(graphics, (this.world.width - this.world.width/ 6), (this.world.height - this.world.height / 6), 80 * scaleRatio, 260 * scaleRatio);


        // Add puck to the center of the stage
        this.puck = this.add.sprite(this.world.centerX, this.world.centerY, boardSetting.puck);
        this.puck.scale.set(scaleRatio);
        this.puck.anchor.setTo(0.5, 0.5);


    },


    /// рисуем два круга с внутренним радиусом и позицией
    drawCircles : function(graphics, x, y, radius1, radius2)
    {
        graphics.drawCircle(x,y, radius1);
        graphics.drawCircle(x,y, radius2);
    },


    create: function () {

        // turn false the collision circle in production
        this.physics.p2.enable(this.puck, false); //change to true to see hitcircle
        this.puck.body.setCircle(70 * scaleRatio);
        this.puck.body.collideWorldBounds = true;

        //add paddles up to 4 (able to add multiple paddles)
        this.paddles = this.add.group();

        let playerBat = UserData.GetCurrentBat();
        let enemyBat = UserData.GetEnemyBat();


        //one player setup with two paddles one named
        this.computer = this.paddles.create(this.world.width / 2, 180  * scaleRatio , enemyBat.icon);
        this.computer.scale.set(scaleRatio);

        this.playerSprite = this.paddles.create(this.world.width / 2, this.world.height - 180 * scaleRatio , playerBat.icon);
        this.playerSprite.scale.set(scaleRatio);
        this.playerSprite.y = this.world.height - this.playerSprite.height - 180 * scaleRatio;

        this.physics.p2.enable(this.paddles, false); //change to true to see hitcircle


        this.computerHandle = this.add.sprite(this.world.width / 2, 180 );
        this.physics.p2.enable(this.computerHandle, false); //true for view

        this.computerHandle.body.setCircle(5);
        this.computerHandle.anchor.setTo(0.5, 0.5);

        this.computerHandle.body.x = this.world.width / 2;
        this.computerHandle.body.y = 180 * scaleRatio;

        this.computer.anchor.setTo(0.5, 0.5);
        this.computer.body.x = this.world.width / 2;

        var force = 500; //change this for difficulty levels
        this.physics.p2.createLockConstraint(this.computerHandle, this.computer, [1,1], force);
        this.computerHandle.body.static = true;

        // // paddles.setAll functin can set properties too.
        this.paddles.forEach(function(paddle){
            paddle.anchor.setTo(0.5, 0.5);
            paddle.body.collideWorldBounds = true;
            paddle.body.setCircle(117 * scaleRatio);
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
        this.timerTxt = this.add.text(this.world.centerX, this.world.centerY, 'New Puck: 5', { font: "40px officina_sans", fill: "#3369E8", align: "center" });
        this.timerTxt.anchor.setTo(0.5, 0.5);
        this.timerTxt.visible = false;

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
        this.finalBotLogick();
        this.checkPlayerSprite();
    },

    checkPlayerSprite : function(){
        if(this.playerSprite.body.y < this.game.world.height / 2)
        {
            this.playerSprite.body.y = this.game.world.height / 2;
        }
    },

    finalBotLogick : function(){
        let puckX = this.puck.body.x;
        let puckY = this.puck.body.y;

        let movementSpeed;
        let deltaTime = this.game.time.elapsed/1000;


        let targetX;
        let targetY;


        if(puckY < this.bot.playerBoundary.Down * scaleRatio)
        {
            if(this.isFirstTimeInOpponentsHalf)
            {
                this.isFirstTimeInOpponentsHalf = false;
                this.offsetXFromTarget = UserData.GetRandomFloat(-1, 1);
            }

            movementSpeed = this.bot.MovementSpeed ;///* UserData.GetRandomFloat(0.1, 0.3);
            targetX = UserData.Clamp(puckX + this.offsetXFromTarget, this.bot.playerBoundary.Left * scaleRatio, this.bot.playerBoundary.Right * scaleRatio);
            targetY = puckY;

        }
        else
        {
            this.isFirstTimeInOpponentsHalf = true;

            movementSpeed = UserData.GetRandomFloat(this.bot.MovementSpeed * 0.4, this.bot.MovementSpeed);

            targetX = UserData.Clamp(puckX, this.bot.playerBoundary.Left * scaleRatio, this.bot.playerBoundary.Right * scaleRatio);
            targetY = UserData.Clamp(puckY, this.bot.playerBoundary.Down * scaleRatio, this.bot.playerBoundary.Up * scaleRatio);
        }


        let directionX = targetX - this.computerHandle.body.x;
        let directionY = targetY - this.computerHandle.body.y;

        this.computerHandle.body.x += directionX * deltaTime * movementSpeed ;
        this.computerHandle.body.y += directionY * deltaTime * movementSpeed;
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
    },

    scoreRight: function (body1, body2){
        this.AllScore--;
        this.puck.body.velocity.x=	0;
        this.puck.body.velocity.y=	0;
        this.scoreL++;
        this.scoreLtxt.setText(this.scoreL);
        this.puck.kill();
        this.timer = this.time.events.loop(500, this.updateCounter, this);
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
            this.counter = Settings.TIME_TO_NEW_PUCK;
            this.ejectPuck();
            this.timerTxt.visible = false;
        }


        if(this.AllScore <= 0)
        {
            this.time.events.remove(this.timer);
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

        if(isPlayer) // увеличим количество побед
            UserData.UpWinCounter();

        this.winPopup = WindowManager.endBattleWindow(
            {
                winner : isPlayer,
                yourScore : this.scoreR,
                enemyScore : this.scoreL,
                reward : isPlayer ? Settings.WIN_REWARD : 0,
                OnClose : this.OnCloseResultWindow,
                OnRestart : this.OnRestart,
                OnRevange : this.OnRevange
            }, this.game);
    },

    OnCloseResultWindow : function(context){
        context.state.start('MainMenu');
    },


    OnRestart : function(context)
    {
        context.state.start('Game');
    },

    // TODO хрен знает чем отличаются
    OnRevange : function(context)
    {
        context.state.start('Game');
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

            if(bodies[0].parent.sprite !== this.playerSprite) return;


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
        if(pointer.paddle){

             pointer.handle.body.x = x;
             pointer.handle.body.y = y;

             if(pointer.handle.body.y < this.game.world.height / 2)
                 {
                     pointer.handle.body.y = this.game.world.height / 2;
                 }

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