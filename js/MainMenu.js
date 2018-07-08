
BasicGame.MainMenu = function (game) {
    let _this = this;

    this.self = this;
    //this.music = null;
    //this.playButton = null;
    this.templateWindow = null;

    this.moneyText = {};
    this.batImage = {};
    this.fieldImage = {};
    this.interval = {};
    this.gatchaTimer = {};
    this.batSticker = {};
    this.fieldSticker = {};
};

BasicGame.MainMenu.prototype = {

    create: function () {
        this.drawBackground();
        this.drawMoneyContainer();
        this.drawChooseFieldButton();
        this.drawChooseButButton();
        this.createPlayButton();
        this.CreateGatchButton();
        this.startInterval();
    },

    drawMoneyContainer : function()
    {
        var moneyBg = this.add.sprite(0,0,"money_back");

        var money_icon = this.add.sprite(0,0, "icon_coin");
        moneyBg.addChild(money_icon);
        money_icon.y = (moneyBg.height - money_icon.height) / 2;
        money_icon.x = 10;

        // // TODO передавать значение в текстовое поле что хотим отрисовать
        var text = this.add.text(0, 0, "99999", {font: "70px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);

        text.x = moneyBg.width / 2;
        text.y = moneyBg.height / 2;
        moneyBg.addChild(text);

        this.moneyText = text;

        let shopButton = this.add.button(0,0, "plus_btn", this.ShopButtonListener, this);
        moneyBg.addChild(shopButton);
        shopButton.y = moneyBg.height / 2 - shopButton.height / 2;
        shopButton.x = moneyBg.width - shopButton.width - 12 * scaleRatio;

        moneyBg.scale.set(scaleRatio);
        moneyBg.x = (this.world.width - moneyBg.width) / 2;
        moneyBg.y = 650 * scaleRatio;

        //


        this.updateMoneyInfo();
    },

    ShopButtonListener : function()
    {
        WindowManager.ShowShopButton(this.game);
    },

    updateMoneyInfo : function(){
        this.moneyText.text = UserData.CurrentMoney();
    },

    drawBackground : function()
    {
        let back = this.add.sprite(0,0, "main_bg");
        back.scale.set(scaleRatio);
        back.x = this.world.width / 2 - back.width / 2;
        back.y = this.world.height / 2 - back.height / 2;

        let logo = this.add.sprite(0,0, "logo");
        logo.scale.set(scaleRatio);

        logo.x = (this.world.width - logo.width) * 0.5;
        logo.y = 200 * scaleRatio;

    },


    // TODO надо будет как-то учитывать какие поля выбраны сейчас у юзера
    drawChooseFieldButton : function()
    {

        let chooseField = this.game.add.group();

        let button_back = this.add.button(0,0, "main_btn_left", this.selectFieldButtonClick, this);
        chooseField.add(button_back);


        this.fieldImage = this.add.sprite(0,0, "soccer_field");

        chooseField.addChild(this.fieldImage);
        this.fieldImage.x = chooseField.width / 2 - this.fieldImage.width / 2;
        this.fieldImage.y = chooseField.height / 2 - this.fieldImage.height / 2- 10;

        let item_name = this.add.text(0, 0, Settings.locale.SELECT_LABEL, {font: "50px officina_sans", fill: "#E14B1A"});
        item_name.anchor.set(0.5, 0.5);
        chooseField.addChild(item_name);

        item_name.x = button_back.width/2;
        item_name.y = chooseField.height - 1.4 * item_name.height;

        chooseField.scale.set(scaleRatio);

        chooseField.x = this.world.width / 2 - chooseField.width - 40 * scaleRatio;//- chooseField.width / 2 + 60* scaleRatio;
        chooseField.y = this.world.height / 2 - chooseField.height / 4 - 36 * scaleRatio;


        this.fieldSticker = this.game.add.sprite(0,0,"sticker");
        chooseField.addChild(this.fieldSticker);
        this.fieldSticker.x = 0;
        this.fieldSticker.y = -20 * scaleRatio;

        this.updateFieldInfo();
    },

    updateFieldInfo : function(){
        let curField = UserData.GetCurrentField();
        this.fieldImage.loadTexture(curField.icon);

        this.fieldSticker.alpha = 0;

        let isCanOpenField = false; // красненький
        let isViewedField = false;

        for (let i = 1; i < Settings.fields.length ; i++)
        {
            if(!UserData.ContainsField(Settings.fields[i].id))
            {
                if(UserData.GetWinCounter() >= Settings.fields[i].totalWins){
                    isCanOpenField = true;
                }
            }else{
                if(UserData.data.usesFields.indexOf(Settings.fields[i].id) === -1)
                {
                    isViewedField = true;
                }
            }
        }

        if(isCanOpenField){
            this.fieldSticker.loadTexture("stickerMain");
            this.fieldSticker.alpha = 1;
            return;
        }

        if(isViewedField){
            this.fieldSticker.loadTexture("sticker");
            this.fieldSticker.alpha = 1;
        }

    },

    updateBatInfo : function(){
        let curBat = UserData.GetCurrentBat();
        this.batImage.loadTexture(curBat.icon);
        this.batSticker.alpha = 0;

        let settingsBats =[];

        for(let i = 0; i < Settings.bats.length; i++)
        {
            if(Settings.bats[i].isPlayer)
            {
                settingsBats.push(Settings.bats[i]);
            }
        }

        // если доступны и не проспотрены
        let isAccess = false; // для красного стикера
        let isNoUses = false;
        for (let i = 0 ; i < settingsBats.length; i++)
        {
            if(!UserData.ContainsBat(settingsBats[i].id))
            {
                if(UserData.CurrentMoney() - settingsBats[i].price >= 0)
                {
                    isAccess = true;
                }
            }
            else
            {
                // если есть но не использованы? то синий
                if(UserData.data.usesBats.indexOf(settingsBats[i].id) === -1)
                {
                    isNoUses = true;
                }
            }
        }

        if(isAccess){
            this.batSticker.loadTexture("stickerMain");
            this.batSticker.alpha = 1;
            return;
        }

        if(isNoUses){
            this.batSticker.loadTexture("sticker");
            this.batSticker.alpha = 1;
        }
    },

    selectFieldButtonClick : function()
    {
        WindowManager.ChooseFieldWindow(this.game, function(){
            game.state.getCurrentState().self.UpdateScreen();
        });
    },

    // TODO обновление данных на всем окне
    UpdateScreen : function(){
        this.updateFieldInfo();
        this.updateBatInfo();
        this.updateMoneyInfo();
    },

    //TODO учитывать выбранную пользователем биту
    drawChooseButButton : function()
    {
        let chooseField = this.game.add.group();

        let button_back = this.add.button(0,0, "main_btn_right", this.selectButButton, this);

        chooseField.add(button_back);

        this.batImage = this.add.sprite(0,0, "hockey_bat_blue");
        chooseField.add(this.batImage);

        this.batImage.x = chooseField.width / 2 - this.batImage.width / 2 ;
        this.batImage.y = chooseField.height / 2 - this.batImage.height / 2 - 10;

        let item_name = this.add.text(0, 0, Settings.locale.SELECT_LABEL, {font: "50px officina_sans", fill: "#E14B1A"});
        item_name.anchor.set(0.5, 0.5);

        button_back.addChild(item_name);

        item_name.x = button_back.width / 2;
        item_name.y = button_back.height - item_name.height;

        chooseField.scale.set(scaleRatio);

        chooseField.x = this.world.width / 2 + 50 * scaleRatio;
        chooseField.y = this.world.height / 2 - chooseField.height / 4 - 36 * scaleRatio;

        this.batSticker = this.game.add.sprite(0,0,"sticker");
        chooseField.addChild(this.batSticker);
        this.batSticker.x = chooseField.width - this.batSticker.width;
        this.batSticker.y = -20 * scaleRatio;

        this.updateBatInfo();
    },

    selectButButton : function()
    {
        console.log("select bat button click");
        WindowManager.chooseBatWindow(this.game, function(){
            game.state.getCurrentState().self.UpdateScreen();
        });
    },

    createPlayButton : function()
    {
        this.playButton = this.add.button(this.world.centerX, this.world.centerY + 400 *scaleRatio, 'btn_green_big', this.startGame, this);
        this.playButton.x -= (this.playButton.width / 2) * scaleRatio;
        var text = this.add.text(0, 0, "Play!", {font: "80px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = this.playButton.width / 2;
        text.y = this.playButton.height / 2;
        this.playButton.addChild(text);
        this.playButton.scale.set(scaleRatio);
    },

    CreateGatchButton : function()
    {
        var gatchaButton = this.add.button(0,0, 'icon_prize', this.clickGatchaButton, this);
        let text = this.add.text(0, 0, "Get Free!", {font: "70px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = gatchaButton.width / 2;
        text.y = gatchaButton.height - text.height / 2;
        text.setShadow(2,-2, 'rgba(0,0,0,1)', 0);

        gatchaButton.addChild(text);

        gatchaButton.scale.set(scaleRatio);

        gatchaButton.x = this.world.width - gatchaButton.width - gatchaButton.width / 4;
        gatchaButton.y = this.world.height - gatchaButton.height - gatchaButton.height / 4;

        this.gatchaTimer = text;
        game.state.getCurrentState().self.drawGatchaTimer();

    },

    clickGatchaButton : function()
    {
        WindowManager.ShowGatchaWindow(this.game,function(){
            game.state.getCurrentState().self.UpdateScreen();
        });
    },

    startGame: function (btn) {
         WindowManager.DifficultyWindow(game, game.state.getCurrentState().self.startBattle);
    },


    startBattle : function (skill, window, context)
    {
        console.log("selected skill :" + skill);
        window.destroy();
        UserData.SetCurrentSkill(skill);
        game.state.getCurrentState().self.clearTimer();
        game.state.start('Game');

    },

    clearTimer : function(){
        window.clearInterval(game.state.getCurrentState().self.interval)
    },

    startInterval : function(){
        game.state.getCurrentState().self.interval = window.setInterval(this.tickInterval, 1000);
    },

    tickInterval : function(){
        game.state.getCurrentState().self.drawGatchaTimer();
    },

    drawGatchaTimer : function(){
        let timer = game.state.getCurrentState().self.gatchaTimer;

        if(timer === undefined)
            return;

        if(Gatcha.CanOpenBox())
        {
            timer.text = Settings.locale.GET_FREE;
        }else {
            //draw timer
            timer.text = Gatcha.GetTimeToEnd().toHHMMSS();
        }
    }

};