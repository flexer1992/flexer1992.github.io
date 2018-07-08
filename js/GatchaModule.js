var _gatcha = function(){

    // открыть гачу
    this.Open = function(){
        let sumWeight = 0;

        let data = UserData.data.gatcha;

        let rewards = data.isLastSkipped
            ? Settings.gatcha.reward[data.countOpen].skip
            : Settings.gatcha.reward[data.countOpen].always;


        for (let i = 0; i < rewards.length; i++)
        {
            sumWeight += rewards[i].weight;
        }

        let rnd = UserData.GetRandomFloat(0, sumWeight);

        for (let i = 0; i < rewards.length; i++)
        {
            rnd -= rewards[i].weight;

            if (rnd < 0)
            {
                data.countOpen++;

                if(data.countOpen >= Settings.gatcha.reward.length) // TODO пока зациклил
                {
                    data.countOpen = 0;
                }
                this.ResetLastSkipped();
                UserData.SaveData();
                return rewards[i];
            }
        }

    };

    /**
     * @return {number}
     */
    this.GetTimeToEnd = function(){
        return UserData.data.gatcha.endCooldown - Math.floor(Date.now() / 1000);
    };

    // установим кулдаун после открытия
    this.SetCooldown = function(){
        UserData.data.gatcha.endCooldown = Math.floor(Date.now() / 1000) + Settings.gatcha.time;
    };

    /**
     * @return {boolean}
     */
    this.CanOpenBox = function(){
        return UserData.data.gatcha.endCooldown <= Math.floor(Date.now() / 1000);
    };

    /**
     * @return {number}
     */
    this.GetSkipPrice = function(){
        let remainderTime = UserData.data.gatcha.endCooldown - Math.floor(Date.now() / 1000);

        for(let i = 0 ; i < Settings.gatcha.intervals.length; i++)
        {

            let interval = Settings.gatcha.intervals[i];
            if(remainderTime <= interval.max && remainderTime >= interval.min)
            {
                return interval.price;
            }
        }

        return -1;
    };

    // установим кулдаун на текущее время
    this.SkipBox = function(){
        UserData.data.gatcha.endCooldown = Math.floor(Date.now() / 1000);
        UserData.data.gatcha.isLastSkipped = true;
        UserData.SaveData();
    };

    this.ResetLastSkipped = function(){
        UserData.data.gatcha.isLastSkipped = false;
    };
};

var Gatcha = new _gatcha();