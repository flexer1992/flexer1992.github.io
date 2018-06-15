var _windowManager;
_windowManager = function () {
    var self = this;

    this.Show = function (context) {


    };


    //вернет бвзовую структуру для окна
    this.GetBaseContainer = function (context, title, type, onClose) {
        var container = context.add.group();

        var shadow = context.add.tileSprite(0, 0, context.width, context.height, 'field_biege');
        shadow.tint = 0x3F9DFC;
        shadow.alpha = 0.4;
        shadow.inputEnabled = true;

        container.addChild(shadow);

        var windowContainer = context.add.group();
        var bg = context.add.sprite(0, 0, "popup_bg");
        windowContainer.add(bg);

        if (type === "red") {
            var redHeader = context.add.sprite(0, 0, "red_header");
            windowContainer.addChild(redHeader);
            redHeader.x = (windowContainer.width - redHeader.width) / 2;
        }

        if (type === "green") {
            var greenHeader = context.add.sprite(0, 0, "green_header");
            windowContainer.addChild(greenHeader);
            greenHeader.x = (windowContainer.width - greenHeader.width) / 2;
        }

        container.addChild(windowContainer);

        windowContainer.x = (container.width - windowContainer.width) / 2;
        windowContainer.y = (container.height - windowContainer.height) / 2;

        // build title
        var text = context.add.text(0, 0, title, {font: "60px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = windowContainer.width / 2;
        text.y = 90;
        text.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        windowContainer.addChild(text);

        var closeButton = context.add.button(0, 0, "btn_close", function () {
            container.destroy();
            if(onClose != null)
            {
                onClose();
            }

        }, context);

        windowContainer.addChild(closeButton);

        closeButton.x = windowContainer.width - closeButton.width * 2;
        closeButton.y = closeButton.height + 10;

        return container;
    };


    this.DifficultyWindow = function (context, action) {
        var container = this.GetBaseContainer(context, "CHOOSE DIFFICULTY");

        var infoText = UiFactory.CreateText(context, "Choose how cool your skills are!", 50);
        infoText.fill = "#8987B9";
        infoText.x = container.width / 2;
        infoText.y = 550;
        container.addChild(infoText);

        var startPosition = 610;

        for (var i = 0; i < 4; i++) {

            var button = UiFactory.CreateButton(context, "btn_green", selectSkill);
            button.variable = i;

            function selectSkill(btn) {
                action(btn.variable, container, context);
            }

            button.x = (container.width - button.width) / 2;
            button.y = startPosition + button.height * i + 55 * i;

            var buttonLabel;

            switch (i) {
                case 0:
                    buttonLabel = "Easy";
                    break;
                case 1:
                    buttonLabel = "Medium";
                    break;
                case 2:
                    buttonLabel = "Hard";
                    break;
                case 3:
                    buttonLabel = "Ultra Hard";
                    break;
                default:
                    buttonLabel = "none";
            }


            var buttonText = UiFactory.CreateText(context, buttonLabel, 60);
            button.addChild(buttonText);
            buttonText.x = button.width / 2;
            buttonText.y = button.height / 2;
            buttonText.fill = "#FFFFFF";

            container.addChild(button);

        }

        return container;
    };

    // победил или проиграл /контекст/ рестарт или реванш/ расшарить
    this.endBattleWindow = function(params, context, restartAction, shareAction){
        var container = null;

        if(params.winner)
        {
            container = this.GetBaseContainer(context, "VICTORY!", "green");
        }else {
            container = this.GetBaseContainer(context, "DEFEAT!", "red");
        }

        var infoText = UiFactory.CreateText(context, "Score:", 50);
        infoText.fill = "#BDBDD1";
        infoText.x = container.width / 2;
        infoText.y = 550;
        container.addChild(infoText);
        // блок с очками

        var score = context.add.sprite(0,0, "sun_bg");
        score.tint = 0xF3F2FF;

        score.x = container.width / 2 - score.width / 2;
        score.y = container.height / 2 - score.height;

        var circle = context.add.sprite(0,0,"circle_bg");
        score.addChild(circle);
        circle.x = score.width / 2 - circle.width / 2;
        circle.y =  score.height / 2 - circle.height / 2;
        circle.tint = 0xDFE1F9;

        var scoreLabel = UiFactory.CreateText(context, params.yourScore + ":" + params.enemyScore, 200);
        circle.addChild(scoreLabel);
        scoreLabel.fill = "#FECB2F";
        scoreLabel.x = circle.width / 2;
        scoreLabel.y = circle.height / 2;
        scoreLabel.setShadow(3,-3, "#6F6FAC");

        //share button
        var button = UiFactory.CreateButton(context, "btn_blue", shareAction);

        var buttonText = UiFactory.CreateText(context, "Share", 60);
        button.addChild(buttonText);
        buttonText.x = button.width / 2 + 30;
        buttonText.y = button.height / 2;
        buttonText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        buttonText.fill = "#FFFFFF";
        button.x = (container.width - button.width) / 2;
        button.y = container.height / 2 + 450;

        var fbIcon = context.add.sprite(0,0, "fb_icon");
        button.addChild(fbIcon);
        fbIcon.y = button.height / 2 - fbIcon.height / 2;
        fbIcon.x = button.width / 2 - fbIcon.width * 2;

        container.addChild(button);

        // restart button
        var buttonWidth = 534;
        var buttonHeight = 184;

        var buttonGreen = UiFactory.CreateButton(context, "btn_green", restartAction);
        buttonGreen.width = buttonWidth;
        buttonGreen.height = buttonHeight;

        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 200;

        var text = "RESTART";

        if(!params.winner)
        {
            text = "REVENGE";
        }

        var buttonGreenText = UiFactory.CreateText(context, text, 80);
        buttonGreen.addChild(buttonGreenText);

        if(!params.winner)
        {

            var playIcon = context.add.sprite(0,0, "youtube_icon");
            buttonGreen.addChild(playIcon);
            playIcon.y = buttonGreen.height / 2 - playIcon.height / 2;
            playIcon.x = buttonGreen.width / 2 - playIcon.width * 2;


            buttonGreenText.x = buttonWidth / 2 + 100;
        }else {
            buttonGreenText.x = buttonGreen.width / 2 + 30;
        }

        buttonGreenText.y = buttonGreen.height / 2;
        buttonGreenText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        buttonGreenText.fill = "#FFFFFF";


        // add money container


        var moneyBg = context.add.sprite(0,0,"money_bg");

        moneyBg.tint = 0xF3F2FF;


        var money_icon = context.add.sprite(0,0, "icon_coin");
        moneyBg.addChild(money_icon);
        money_icon.y = (moneyBg.height - money_icon.height) / 2;
        money_icon.x = 10;

        // TODO передавать значение в текстовое поле что хотим отрисовать
        console.log(params.reward);

        var moneyText = context.add.text(0, 0, params.reward + "", {font: "70px officina_sans", fill: "#6F6FAB"});
        moneyText.anchor.set(0.5, 0.5);

        moneyText.x = moneyBg.width / 2 + money_icon.width / 2;
        moneyText.y = moneyBg.height / 2;
        moneyBg.addChild(moneyText);

        moneyBg.x = (container.width - moneyBg.width) / 2;
        moneyBg.y = container.height / 2 + 50;



        var youtPrizeLabel = UiFactory.CreateText(context, "Your prize:", 50);
        youtPrizeLabel.fill = "#BDBDD1";
        youtPrizeLabel.x = container.width / 2;
        youtPrizeLabel.y = container.height / 2 + 20;
        container.addChild(youtPrizeLabel);


        container.addChild(moneyBg);

        container.addChild(buttonGreen);
        container.addChild(score);


        return container;
    };

    this.chooseBatWindow = function(context){
        var container = this.GetBaseContainer(context, "CHOOSE BAT");

        //share button
        var button = UiFactory.CreateButton(context, "btn_blue", function() {
            console.log("win this bat");
        } );

        var buttonText = UiFactory.CreateText(context, "Win this bat!", 60);
        button.addChild(buttonText);
        buttonText.x = button.width / 2;
        buttonText.y = button.height / 2;
        buttonText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        buttonText.fill = "#FFFFFF";
        button.x = (container.width - button.width) / 2;
        button.y = container.height / 2 + 450;
        container.addChild(button);

        // restart button
        var buttonWidth = 534;
        var buttonHeight = 184;

        var buttonGreen = UiFactory.CreateButton(context, "btn_green", function() {
            console.log("buy this bat");
        });

        buttonGreen.width = buttonWidth;
        buttonGreen.height = buttonHeight;

        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 200;

        var buttonGreenText = UiFactory.CreateText(context, "Buy", 80);
        buttonGreenText.fill = "#0C6E1B";
        buttonGreen.addChild(buttonGreenText);

        buttonGreenText.x = buttonGreen.width / 2 + 30;
        buttonGreenText.y = buttonGreen.height / 2 - 40;

        // add money container
        var moneyContainer = context.add.group();
        var money_icon = context.add.sprite(0,0, "icon_coin");
        moneyContainer.add(money_icon);
        money_icon.x = 0;
        money_icon.y = 0;

        // TODO передавать значение в текстовое поле что хотим отрисовать
        var moneyText = context.add.text(0, 0, "2000", {font: "70px officina_sans", fill: "#FFFFFF"});
        moneyContainer.addChild(moneyText);
        moneyText.x = money_icon.width + 10;
        moneyText.y = moneyContainer.height / 2 - moneyText.height / 2;

        buttonGreen.addChild(moneyContainer);
        moneyContainer.x = buttonGreen.width / 2 - moneyContainer.width / 2;
        moneyContainer.y = buttonGreen.height / 2 - 10;

        var InfoUserLabel = UiFactory.CreateText(context, "Choose your bat or buy new! \n Swipe left and right.", 50);
        InfoUserLabel.fill = "#7C7CB0";
        InfoUserLabel.align = "center";
        InfoUserLabel.x = container.width / 2;
        InfoUserLabel.y = container.height / 2 - 400;
        container.addChild(InfoUserLabel);


        // draw list ----


        container.addChild(buttonGreen);
        return container;

    };

    // показать окно гачи
    this.ShowGatchaWindow = function(context){

        var container = this.GetBaseContainer(context, "GATCHA!", null, OnCLose);

        //share button
        var button = UiFactory.CreateButton(context, "btn_blue", function() {
            console.log("win this bat");
        } );

        var buttonText = UiFactory.CreateText(context, "Win this bat!", 60);
        button.addChild(buttonText);
        buttonText.x = button.width / 2;
        buttonText.y = button.height / 2;
        buttonText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        buttonText.fill = "#FFFFFF";
        button.x = (container.width - button.width) / 2;
        button.y = container.height / 2 + 450;
        container.addChild(button);

        // restart button
        var buttonWidth = 534;
        var buttonHeight = 184;

        var buttonGreen = UiFactory.CreateButton(context, "btn_green", function() {
            console.log("buy this bat");
        });

        buttonGreen.width = buttonWidth;
        buttonGreen.height = buttonHeight;

        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 200;

        var buttonGreenText = UiFactory.CreateText(context, "Buy", 80);
        buttonGreenText.fill = "#0C6E1B";
        buttonGreen.addChild(buttonGreenText);

        buttonGreenText.x = buttonGreen.width / 2 + 30;
        buttonGreenText.y = buttonGreen.height / 2 - 40;

        // add money container
        var moneyContainer = context.add.group();
        var money_icon = context.add.sprite(0,0, "icon_coin");
        moneyContainer.add(money_icon);
        money_icon.x = 0;
        money_icon.y = 0;

        // TODO передавать значение в текстовое поле что хотим отрисовать
        var moneyText = context.add.text(0, 0, "2000", {font: "70px officina_sans", fill: "#FFFFFF"});
        moneyContainer.addChild(moneyText);
        moneyText.x = money_icon.width + 10;
        moneyText.y = moneyContainer.height / 2 - moneyText.height / 2;

        buttonGreen.addChild(moneyContainer);
        moneyContainer.x = buttonGreen.width / 2 - moneyContainer.width / 2;
        moneyContainer.y = buttonGreen.height / 2 - 10;

        var InfoUserLabel = UiFactory.CreateText(context, "Choose your bat or buy new! \n Swipe left and right.", 50);
        InfoUserLabel.fill = "#7C7CB0";
        InfoUserLabel.align = "center";
        InfoUserLabel.x = container.width / 2;
        InfoUserLabel.y = container.height / 2 - 400;
        container.addChild(InfoUserLabel);

        var gatchaContainer = context.add.group();

        var prizeImage = context.add.sprite(0,0, "gatcha_box");
        gatchaContainer.addChild(prizeImage);


        var progress = context.add.group();

        var preloader_bg = context.add.sprite(0, 0, "prbar_bg");
        progress.addChild(preloader_bg);

        var preloadBar = context.add.sprite(0, 0, "prbar_color");
        preloadBar.tint = 0x3f9dfc;
        progress.addChild(preloadBar);

        gatchaContainer.addChild(progress);

        progress.x = gatchaContainer.width / 2 - progress.width / 2;
        progress.y = prizeImage.height;


        prizeImage.x = gatchaContainer.width / 2 - prizeImage.width / 2;

        container.addChild(gatchaContainer);

        gatchaContainer.x = container.width/2 - gatchaContainer.width / 2;
        gatchaContainer.y = container.height / 2 - gatchaContainer.height / 2 - 100;

        var mask = context.add.graphics(gatchaContainer.width / 2 + 40, gatchaContainer.y + prizeImage.height);
        mask.beginFill(0xffffff);
        mask.drawRect(0,0, preloadBar.width, preloadBar.height);
        mask.endFill();
        preloadBar.mask = mask;
        mask.scale.set(0.2, 1);

        var progressText = UiFactory.CreateText(context, "00:00:35", 50);
        progressText.fill = "#FFFFFF";
        progressText.align = "center";
        progressText.x = progress.width / 2;
        progressText.y = progress.height / 2;
        progress.addChild(progressText);

        var completeIcon = context.add.sprite(0,0, "");

        container.addChild(buttonGreen);


        function OnCLose(){
            mask.destroy();
        }

        return container;
    };

};

var WindowManager = new _windowManager();