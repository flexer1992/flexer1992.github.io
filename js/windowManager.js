var _windowManager;
_windowManager = function () {
    var self = this;

    this.Show = function (context) {


    };


    //вернет бвзовую структуру для окна
    this.GetBaseContainer = function (context, title, type, onClose, footer) {
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
        var text = context.add.text(0, 0, title, {font: "70px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        text.x = windowContainer.width / 2;
        text.y = 100 * scaleRatio;
        text.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        text.scale.set(scaleRatio);
        windowContainer.addChild(text);

        var closeButton = context.add.button(0, 0, "btn_close", function () {
            shadow.inputEnabled = false;
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

        if(footer)
        {
            let footer = context.add.sprite(0,0,"footer");
            footer.scale.set(scaleRatio);
            windowContainer.addChild(footer);
            footer.x = windowContainer.width/ 2 - footer.width / 2;
            footer.y = windowContainer.height - footer.height;
        }

        container.Close = function(){
            shadow.inputEnabled = false;
            container.destroy();
            if(onClose != null)
            {
                onClose();
            }
        };

        return container;
    };


    this.DifficultyWindow = function (context, action) {
        var container = this.GetBaseContainer(context, "CHOOSE DIFFICULTY", null, null, true);

        var infoText = UiFactory.CreateText(context, "Choose how cool your skills are!", 50);
        infoText.scale.set(scaleRatio);
        infoText.fill = "#8987B9";
        infoText.x = container.width / 2;
        infoText.y =  container.height / 2 - 420 * scaleRatio;
        container.addChild(infoText);

        var startPosition = container.height/ 2 - 350 * scaleRatio;

        for (var i = 0; i < 4; i++) {

            var button = UiFactory.CreateButton(context, "btn_green_big", selectSkill);
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


            let buttonText = UiFactory.CreateText(context, buttonLabel, 60);
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
            container = this.GetBaseContainer(context, "VICTORY!", "green", OnCloseWindow, true);
        }else {
            container = this.GetBaseContainer(context, "DEFEAT!", "red", OnCloseWindow, true);
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

    this.chooseBatWindow = function(context, OnClose){
        let container = this.GetBaseContainer(context, "CHOOSE BAT", null , OnCloseWindow, true);

        let buttonGreen = UiFactory.CreateButton(context, "btn_green", function() {
            console.log("buy this bat"); // или покупка или выбор биты

            let currBat = settingsBats[currentBatIndex];

            // если есть то всегда выбираем биту
            if(UserData.ContainsBat(currBat.id))
            {
                UserData.SetCurrentBatId(currBat.id);
            }else{
                // проверяем есть ли деньги, если их нет то хз, пока ничего не делаем? может алерт показать?
                if(UserData.SpendMoney(currBat.price)){
                    UserData.AddBat(currBat.id);
                }else{
                    alert( "Нет денег, магаз будет позже :(" );
                }
            }

            drawButtons();
        });


        let equipLabel = UiFactory.CreateText(context, Settings.locale.EQUIP_BAT, 80);
        equipLabel.fill = "#FFFFFF";
        buttonGreen.addChild(equipLabel);

        equipLabel.x = buttonGreen.width / 2;
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
        moneyContainer.y = buttonGreen.height / 2 - moneyContainer.height / 2;


        let InfoUserLabel = UiFactory.CreateText(context, "Choose your bat or buy new! \n Click left and right.", 50);
        InfoUserLabel.fill = "#7C7CB0";
        InfoUserLabel.align = "center";
        InfoUserLabel.x = container.width / 2;
        InfoUserLabel.y = container.height / 2 - 400 * scaleRatio;

        InfoUserLabel.scale.set(scaleRatio);

        container.addChild(InfoUserLabel);


        buttonGreen.scale.set(scaleRatio);
        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 450 * scaleRatio;


        let currentBatIndex = 0;

        let listContent = [];
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

        // draw progress end
        let list_bg = context.add.sprite(0,0, "list_bg");
        list_bg.scale.set(scaleRatio);
        container.addChild(list_bg);
        list_bg.x = container.width / 2 - list_bg.width / 2;
        list_bg.y = container.height / 2 - 300 * scaleRatio;

        let arrowSticker = context.add.sprite(0,0,"sticker");
        arrowSticker.scale.set(scaleRatio);
        container.addChild(arrowSticker);
        arrowSticker.x = container.width / 2 - arrowSticker.width / 2 + 340 * scaleRatio;
        arrowSticker.y = container.height / 2 - arrowSticker.height / 2 - 200 * scaleRatio;





        let purchaseLabel = UiFactory.CreateText(context, Settings.locale.BUY_BAT, 50);
        purchaseLabel.fill = "#6F6FAC";
        purchaseLabel.align = "center";

        purchaseLabel.x = container.width / 2;
        purchaseLabel.y = container.height / 2 + 360 * scaleRatio;
        purchaseLabel.scale.set(scaleRatio);
        container.addChild(purchaseLabel);


        let nameLabel = UiFactory.CreateText(context, "NAME", 80);
        nameLabel.fill = "#6F6FAC";
        nameLabel.align = "center";

        nameLabel.x = container.width / 2;
        nameLabel.y = container.height / 2 + 240 * scaleRatio;
        nameLabel.scale.set(scaleRatio);
        container.addChild(nameLabel);



        for (let i = 0; i < settingsBats.length; i++)
        {
            let settingsBat = settingsBats[i];
            let group = context.add.group();

            let backIcon = context.add.image(0,0, "circle_bg");
            backIcon.tint = 0xD8D9EC;
            group.addChild(backIcon);
            backIcon.scale.set(scaleRatio);
            backIcon.x = sliderWidth / 2 - backIcon.width / 2;
            backIcon.y = sliderHeight / 2 - backIcon.height / 2;

            let batImage = context.add.image(0,0, settingsBat.icon);
            group.addChild(batImage);

            batImage.scale.setTo(scaleRatio);

            batImage.x = sliderWidth / 2 - batImage.width/2;
            batImage.y = sliderHeight / 2 - batImage.height / 2;

            listContent.push(group);
        }



        let buttonSticker = context.add.sprite(0, 0, "sticker");
        buttonSticker.scale.set(scaleRatio);

        buttonSticker.x = container.width / 2 - buttonSticker.width / 2 + buttonGreen.width / 2 - 20 * scaleRatio;
        buttonSticker.y = container.height / 2 - buttonSticker.height / 2 + 460 * scaleRatio;

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

            arrowSticker.alpha = 0;
            buttonSticker.alpha = 0;


            // проверяем для следующего элемента
            if(currentBatIndex + 1 < settingsBats.length)
            {
                for (let i = currentBatIndex + 1; i < settingsBats.length; i++)
                {
                    let stickerBat = settingsBats[i];

                    // если следующий еще не видели, то рисуем стикер
                    if(UserData.CurrentMoney() - stickerBat.price >= 0)
                    {
                        if(UserData.data.arrowStickersBats.indexOf(stickerBat.id) === -1)
                        {
                            arrowSticker.alpha = 1;
                        }
                    }
                }
            }


            let currBat = settingsBats[currentBatIndex];
            moneyText.text = currBat.price;
            moneyContainer.x = (buttonGreen.width / 2) / scaleRatio - moneyContainer.width / 2;
            nameLabel.text = currBat.name;


            if(UserData.ContainsBat(currBat.id))
            {

                if(currBat.id === UserData.GetCurrentBatId())
                {
                    buttonGreen.loadTexture("btn_violet");
                    equipLabel.text = Settings.locale.EQUIPPED_BAT;
                    purchaseLabel.text = Settings.locale.Equipped_bat;
                }else{

                    buttonGreen.loadTexture("btn_green");
                    equipLabel.text = Settings.locale.EQUIP_BAT;
                    purchaseLabel.text = Settings.locale.Equip_bat;
                }

                moneyContainer.alpha = 0;
                equipLabel.alpha = 1;

                if(UserData.data.usesBats.indexOf(currBat.id) === -1){
                    buttonSticker.alpha = 1;
                }

            }else {
                equipLabel.alpha = 0;
                moneyContainer.alpha = 1;
                purchaseLabel.text = Settings.locale.BUY_BAT;

                if(UserData.CurrentMoney() - currBat.price >= 0)
                {
                    buttonGreen.loadTexture("btn_green");
                    // если следующий еще не видели, то рисуем стикер
                    if(UserData.data.arrowStickersBats.indexOf(currBat.id) === -1)
                    {
                        UserData.data.arrowStickersBats.push(currBat.id);
                        UserData.SaveData();
                    }

                }else{
                    buttonGreen.loadTexture("btn_violet");
                }
            }
        }

        function OnCloseWindow() {
            slider.destroy();
            OnClose();
        }

        container.addChild(buttonGreen);
        container.addChild(buttonSticker);
        return container;

    };


    this.ChooseFieldWindow = function(context, OnClose){
        let container = this.GetBaseContainer(context, "CHOOSE FIELD", null , OnCloseWindow, true);

        //share button
        let button = UiFactory.CreateButton(context, "btn_blue", function() {
            let settingsField = settingsFields[currentFieldIndex];

            // если это поле у нас уже есть
            if(UserData.ContainsField(settingsField.id) || settingsField.starter)
            {
                UserData.SetCurrentField(settingsField.id);
                drawButtons();
                return;
            }

            let fieldProgress = UserData.GetWinCounter() / settingsField.totalWins;

            // если у нас нет этого поля но мы можем его взять
            // то берем, сетим себе и сбрасываем счетчик побед
            if(fieldProgress >= 1)
            {
                UserData.AddField(settingsField.id);
                UserData.SetCurrentField(settingsField.id);
                drawButtons();
            }

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

            let backIcon = context.add.image(0,0, "circle_bg");
            backIcon.tint = 0xD8D9EC;
            group.addChild(backIcon);
            backIcon.scale.set(scaleRatio);
            backIcon.x = sliderWidth / 2 - backIcon.width / 2;
            backIcon.y = sliderHeight / 2 - backIcon.height / 2;



            let batImage = context.add.image(0,0, settingsField.icon);
            group.addChild(batImage);

            batImage.scale.setTo(scaleRatio);

            batImage.x = sliderWidth / 2 - batImage.width / 2;
            batImage.y = sliderHeight / 2 - batImage.height / 2;
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
        progress.y = container.height / 2 + 300 * scaleRatio;


        let mask = context.add.graphics(progress.x, progress.y);
        mask.beginFill(0xffffff);
        mask.drawRect(0,0, preloadBar.width * scaleRatio, preloadBar.height);
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



         let nameLabel = UiFactory.CreateText(context, "NAME", 62);
         nameLabel.fill = "#6F6FAC";
         nameLabel.align = "center";



         nameLabel.x = container.width / 2;
         nameLabel.y = progress.y - 120 * scaleRatio;
         nameLabel.scale.set(scaleRatio);

        container.addChild(nameLabel);

        // draw progress end
        let list_bg = context.add.sprite(0,0, "list_bg");
        list_bg.scale.set(scaleRatio);
        container.addChild(list_bg);
        list_bg.x = container.width / 2 - list_bg.width / 2;
        list_bg.y = container.height / 2 - 300 * scaleRatio;


        let arrowSticker = context.add.sprite(0,0,"sticker");
        arrowSticker.scale.set(scaleRatio);
        container.addChild(arrowSticker);
        arrowSticker.x = container.width / 2 - arrowSticker.width / 2 + 340 * scaleRatio;
        arrowSticker.y = container.height / 2 - arrowSticker.height / 2 - 200 * scaleRatio;



        let buttonSticker = context.add.sprite(0, 0, "sticker");
        buttonSticker.scale.set(scaleRatio);
        container.addChild(buttonSticker);
        buttonSticker.x = container.width / 2 - buttonSticker.width / 2 + button.width / 2 - 20 * scaleRatio;
        buttonSticker.y = container.height / 2 - buttonSticker.height / 2 + 460 * scaleRatio;

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

            // по умолчанию все скрываем
            arrowSticker.alpha = 0;
            buttonSticker.alpha = 0;

            let settingsField = settingsFields[currentFieldIndex];


            for (let i = currentFieldIndex + 1; i < settingsFields.length; i++)
            {
                // если поле не у юзера, но может быть открыть и не просмотрено рисовать стикер
                if(!UserData.ContainsField(settingsFields[i].id) && UserData.GetWinCounter() >= settingsFields[i].totalWins && UserData.data.viewFields.indexOf(settingsFields[i].id) === -1){
                    arrowSticker.alpha = 1;
                }
            }

            nameLabel.text = settingsField.name;

            let fieldProgress = UserData.GetWinCounter() / settingsField.totalWins;

            // если оно у нас и было хоть раз выбрано, то не рисуем прогрессбарчик
            if(UserData.ContainsField(settingsField.id) || settingsField.starter)
            {
                progress.alpha = 0;
                progressTitle.alpha = 0;

                if(UserData.data.usesFields.indexOf(settingsField.id) === -1)
                    buttonSticker.alpha = 1;

            }else {
                progressTitle.alpha = 1;
                progress.alpha = 1;
                progressText.text = UserData.GetWinCounter() + "/" + settingsField.totalWins;
                mask.scale.set(fieldProgress , 1);

            }

            if(fieldProgress < 1 && !settingsField.starter && !UserData.ContainsField(settingsField.id))
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
                buttonText.text = Settings.locale.EQUIP_FIELD;
                buttonText.x = (button.width / 2) / scaleRatio;
                buttonText.y = (button.height / 2) / scaleRatio;

                // помечаем как просмотренное
                if(UserData.data.viewFields.indexOf(settingsField.id) === -1)
                    UserData.data.viewFields.push(settingsField.id);

            }

            // если плашка выбрана
            if(UserData.IsCurrentField(settingsField.id))
            {
                button.loadTexture("btn_violet");
                buttonText.text = Settings.locale.EQUIPPED_FIELD;
                buttonText.x = (button.width / 2) / scaleRatio;
                buttonText.y = (button.height / 2) / scaleRatio;
                return;
            }

        }

        function OnCloseWindow() {
            slider.destroy();
            mask.destroy();
            OnClose();
        }

        return container;
    };

    // показать окно гачи
    this.ShowGatchaWindow = function(context, OnGetReward){
        let container = this.GetBaseContainer(context, Settings.locale.GATCHA_TITLE, null, OnCLose, true);

        let buttonGreen = UiFactory.CreateButton(context, "btn_green", function() {

            // открываем
            if(Gatcha.CanOpenBox())
            {
                console.log("get reward");
                container.Close();
                WindowManager.GatchaRewardWindow(context, Gatcha.Open(), OnGetReward);
                Gatcha.SetCooldown();
                UserData.SaveData();
            }
            else
            {

                if(UserData.CurrentMoney() - Gatcha.GetSkipPrice() >= 0)
                {
                    //skip gatcha progress
                    Gatcha.SkipBox();
                }
            }
        });

        // add money container
        let moneyContainer = context.add.group();
        let money_icon = context.add.sprite(0,0, "icon_coin");
        moneyContainer.add(money_icon);
        money_icon.x = 0;
        money_icon.y = 0;

        // TODO передавать значение в текстовое поле что хотим отрисовать
        let moneyText = context.add.text(0, 0, "200", {font: "70px officina_sans", fill: "#FFFFFF"});
        moneyContainer.addChild(moneyText);
        moneyText.x = money_icon.width + 10;
        moneyText.y = moneyContainer.height / 2 - moneyText.height / 2;

        buttonGreen.addChild(moneyContainer);
        moneyContainer.x = buttonGreen.width / 2 - moneyContainer.width / 2;
        moneyContainer.y = buttonGreen.height / 2 - moneyContainer.height / 2;



        // TODO передавать значение в текстовое поле что хотим отрисовать
        let getNowLabel = context.add.text(0, 0, Settings.locale.GetNowLabel, {font: "70px officina_sans", fill: "#FFFFFF"});
        buttonGreen.addChild(getNowLabel);
        getNowLabel.x = buttonGreen.width/ 2 - getNowLabel.width / 2;
        getNowLabel.y = buttonGreen.height /2 - getNowLabel.height / 2;

        var InfoUserLabel = UiFactory.CreateText(context, Settings.locale.GatchaText, 50);
        InfoUserLabel.fill = "#7C7CB0";
        InfoUserLabel.align = "center";
        InfoUserLabel.x = container.width / 2;
        InfoUserLabel.y = container.height / 2 - 340 * scaleRatio;
        InfoUserLabel.scale.set(scaleRatio);

        container.addChild(InfoUserLabel);

        var gatchaContainer = context.add.group();

        var prizeImage = context.add.sprite(0,0, "gatcha_box");
        gatchaContainer.addChild(prizeImage);
        prizeImage.x = gatchaContainer.width / 2 - prizeImage.width / 2;
        container.addChild(gatchaContainer);
        gatchaContainer.scale.set(scaleRatio);
        gatchaContainer.x = container.width/2 - gatchaContainer.width / 2;
        gatchaContainer.y = container.height / 2 - gatchaContainer.height / 2;

        // draw progressx
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
        progress.y = container.height / 2 + 200 * scaleRatio;


        let mask = context.add.graphics(progress.x, progress.y);
        mask.beginFill(0xffffff);
        mask.drawRect(0,0, preloadBar.width * scaleRatio, preloadBar.height);
        mask.endFill();
        preloadBar.mask = mask;
        mask.scale.set(0.2, 1);

        // end draw progress


        let completeIcon = context.add.sprite(0,0, "task_complete");
        completeIcon.scale.set(scaleRatio);
        container.addChild(completeIcon);

        completeIcon.x = progress.x - completeIcon.width / 2;
        completeIcon.y = mask.y + (progress.height / 2 - completeIcon.height / 2);

        container.addChild(buttonGreen);

        buttonGreen.scale.set(scaleRatio);

        buttonGreen.x = (container.width - buttonGreen.width) / 2;
        buttonGreen.y = container.height / 2 + 460 * scaleRatio;


        let infoButton = UiFactory.CreateText(context, Settings.locale.SpeedUpLabel, 50);
        infoButton.fill = "#7C7CB0";
        infoButton.align = "center";
        infoButton.x = container.width / 2;
        infoButton.y = container.height / 2 + 340 * scaleRatio;
        infoButton.scale.set(scaleRatio);

        container.addChild(infoButton);

        DrawProgress();

        let interval = window.setInterval(function () {
            DrawProgress();
        }, 1000);



        function DrawProgress(){
            if(Gatcha.CanOpenBox())
            {
                // рисуем текст что ожем забрать
                preloadBar.tint = 0x62D026;
                completeIcon.alpha = 1;
                mask.scale.set(1);
                infoButton.text = Settings.locale.GetYoutGatchaReward;
                progressText.text = Settings.locale.GetPrizeLabel;
                moneyContainer.alpha = 0;
                getNowLabel.alpha = 1;
                buttonGreen.loadTexture("btn_green");
            }
            else
            {
                infoButton.text = Settings.locale.SpeedUpLabel;
                preloadBar.tint = 0x3f9dfc;
                completeIcon.alpha = 0;
                progressText.text = Gatcha.GetTimeToEnd().toHHMMSS();
                mask.scale.set((1 - (Gatcha.GetTimeToEnd() / Settings.gatcha.time)), 1);
                moneyText.text = Gatcha.GetSkipPrice();
                moneyContainer.alpha = 1;
                getNowLabel.alpha = 0;
                // TODO добавить проверку на наличие денег для скипа

                if(UserData.CurrentMoney() - Gatcha.GetSkipPrice() >= 0)
                {
                    buttonGreen.loadTexture("btn_green");
                }else{
                    buttonGreen.loadTexture("btn_violet");
                }
            }

            moneyText.x = money_icon.width + 10;
            moneyText.y = moneyContainer.height / 2 - moneyText.height / 2;

            moneyContainer.x = buttonGreen.width / 2 - moneyContainer.width / 2;
            moneyContainer.y = buttonGreen.height / 2 - moneyContainer.height / 2;

        }

        function OnCLose(){
            mask.destroy();
            window.clearInterval(interval);
        }

        return container;
    };

    this.ShowShopButton = function(context, OnClose){
        let container = this.GetBaseContainer(context, "SHOP", null , OnCloseWindow);
        
        function OnCloseWindow() {
            
        }

        let moneyBg = context.add.sprite(0,0,"money_bg");
        moneyBg.tint = 0x8183B0;
        let money_icon = context.add.sprite(0,0, "icon_coin");
        moneyBg.addChild(money_icon);
        money_icon.y = (moneyBg.height - money_icon.height) / 2;
        money_icon.x = 10;

        // // TODO передавать значение в текстовое поле что хотим отрисовать
        let text = context.add.text(0, 0, "99999", {font: "70px officina_sans", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);

        text.x = moneyBg.width / 2 + money_icon.width / 4;
        text.y = moneyBg.height / 2;
        moneyBg.addChild(text);

        text.text = UserData.CurrentMoney();

        moneyBg.scale.set(scaleRatio);
        moneyBg.x = (container.width - moneyBg.width) / 2;
        moneyBg.y = container.height / 2 - 450 * scaleRatio;

        container.addChild(moneyBg);

        // рисуем блок магазина
        let startPositon = container.height / 2 - 300 * scaleRatio;
        let distanceBetweenItems = 190 * scaleRatio;

        for(let i =0 ; i < 5; i++){

            let item = context.add.sprite(0,0,"shop_item_bg");

            // add button
            let shopButton = UiFactory.CreateButton(context, "shop_button", OnShopButtonClick);
            shopButton.variable = i;

            item.addChild(shopButton);
            shopButton.y = item.height / 2 - shopButton.height / 2;
            shopButton.x = item.width - shopButton.width - 10 * scaleRatio;

            //draw button content

            if(i === 0)
            {
                // fb like
                let fb = context.add.sprite(0,0,"like_us");
                shopButton.addChild(fb);
                fb.x = shopButton.width / 2 - fb.width;
                fb.y = shopButton.height / 2 - fb.height / 2;
                let likeText = UiFactory.CreateText(context, "LIKE\nUS!", 50);
                likeText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);
                likeText.lineSpacing = -10;
                likeText.fill = "#FFFFFF";
                likeText.align = "left";
                likeText.anchor.set(0, 0);

                likeText.x = shopButton.width / 2 + 20 * scaleRatio;
                likeText.y = shopButton.height/ 2 - likeText.height / 2;
                shopButton.addChild(likeText);


            }else {

                let priceText = UiFactory.CreateText(context, "$ " + Settings.shop[i].price , 70);
                priceText.anchor.set(0, 0);
                priceText.fill = "#FFFFFF";
                priceText.setShadow(2, 2, 'rgba(0,0,0,1)', 0);

                priceText.x = shopButton.width / 2 - priceText.width / 2;
                priceText.y = shopButton.height/ 2 - priceText.height / 2;
                shopButton.addChild(priceText);

            }


            //-------------------

            let icon = context.add.sprite(0,0,Settings.shop[i].icon);
            item.addChild(icon);
            icon.y = item.height / 2 - icon.height / 2;

            let titleBack = UiFactory.CreateText(context, Settings.shop[i].title, 86);
            titleBack.fill = "#FFFFFF";
            titleBack.align = "left";
            titleBack.anchor.set(0, 0);
            titleBack.stroke = '#6f71a5';
            titleBack.strokeThickness = 10;

            item.addChild(titleBack);
            titleBack.x = 200;
            titleBack.y = 10;



            let infoBack = UiFactory.CreateText(context, Settings.shop[i].info, 60);
            infoBack.fill = "#6F71A5";
            infoBack.align = "left";
            infoBack.anchor.set(0, 0);
            item.addChild(infoBack);

            infoBack.x = 200;
            infoBack.y = 100;





            item.scale.set(scaleRatio);
            item.x = container.width / 2 - item.width / 2;
            item.y = startPositon + i * distanceBetweenItems;
            container.addChild(item);
        }

        // обрабатываем в зависимости от индекса
        function OnShopButtonClick(btn)
        {
            console.log("click button with value : " + btn.variable);
        }

    };


    this.GatchaRewardWindow = function(context, reward, OnClose){
        let container = context.add.group();

        let shadow = context.add.tileSprite(0, 0, context.width, context.height, 'field_biege');
        shadow.tint = 0x2D3061;
        shadow.alpha = 0.7;
        shadow.inputEnabled = true;
        container.addChild(shadow);

        let buttonGreen = UiFactory.CreateButton(context, "btn_green", function() {
            container.destroy();
            if(reward.batId !== undefined)
            {
                if(!UserData.ContainsBat(reward.batId))
                {
                    UserData.AddBat(reward.batId);
                }
            }
            else
            {
                UserData.AddMoney(reward.coins);
            }
            OnClose();
        });

        let getNowLabel = context.add.text(0, 0, Settings.locale.ClaimButton, {font: "70px officina_sans", fill: "#FFFFFF"});
        buttonGreen.addChild(getNowLabel);
        getNowLabel.x = buttonGreen.width/ 2 - getNowLabel.width / 2;
        getNowLabel.y = buttonGreen.height /2 - getNowLabel.height / 2;

        container.addChild(buttonGreen);
        buttonGreen.scale.set(scaleRatio);
        buttonGreen.x = container.width / 2 - buttonGreen.width / 2;
        buttonGreen.y = container.height / 2 + 330 * scaleRatio;


        let glow = context.add.sprite(0,0,"glow");
        container.addChild(glow);
        glow.scale.set(scaleRatio);
        glow.anchor.set(0.5,0.5);
        context.add.tween(glow).to({angle : 360}, 5000, Phaser.Easing.Linear.None, true,0,-1);

        glow.x = container.width / 2 - glow.width / 4;
        glow.y = container.height / 2 - glow.height / 2 + 50 * scaleRatio;


        let title = context.add.text(0, 0, Settings.locale.ClaimTitle, {font: "80px officina_sans", fill: "#FFFFFF"});
        container.addChild(title);
        title.scale.set(scaleRatio);
        title.x = container.width/2 - title.width/ 2;
        title.y = container.height / 2 - 560 * scaleRatio;

        let icon = context.add.sprite(0,0,"");

        let rewardText= "";
        if(reward.batId !== undefined)
        {
            let bat = UserData.GetBatWithId(reward.batId);
            rewardText = bat.name;
            icon.loadTexture(bat.icon);
        }else {
            rewardText = reward.coins + " GOLD!";
            icon.loadTexture("gold2");
        }

        icon.scale.set(scaleRatio);
        container.addChild(icon);
        icon.x = container.width / 2 - icon.width/ 2;
        icon.y = container.height / 2 - icon.height / 2 - 120 * scaleRatio;

        // TODO либо имя либо колиество денег
        let rewardLabel = context.add.text(0, 0, rewardText, {font: "80px officina_sans", fill: "#F8CB62"});
        container.addChild(rewardLabel);
        rewardLabel.scale.set(scaleRatio);
        rewardLabel.x = container.width/2 - rewardLabel.width/ 2;
        rewardLabel.y = container.height / 2 + 160 * scaleRatio;

    };

};




let WindowManager = new _windowManager();