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
        bg.scale.set(scaleRatio);
        windowContainer.add(bg);

        if (type === "red") {
            var redHeader = context.add.sprite(0, 0, "red_header");
            redHeader.scale.set(scaleRatio);
            windowContainer.addChild(redHeader);
            redHeader.x = (windowContainer.width - redHeader.width) / 2;
        }

        if (type === "green") {
            var greenHeader = context.add.sprite(0, 0, "green_header");
            greenHeader.scale.set(scaleRatio);
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
        text.y = 90 * scaleRatio;
        text.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        text.scale.set(scaleRatio);
        windowContainer.addChild(text);

        var closeButton = context.add.button(0, 0, "btn_close", function () {
            container.destroy();
            if(onClose != null)
            {
                onClose();
            }

        }, context);

        closeButton.scale.set(scaleRatio);

        windowContainer.addChild(closeButton);

        closeButton.x = windowContainer.width - closeButton.width * 2;
        closeButton.y = closeButton.height + 10;

        return container;
    };


    this.DifficultyWindow = function (context, action) {
        var container = this.GetBaseContainer(context, "CHOOSE DIFFICULTY");

        var infoText = UiFactory.CreateText(context, "Choose how cool your skills are!", 50);
        infoText.scale.set(scaleRatio);
        infoText.fill = "#8987B9";
        infoText.x = container.width / 2;
        infoText.y =  container.height / 2 - 420 * scaleRatio;
        container.addChild(infoText);

        var startPosition = container.height/ 2 - 350 * scaleRatio;

        for (var i = 0; i < 4; i++) {

            var button = UiFactory.CreateButton(context, "btn_green", selectSkill);
            button.variable = i;

            function selectSkill(btn) {
                action(btn.variable, container, context);
            }

            let buttonLabel;

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

            button.scale.set(scaleRatio);

            button.x = (container.width - button.width) / 2;
            button.y = startPosition + button.height * i + 55 * scaleRatio * i;

            container.addChild(button);

        }

        return container;
    };

    // победил или проиграл /контекст/ рестарт или реванш/ расшарить
    this.endBattleWindow = function(params, context){
        var container = null;

        function OnCloseWindow(){
            if(params.OnClose !== undefined) params.OnClose(context);
        }


        if(params.winner)
        {
            container = this.GetBaseContainer(context, "VICTORY!", "green", OnCloseWindow);
        }else {
            container = this.GetBaseContainer(context, "DEFEAT!", "red", OnCloseWindow);
        }

        var infoText = UiFactory.CreateText(context, "Score:", 50);
        infoText.fill = "#BDBDD1";
        infoText.x = container.width / 2;

        infoText.y = container.height / 2 - 440 * scaleRatio;
        infoText.scale.set(scaleRatio);

        container.addChild(infoText);
        // блок с очками

        var score = context.add.sprite(0,0, "sun_bg");
        score.tint = 0xF3F2FF;

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

        score.scale.set(scaleRatio);

        score.x = container.width / 2 - score.width / 2;
        score.y = container.height / 2 - score.height - 20 * scaleRatio;



        function OnShare(){

        }

        //share button
        var button = UiFactory.CreateButton(context, "btn_blue", OnShare);

        var buttonText = UiFactory.CreateText(context, "Share", 60);
        button.addChild(buttonText);
        buttonText.x = button.width / 2 + 30;
        buttonText.y = button.height / 2;
        buttonText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        buttonText.fill = "#FFFFFF";


        var fbIcon = context.add.sprite(0,0, "fb_icon");
        button.addChild(fbIcon);
        fbIcon.y = button.height / 2 - fbIcon.height / 2;
        fbIcon.x = button.width / 2 - fbIcon.width * 2;

        button.scale.set(scaleRatio);
        button.x = (container.width - button.width) / 2;
        button.y = container.height / 2 + 450 * scaleRatio;

        container.addChild(button);

        // restart button
        var buttonWidth = 534;
        var buttonHeight = 184;

        function OnRestart(){
            if(params.winner){
                params.OnRestart(context);
            }else {
                params.OnRevange(context);
            }
        }


        var buttonGreen = UiFactory.CreateButton(context, "btn_green", OnRestart);
        buttonGreen.width = buttonWidth;
        buttonGreen.height = buttonHeight;

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

        buttonGreen.scale.set(scaleRatio);
        buttonGreen.width = buttonWidth * scaleRatio;
        buttonGreen.height = buttonHeight * scaleRatio;

        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 200 * scaleRatio;


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

        moneyBg.scale.set(scaleRatio);

        moneyBg.x = (container.width - moneyBg.width) / 2;
        moneyBg.y = container.height / 2 + 50 * scaleRatio;



        var youtPrizeLabel = UiFactory.CreateText(context, "Your prize:", 50);
        youtPrizeLabel.fill = "#BDBDD1";
        youtPrizeLabel.x = container.width / 2;
        youtPrizeLabel.y = container.height / 2 + 20 * scaleRatio;
        youtPrizeLabel.scale.set(scaleRatio);
        container.addChild(youtPrizeLabel);


        container.addChild(moneyBg);

        container.addChild(buttonGreen);
        container.addChild(score);


        return container;
    };

    this.chooseBatWindow = function(context, onWinBat){
        let container = this.GetBaseContainer(context, "CHOOSE BAT", null , OnCloseWindow);

        //share button
        let button = UiFactory.CreateButton(context, "btn_blue", function() {
            OnCloseWindow();
            container.destroy();
            onWinBat(context);
        } );

        let buttonText = UiFactory.CreateText(context, "Win this bat!", 60);
        button.addChild(buttonText);

        buttonText.x = button.width / 2;
        buttonText.y = button.height / 2;
        buttonText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        buttonText.fill = "#FFFFFF";

        button.scale.set(scaleRatio);

        button.x = (container.width - button.width) / 2;
        button.y = container.height / 2 + 450 * scaleRatio;
        container.addChild(button);

        // restart button
        let buttonWidth = 534;
        let buttonHeight = 184;

        let buttonGreen = UiFactory.CreateButton(context, "btn_green", function() {
            console.log("buy this bat");
        });

        buttonGreen.width = buttonWidth;
        buttonGreen.height = buttonHeight;

        let buttonGreenText = UiFactory.CreateText(context, "Buy", 80);
        buttonGreenText.fill = "#0C6E1B";
        buttonGreen.addChild(buttonGreenText);

        buttonGreenText.x = buttonGreen.width / 2 + 30;
        buttonGreenText.y = buttonGreen.height / 2 - 40;



        let equipLabel = UiFactory.CreateText(context, Settings.locale.EQUIP_BAT, 80);
        equipLabel.fill = "#FFFFFF";
        buttonGreen.addChild(equipLabel);

        equipLabel.x = buttonGreen.width / 2 + 30;
        equipLabel.y = buttonGreen.height / 2;


        // add money container
        let moneyContainer = context.add.group();
        let money_icon = context.add.sprite(0,0, "icon_coin");
        moneyContainer.add(money_icon);
        money_icon.x = 0;
        money_icon.y = 0;

        // TODO передавать значение в текстовое поле что хотим отрисовать
        let moneyText = context.add.text(0, 0, "2000", {font: "70px officina_sans", fill: "#FFFFFF"});
        moneyContainer.addChild(moneyText);
        moneyText.x = money_icon.width + 10;
        moneyText.y = moneyContainer.height / 2 - moneyText.height / 2;

        buttonGreen.addChild(moneyContainer);
        moneyContainer.x = buttonGreen.width / 2 - moneyContainer.width / 2;
        moneyContainer.y = buttonGreen.height / 2 - 10;


        let InfoUserLabel = UiFactory.CreateText(context, "Choose your bat or buy new! \n Click left and right.", 50);
        InfoUserLabel.fill = "#7C7CB0";
        InfoUserLabel.align = "center";
        InfoUserLabel.x = container.width / 2;
        InfoUserLabel.y = container.height / 2 - 400 * scaleRatio;

        InfoUserLabel.scale.set(scaleRatio);

        container.addChild(InfoUserLabel);


        buttonGreen.scale.set(scaleRatio);
        buttonGreen.width = buttonWidth * scaleRatio;
        buttonGreen.height = buttonHeight * scaleRatio;
        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 200 * scaleRatio;


        let currentBatIndex = 0;

        let listContent = [];
        let userBats = UserData.GetUserBats();
        let settingsBats =[];

        for(let i = 0; i < Settings.bats.length; i++)
        {
            if(Settings.bats[i].isPlayer)
            {
                settingsBats.push(Settings.bats[i]);
            }
        }

        let sliderWidth = 800 * scaleRatio;
        let sliderHeight = 450 * scaleRatio;

        for (let i = 0; i < settingsBats.length; i++)
        {
            let settingsBat = settingsBats[i];
            let group = context.add.group();
            let batImage = context.add.image(0,0, settingsBat.icon);
            group.addChild(batImage);

            batImage.scale.setTo(1.5 * scaleRatio);

            batImage.x = sliderWidth / 2 - batImage.width/2;
            batImage.y = 0;

            let nameLabel = UiFactory.CreateText(context, settingsBat.name, 50);
            nameLabel.fill = "#6F6FAC";
            nameLabel.align = "center";

            group.addChild(nameLabel);

            nameLabel.x = sliderWidth / 2;
            nameLabel.y = batImage.y + batImage.height + 40 * scaleRatio;
            nameLabel.scale.set(scaleRatio);
            listContent.push(group);
        }

        // draw list ----
        let slider = new phaseSlider(context);
        drawButtons();
        slider.createSlider({
            customSliderBG: false,
            sliderBGAlpha: 0,
            customHandleNext: "btn_arrow",
            customHandlePrev: "btn_arrow_left",
            x : container.width / 2 - sliderWidth / 2,
            y : container.height / 2 - 300 * scaleRatio,
            objects:listContent,
            width : sliderWidth,
            height : sliderHeight,

            onNextCallbackNew : function() {
                currentBatIndex++;
                drawButtons();
            },

            onPrevCallbackNew : function(){
                currentBatIndex--;
                drawButtons();
            },

        });

        // перерисовываем контейнер с кнопками
        function drawButtons() {
            if(currentBatIndex >= settingsBats.length){
                currentBatIndex = settingsBats.length - 1;
            }

            if(currentBatIndex < 0) currentBatIndex = 0;


            let currBat = settingsBats[currentBatIndex];
            moneyText.text = currBat.price;
            moneyContainer.x = (buttonGreen.width / 2) / scaleRatio - moneyContainer.width / 2;


            if(UserData.ContainsBat(currBat.id))
            {
                // прячем кнопку вин и вместо прайса рисуем EQUIP
                button.alpha = 0;
                moneyContainer.alpha = 0;
                buttonGreenText.alpha = 0;
                equipLabel.alpha = 1;

            }else {
                button.alpha = 1;
                equipLabel.alpha = 0;
                moneyContainer.alpha = 1;
                buttonGreenText.alpha = 1;
            }
        }


        function OnCloseWindow() {
            slider.destroy();
        }

        container.addChild(buttonGreen);



        return container;

    };


    this.ChooseFieldWindow = function(context){
        let container = this.GetBaseContainer(context, "CHOOSE FIELD", null , OnCloseWindow);

        //share button
        let button = UiFactory.CreateButton(context, "btn_blue", function() {
            console.log("win this bat");
        } );

        let buttonText = UiFactory.CreateText(context, "Equip", 60);
        button.addChild(buttonText);
        buttonText.x = button.width / 2;
        buttonText.y = button.height / 2;
        buttonText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        buttonText.fill = "#FFFFFF";

        button.scale.set(scaleRatio);

        button.x = (container.width - button.width) / 2;
        button.y = container.height / 2 + 450 * scaleRatio;
        container.addChild(button);

        button.loadTexture("btn_violet");

        // restart button
        let buttonWidth = 534;
        let buttonHeight = 184;


        let InfoUserLabel = UiFactory.CreateText(context, "Progressing the game, you open \n new fields. Click left and right.", 50);
        InfoUserLabel.fill = "#7C7CB0";
        InfoUserLabel.align = "center";
        InfoUserLabel.x = container.width / 2;
        InfoUserLabel.y = container.height / 2 - 400 * scaleRatio;
        InfoUserLabel.scale.set(scaleRatio);
        container.addChild(InfoUserLabel);

        let currentFieldIndex = 0;

        let listContent = [];

        let userBats = UserData.GetUserBats();
        let settingsFields =[];

        for(let i = 0; i < Settings.fields.length; i++)
        {
            settingsFields.push(Settings.fields[i]);
        }

        let sliderWidth = 800 * scaleRatio;
        let sliderHeight = 450 * scaleRatio;

        for (let i = 0; i < settingsFields.length; i++)
        {
            let settingsField = settingsFields[i];
            let group = context.add.group();
            let batImage = context.add.image(0,0, settingsField.icon);
            group.addChild(batImage);

            batImage.scale.setTo(1.5 * scaleRatio);

            batImage.x = sliderWidth / 2 - batImage.width/2;
            batImage.y = 0;

            let nameLabel = UiFactory.CreateText(context, settingsField.name, 50);
            nameLabel.fill = "#6F6FAC";
            nameLabel.align = "center";

            group.addChild(nameLabel);

            nameLabel.x = sliderWidth / 2;
            nameLabel.y = batImage.y + batImage.height + 40 * scaleRatio;
            nameLabel.scale.set(scaleRatio);
            listContent.push(group);
        }


        // draw progress

        let progress = context.add.group();

        let preloader_bg = context.add.sprite(0, 0, "prbar_bg");
        progress.addChild(preloader_bg);

        let preloadBar = context.add.sprite(0, 0, "prbar_color");
        preloadBar.tint = 0x3f9dfc;
        progress.addChild(preloadBar);

        container.addChild(progress);

        let progressText = UiFactory.CreateText(context, "00:00:35", 50);
        progressText.fill = "#FFFFFF";
        progressText.align = "center";
        progressText.x = progress.width / 2;
        progressText.y = progress.height / 2;
        progress.addChild(progressText);

        progress.scale.set(scaleRatio);

        progress.x = container.width / 2 - progress.width / 2;
        progress.y = container.height / 2 + 280 * scaleRatio;


        let mask = context.add.graphics(progress.x, progress.y);
        mask.beginFill(0xffffff);
        mask.drawRect(0,0, preloadBar.width, preloadBar.height);
        mask.endFill();
        preloadBar.mask = mask;
        mask.scale.set(0.2, 1);


        let progressTitle = UiFactory.CreateText(context, "Win counter", 50);
        progressTitle.fill = "#7C7CB0";
        progressTitle.align = "center";
        progressTitle.x = container.width / 2;
        progressTitle.y = progress.y - 50 * scaleRatio;
        progressTitle.scale.set(scaleRatio);
        container.addChild(progressTitle);


        // draw progress end

        // draw list ----
        let slider = new phaseSlider(context);
        drawButtons();
        slider.createSlider({
            customSliderBG: false,
            sliderBGAlpha: 0,
            customHandleNext: "btn_arrow",
            customHandlePrev: "btn_arrow_left",
            x : container.width / 2 - sliderWidth / 2,
            y : container.height / 2 - 300 * scaleRatio,
            objects:listContent,
            width : sliderWidth,
            height : sliderHeight,

            onNextCallbackNew : function() {
                currentFieldIndex++;
                drawButtons();
            },

            onPrevCallbackNew : function(){
                currentFieldIndex--;
                drawButtons();
            },

        });

        // перерисовываем контейнер с кнопками
        function drawButtons() {
            if(currentFieldIndex >= listContent.length) currentFieldIndex = listContent.length - 1;
            if(currentFieldIndex < 0) currentFieldIndex = 0;

            let settingsField = settingsFields[currentFieldIndex];

            let fieldProgress = UserData.GetWinCounter() / settingsField.totalWins;

            // если оно у нас и было хоть раз выбрано, то не рисуем прогрессбарчик
            if(UserData.ContainsField(settingsField.id) || settingsField.starter)
            {
                progress.alpha = 0;
                progressTitle.alpha = 0;
            }else {
                progressTitle.alpha = 1;
                progress.alpha = 1;
                progressText.text = UserData.GetWinCounter() + "/" + settingsField.totalWins;
                mask.scale.set(fieldProgress,1);
            }


            if(fieldProgress < 1 && !settingsField.starter)
            {
                button.loadTexture("btn_violet");
                button.scale.set(scaleRatio);

                buttonText.text = Settings.locale.LOCKED_FIELD;
                buttonText.x = (button.width / 2) / scaleRatio;
                buttonText.y = (button.height / 2) / scaleRatio;
            }
            else
            {
                button.loadTexture("btn_green");

                button.width = buttonWidth * scaleRatio;
                button.height = buttonHeight * scaleRatio;

                buttonText.text = Settings.locale.EQUIP_FIELD;

                buttonText.x = (button.width / 2) / scaleRatio + buttonText.width / 4;
                buttonText.y = (button.height / 2) / scaleRatio + buttonText.height / 6;

            }


            // зеленая или серая кнопка и текст
            if(UserData.ContainsField(settingsField.id)){

            }else{

            }
        }

        function OnCloseWindow() {
            slider.destroy();
            mask.destroy();
        }

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

        button.scale.set(scaleRatio);

        button.x = (container.width - button.width) / 2;
        button.y = container.height / 2 + 450 * scaleRatio;
        container.addChild(button);

        // restart button
        var buttonWidth = 534;
        var buttonHeight = 184;

        var buttonGreen = UiFactory.CreateButton(context, "btn_green", function() {
            console.log("buy this bat");
        });

        buttonGreen.width = buttonWidth;
        buttonGreen.height = buttonHeight;



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
        InfoUserLabel.y = container.height / 2 - 400 * scaleRatio;
        InfoUserLabel.scale.set(scaleRatio);

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

        gatchaContainer.scale.set(scaleRatio);

        gatchaContainer.x = container.width/2 - gatchaContainer.width / 2;
        gatchaContainer.y = container.height / 2 - gatchaContainer.height / 2 - 100 * scaleRatio;

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

        buttonGreen.scale.set(scaleRatio);

        buttonGreen.width = buttonWidth * scaleRatio;
        buttonGreen.height = buttonHeight * scaleRatio;

        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 200 * scaleRatio;

        function OnCLose(){
            mask.destroy();
        }

        return container;
    };

};

let WindowManager = new _windowManager();