let userData;
userData = function userData() {

    let _this = this;
    let bats = [1]; // список бит юзера
    let defaulBat = 1; // текущая выбранная бита юзера
    let money = 1000;

    let fields = [1];
    let currentField = 1;
    let winsCount = 20; // счетчик побед пользователя, который будет сбрасываться после того как чел получит поле
    let currentSkill;

    //TODO скорее всего надо будет для получения информации по игре
    this.Init = function () {

    };

    /**
     * @return {number}
     */
    this.CurrentMoney = function () {
        return money;
    };

    /**
     * @return {boolean}
     */
    this.SpendMoney = function (count) {
        if (money - count >= 0) {
            money -= count;
            return true;
        }
        return false;
    };

    this.SetCurrentBatId = function (batId) {
        if (bats.indexOf(batId) !== -1) {
            defaulBat = batId;
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
            if(Settings.bats[i].id === defaulBat)
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
        return defaulBat;
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
        return bats.indexOf(batId) !== -1;
    };

    this.AddBat = function (batId) {
        if (bats.indexOf(batId) === -1) {
            bats.push(batId);
        } else {
            throw new Error("user already have  bat : " + batId);
        }
    };

    this.GetUserBats = function () {
        return bats;
    };

    /**
     * @return {null}
     */
    this.GetCurrentField = function () {

        for(let i= 0; i < Settings.fields.length; i++)
        {
            if(Settings.fields[i].id === currentField)
            {
                return Settings.fields[i];
            }
        }

        return null;
    };

    this.AddField = function(fieldId){
        if (fields.indexOf(fieldId) === -1) {
            fields.push(fieldId);
        } else {
            throw new Error("user already have field : " + fieldId);
        }
    };

    this.GetFields = function()
    {
        let _fields = [];

        fields.forEach(function (item) {

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
        return winsCount;
    };

    this.UpWinCounter = function(){
        winsCount++
    };


    /**
     * @return {boolean}
     */
    this.ContainsField = function(fieldId){

        return fields.indexOf(fieldId) !== -1;
    };

    this.GetRandomFloat = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    this.Clamp = function(num, min, max) {
        return num <= min ? min : num >= max ? max : num;
    };

    this.SetCurrentSkill = function(skill){
        currentSkill = skill;
    };

    this.GetCurrentBot = function(){
        return Settings.bot[currentSkill];
    };


    this.SetCurrentField = function(fieldId)
    {
        currentField = fieldId;
    };

    /**
     * @return {boolean}
     */
    this.IsCurrentField = function(fieldId)
    {
        return currentField === fieldId;
    };

    this.ResetWinCounter = function()
    {
        winsCount = 0;
    }


};

let UserData = new userData();