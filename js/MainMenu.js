
BasicGame.MainMenu = function (game) {
    let _this = this;

    this.self = this;
    //this.music = null;
    //this.playButton = null;
    this.templateWindow = null;

    this.moneyText = {};
    this.batImage = {};
    this.fieldImage = {};

};

BasicGame.MainMenu.prototype = {

    create: function () {
        this.drawBackground();
        this.drawMoneyContainer();
        this.drawChooseFieldButton();
        this.drawChooseButButton();
        this.createPlayButton();
        this.CreateGatchButton();
    },

    drawMoneyContainer : function()
    {
        var moneyBg = this.add.sprite(0,0,"money_bg");

        moneyBg.tint = 0x042C66;

        var money_icon = this.add.sprite(0,0, "icon_coin");
        moneyBg.addChild(money_icon);
        money_icon.y = (moneyBg.height - money_icon.height) / 2;
        money_icon.x = 10;

        // TODO передавать значение в текстовое поле что хотим отрисовать
        var text = this.add.text(0, 0, "99999", {font: "70px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);

        text.x = moneyBg.width / 2 + money_icon.width / 2;
        text.y = moneyBg.height / 2;
        moneyBg.addChild(text);

        this.moneyText = text;

        moneyBg.scale.set(scaleRatio);
        moneyBg.x = (this.world.width - moneyBg.width) / 2;
        moneyBg.y = 650 * scaleRatio;

        this.updateMoneyInfo();
    },

    updateMoneyInfo : function(){
        this.moneyText.text = UserData.CurrentMoney();
    },

    drawBackground : function()
    {
        var back = this.add.sprite(0,0, "main_bg");
        back.width = this.world.width;
        back.height = this.world.height;

        // //draw cloud
        var cloudLeft = this.add.sprite(0,0,"cloud_2");
        cloudLeft.y = this.world.height - cloudLeft.height;

        cloudLeft.tint = 0x82befa;

        var cloudright = this.add.sprite(0,0, "cloud_1");
        cloudright.x = this.world.width - cloudright.width;
        cloudright.y = this.world.height - cloudright.height;

        cloudright.tint = 0x82befa;
        //
        // // draw logo
        var logo = this.add.sprite(0,0, "logo");

        logo.scale.set(scaleRatio);

        logo.x = (this.world.width - logo.width) * 0.5;
        logo.y = logo.height / 4;

    },


    // TODO надо будет как-то учитывать какие поля выбраны сейчас у юзера
    drawChooseFieldButton : function()
    {

        let chooseField = this.game.add.group();

        let button_back = this.add.button(0,0, "main_btn", this.selectFieldButtonClick, this);
        button_back.scale.set(-1, 1);

        chooseField.add(button_back);

        button_back.y =  0;
        button_back.x = -button_back.width/2 - 100;


        this.fieldImage = this.add.sprite(0,0, "soccer_field");

        chooseField.add(this.fieldImage);
        // this.fieldImage.x = chooseField.width - this.fieldImage.width + 10;
        this.fieldImage.x = -chooseField.width / 2 + this.fieldImage.width / 2 - 20;
        this.fieldImage.y = chooseField.height / 2 - this.fieldImage.height / 2- 4;

        let item_name = this.add.text(0, 0, Settings.locale.SELECT_LABEL, {font: "50px officina_sans", fill: "#E14B1A"});
        item_name.anchor.set(0.5, 0.5);
        item_name.scale.set(-1,1);

        button_back.addChild(item_name);

        item_name.x = -button_back.width / 2;
        item_name.y = button_back.height - item_name.height;


        chooseField.scale.set(scaleRatio);

        chooseField.x = this.world.width / 2 -  180 * scaleRatio;//- chooseField.width / 2 + 60* scaleRatio;
        chooseField.y = this.world.height / 2 - chooseField.height / 4;

        this.updateFieldInfo();
    },

    updateFieldInfo : function(){
        let curField = UserData.GetCurrentField();
        this.fieldImage.loadTexture(curField.icon);
    },

    updateBatInfo : function(){
        let curBat = UserData.GetCurrentBat();
        this.batImage.loadTexture(curBat.icon);
    },

    selectFieldButtonClick : function()
    {
        console.log('select field button click');
        WindowManager.ChooseFieldWindow(this.game);
    },

    //TODO учитывать выбранную пользователем биту
    drawChooseButButton : function()
    {
        let chooseField = this.game.add.group();

        let button_back = this.add.button(0,0, "main_btn", this.selectButButton, this);

        chooseField.add(button_back);

        button_back.y = 0;
        button_back.x = -button_back.width/2;

        chooseField.x = this.world.width / 2 + button_back.width / 2 + 30;
        chooseField.y = this.world.height / 2 - chooseField.height / 4;

        this.batImage = this.add.sprite(0,0, "hockey_bat_blue");

        chooseField.add(this.batImage);
        this.batImage.x = -chooseField.width / 2 + this.batImage.width / 2 + 10;
        this.batImage.y = chooseField.height / 2 - this.batImage.height / 2- 4;

        let item_name = this.add.text(0, 0, Settings.locale.SELECT_LABEL, {font: "50px officina_sans", fill: "#E14B1A"});
        item_name.anchor.set(0.5, 0.5);

        button_back.addChild(item_name);

        item_name.x = button_back.width / 2;
        item_name.y = button_back.height - item_name.height;

        chooseField.scale.set(scaleRatio);

        chooseField.x = this.world.width / 2 + chooseField.width / 2 + 60* scaleRatio;
        chooseField.y = this.world.height / 2 - chooseField.height / 4;

        this.updateBatInfo();
    },

    selectButButton : function()
    {
        console.log("select bat button click");
        WindowManager.chooseBatWindow(this.game, this.startGame);
    },

    createPlayButton : function()
    {
        this.playButton = this.add.button(this.world.centerX, this.world.centerY + 400 *scaleRatio, 'btn_green', this.startGame, this);
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
        var text = this.add.text(0, 0, "Get Free!", {font: "70px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = gatchaButton.width / 2;
        text.y = gatchaButton.height - text.height / 2;
        text.setShadow(2,-2, 'rgba(0,0,0,1)', 0);

        gatchaButton.addChild(text);

        gatchaButton.scale.set(scaleRatio);

        gatchaButton.x = this.world.width - gatchaButton.width - gatchaButton.width / 4;
        gatchaButton.y = this.world.height - gatchaButton.height - gatchaButton.height / 4;

    },

    clickGatchaButton : function()
    {
        var gatchaWindow = WindowManager.ShowGatchaWindow(this.game);
    },

    startGame: function (btn) {
         WindowManager.DifficultyWindow(game, game.state.getCurrentState().self.startBattle);
    },


    startBattle : function (skill, window, context)
    {
        console.log("selected skill :" + skill);
        window.destroy();
        UserData.SetCurrentSkill(skill);
        game.state.start('Game');
    }
};