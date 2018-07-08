let userData;
userData = function userData() {

    this.data = {
        bats : [1],
        defaulBat : 1,
        money : 1000,
        fields : [1],
        currentField : 1,
        winsCount : 0,
        currentSkill : 0,
        gatcha : {
            countOpen : 0, // количество открытий
            endCooldown : 0,
            isLastSkipped : false
        }
    };

    this.Init = function () {
        let storageData = localStorage.getItem("hockeyData");
        if(storageData !== null)
        {
            this.data = JSON.parse(storageData);
        }else {
            // если нет данных, то стартуем таймер гачи
            Gatcha.SetCooldown();
            this.SaveData();
        }
    };

    /**
     * @return {number}
     */
    this.CurrentMoney = function () {
        return this.data.money;
    };

    this.AddMoney = function(value)
    {
        this.data.money += value;
        this.SaveData();
    };

    /**
     * @return {boolean}
     */
    this.SpendMoney = function (count) {
        if (this.data.money - count >= 0) {
            this.data.money -= count;
            this.SaveData();
            return true;
        }
        return false;
    };

    this.SetCurrentBatId = function (batId) {
        if (this.data.bats.indexOf(batId) !== -1) {
            this.data.defaulBat = batId;
            this.SaveData();
        } else {
            throw new Error("user havent bat : " + batId);
        }
    };


    /**
     * @return {null}
     */
    this.GetCurrentBat = function () {

        for(let i= 0; i < Settings.bats.length; i++)
        {
            if(Settings.bats[i].id === this.data.defaulBat)
            {
                return Settings.bats[i];
            }
        }

        return null;
    };

    /**
     * @return {number}
     */
    this.GetCurrentBatId = function(){
        return this.data.defaulBat;
    };

    /**
     * @return {null}
     */
    this.GetEnemyBat = function(){

        let playerBat = this.GetCurrentBat();

        for (let i = 0 ; i < Settings.bats.length; i++)
        {
            if(Settings.bats[i].id === playerBat.enemyId)
            {
                return Settings.bats[i];
            }
        }

        return null;
    };

    /**
     * @return {boolean}
     */
    this.ContainsBat = function(batId){
        return this.data.bats.indexOf(batId) !== -1;
    };

    this.AddBat = function (batId) {
        if (this.data.bats.indexOf(batId) === -1) {
            this.data.bats.push(batId);
            this.SaveData();
        } else {
            throw new Error("user already have  bat : " + batId);
        }
    };

    this.GetUserBats = function () {
        return this.data.bats;
    };

    /**
     * @return {null}
     */
    this.GetCurrentField = function () {

        for(let i= 0; i < Settings.fields.length; i++)
        {
            if(Settings.fields[i].id === this.data.currentField)
            {
                return Settings.fields[i];
            }
        }

        return null;
    };

    this.AddField = function(fieldId){
        if (this.data.fields.indexOf(fieldId) === -1) {
            this.data.fields.push(fieldId);
            this.SaveData();
        } else {
            throw new Error("user already have field : " + fieldId);
        }
    };

    this.GetFields = function()
    {
        let _fields = [];

        this.data.fields.forEach(function (item) {

            for (let i = 0; i < Settings.fields.length; i++)
            {
                if(item === Settings.fields[i].id){
                    _fields.push(Settings.fields[i]);
                }
            }

        });

        return _fields;
    };

    /**
     * @return {number}
     */
    this.GetWinCounter = function () {
        return this.data.winsCount;
    };

    this.UpWinCounter = function(){
        this.data.winsCount++
        this.SaveData();
    };


    /**
     * @return {boolean}
     */
    this.ContainsField = function(fieldId){

        return this.data.fields.indexOf(fieldId) !== -1;
    };

    this.GetRandomFloat = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    this.Clamp = function(num, min, max) {
        return num <= min ? min : num >= max ? max : num;
    };

    this.SetCurrentSkill = function(skill){
        this.data.currentSkill = skill;
        this.SaveData();
    };

    this.GetCurrentBot = function(){
        return Settings.bot[this.data.currentSkill];
    };


    this.SetCurrentField = function(fieldId)
    {
        this.data.currentField = fieldId;
        this.SaveData();
    };

    /**
     * @return {number}
     */
    this.GetCurrentSkill = function()
    {
        return this.data.currentSkill;
    };

    /**
     * @return {boolean}
     */
    this.IsCurrentField = function(fieldId)
    {
        return this.data.currentField === fieldId;
    };

    this.SaveData = function()
    {
        let strData = JSON.stringify(this.data);
        localStorage.setItem("hockeyData", strData);
    };

    /**
     * очистьть данные пользователя
     */
    this.ClearData = function()
    {
        localStorage.removeItem("hockeyData");
    };

    this.GetBatWithId = function(batID)
    {
        for (let i = 0; i < Settings.bats.length; i++)
        {
            if(Settings.bats[i].id === batID)
            {
                return Settings.bats[i];
            }
        }
    }

};

let UserData = new userData();