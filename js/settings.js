var Settings = {};

Settings.TIME_TO_NEW_PUCK = 5;  // время в секундах до пофвления нового шарика после забивания кем-то из игроков
Settings.COUNT_TO_WIN = 6; // количество очков в игре всего
Settings.RESTITUTION = 0.3; // отскок любых тел от любых пока единственный физический параметр что мы можем регулировать

// для настройки колайдеров в воротах
Settings.SHOW_GATE_COLLIDERS = true;
Settings.GATE_COLLIDER_WIDTH = 300;
Settings.GATE_COLLIDER_HEIGHT = 60;
Settings.PLAYER_GATE_COLLIDER_OFFSET_Y = 10;
Settings.ENEMY_GATE_COLLIDER_OFFSET_Y = 10;
Settings.PLAYER_GATE_COLLIDER_OFFSET_X = 0;
Settings.ENEMY_GATE_COLLIDER_OFFSET_X = 0;



// реворд за победу
Settings.WIN_REWARD = 30;


// текста тоже сюда наверное
Settings.locale = {};
Settings.locale.YOU_WIN = "YOU WIN!";
Settings.locale.ENEMY_WIN = "ENEMY WIN!";
Settings.locale.REPLAY_BUTTON = "Replay";
Settings.locale.YOUR_SCORE = "Your score:";
Settings.locale.YOUR_REWARD = "Your reward:";

Settings.locale.EQUIP_FIELD = "Equip!";
Settings.locale.EQUIPPED_FIELD = "Equipped";

Settings.locale.EQUIP_BAT = "Equip!";
Settings.locale.EQUIPPED_BAT = "Equipped";

Settings.locale.LOCKED_FIELD = "Locked";

Settings.locale.SELECT_LABEL = "SELECT";
Settings.locale.BUY_BAT = "Purchase bat";

Settings.locale.Equip_bat = "Equip bat";
Settings.locale.Equipped_bat = "Equipped bat";


// ресурсы что загружаются для использования в прелоадере
// потом они шарятся везде
Settings.firstPreloaded = {

    "main_bg": "asset/new_assets/menu_bg.jpg",
    "logo": "asset/new_assets/logo.png",
    "prbar_bg": "asset/new_assets/prbar_bg.png",
    "prbar_color": "asset/new_assets/prbar_color.png"
};

// указываем имя ресурса и его путь что бы можно было грузить автоматом и больше не лазить в код загрузчика
Settings.resources = {

    "money_bg": "asset/new_assets/money_bg.png",
    "icon_coin": "asset/new_assets/icon_coin.png",
    "main_btn_left": "asset/new_assets/main_menu_left.png",
    "main_btn_right": "asset/new_assets/main_menu_right.png",


    "btn_green": "asset/new_assets/btn_green_normal.png",
    "btn_green_big": "asset/new_assets/btn_green.png",
    "btn_blue": "asset/new_assets/btn_blue.png",
    "btn_violet": "asset/new_assets/btn_violet.png",
    "btn_yellow": "asset/new_assets/btn_yellow.png",
    "icon_prize": "asset/new_assets/icon_prize.png",
    "field_biege": "asset/new_assets/field_biege.png",
    "field_dot": "asset/new_assets/field_dot.png",
    "popup_bg": "asset/new_assets/popup_bg.png",
    "green_header": "asset/new_assets/popup_header_green.png",
    "red_header": "asset/new_assets/popup_header_red.png",
    "btn_close": "asset/new_assets/close_btn.png",
    "sun_bg": "asset/new_assets/sun_bg.png",
    "circle_bg": "asset/new_assets/circle_bg.png",
    "fb_icon": "asset/new_assets/facebook_icon.png",
    "youtube_icon": "asset/new_assets/youtube_icon.png",
    "gatcha_box": "asset/new_assets/gatcha_box.png",
    "task_complete": "asset/new_assets/task_complete.png",
    "btn_arrow": "asset/new_assets/arrow_btn.png",
    "btn_arrow_left": "asset/new_assets/arrow_btn_left.png",

    // bats
    "captn_bat_blue": "asset/new_assets/bats/captn_bat_blue.png",
    "captn_bat_red": "asset/new_assets/bats/captn_bat_red.png",
    "donut_bat_blue": "asset/new_assets/bats/donut_bat_blue.png",
    "donut_bat_red": "asset/new_assets/bats/donut_bat_red.png",
    "hockey_bat_blue": "asset/new_assets/bats/hockey_bat_blue.png",
    "hockey_bat_red": "asset/new_assets/bats/hockey_bat_red.png",
    "wheel_bat_blue": "asset/new_assets/bats/wheel_bat_blue.png",
    "wheel_bat_red": "asset/new_assets/bats/wheel_bat_red.png",

    // pucks and fiends icons
    "basket_field" : "asset/new_assets/fields/basket_field.png",
    "classic_field" : "asset/new_assets/fields/classic_field.png",
    "ice_field" : "asset/new_assets/fields/ice_field.png",
    "neon_field" : "asset/new_assets/fields/neon_field.png",
    "puck" : "asset/new_assets/fields/puck.png",
    "puck_basket" : "asset/new_assets/fields/puck_basket.png",
    "puck_hockey" : "asset/new_assets/fields/puck_hockey.png",
    "puck_neon" :  "asset/new_assets/fields/puck_neon.png",
    "puck_soccer" :  "asset/new_assets/fields/puck_soccer.png",
    "soccer_field" :  "asset/new_assets/fields/soccer_field.png",
    "list_bg" :  "asset/new_assets/llist_back.jpg",
};

Settings.bats = [
    {
        id: 1,
        icon: "hockey_bat_blue",
        price: 1000,
        name: "default",
        isPlayer : true,
        enemyId : 2
    },
    {
        id: 2,
        icon: "hockey_bat_red",
        price: 2000,
        name: "default red",
        isPlayer : false
    },
    {
        id: 3,
        icon: "captn_bat_blue",
        price: 999,
        name: "captn blue",
        isPlayer : true,
        enemyId : 4
    },
    {
        id: 4,
        icon: "captn_bat_red",
        price: 4000,
        name: "captn red",
        isPlayer : false
    },
    {
        id: 5,
        icon: "donut_bat_blue",
        price: 5000,
        name: "donut blue",
        isPlayer : true,
        enemyId : 6
    },
    {
        id: 6,
        icon: "donut_bat_red",
        price: 6000,
        name: "donut red",
        isPlayer : false
    },
    {
        id: 7,
        icon: "wheel_bat_blue",
        price: 7000,
        name: "wheel blue",
        isPlayer : true,
        enemyId : 8
    },
    {
        id: 8,
        icon: "wheel_bat_red",
        price: 8000,
        name: "wheel red",
        isPlayer : false
    }

];

Settings.fields = [
    {
        id: 1,
        name: "Classic",
        icon: "classic_field",
        fieldColor: "#f5f5eb",
        linesColor: 0xD62D20,
        dotColor: 0xe5e3d6,
        totalWins : 10, // количество побед для возможности открытия
        puck : "puck",
        starter : true
    },
    {
        id: 2,
        name: "Football",
        icon: "soccer_field",
        fieldColor: "#96c54b",
        linesColor: 0xD62D20,
        dotColor: 0xbbef67,
        totalWins : 20, // количество побед для возможности открытия
        puck : "puck_soccer"
    },
    {
        id: 3,
        name: "Neon",
        icon: "neon_field",
        fieldColor: "#3e3b68",
        linesColor: 0xD62D20,
        dotColor: 0x6960ba,
        totalWins : 30, // количество побед для возможности открытия
        puck : "puck_neon"
    },
    {
        id: 4,
        name: "Basketball",
        icon: "basket_field",
        fieldColor: "#d3823b",
        linesColor: 0xffffff,
        dotColor: 0xc2722b,
        totalWins : 40, // количество побед для возможности открытия
        puck : "puck_basket"
    },
    {
        id: 5,
        name: "Ice",
        icon: "ice_field",
        fieldColor: "#7bbcff",
        linesColor: 0xD62D20,
        dotColor: 0x8fc6ff,
        totalWins : 50, // количество побед для возможности открытия
        puck : "puck_hockey"
    }
];

Settings.gatcha = {
    time : 3600, // время в секундах
    //intervals

};

Settings.bot = [
    {
        MovementSpeed : 5,
        playerBoundary : {
            Down : 810,
            Left : 0,
            Right : 1080,
            Up : 180
        }
    },
    {
        MovementSpeed : 7,
        playerBoundary : {
            Down : 810,
            Left : 0,
            Right : 1080,
            Up : 180
        }
    },
    {
        MovementSpeed : 9,
        playerBoundary : {
            Down : 810,
            Left : 0,
            Right : 1080,
            Up : 180
        }
    },
    {
        MovementSpeed : 12,
        playerBoundary : {
            Down : 810,
            Left : 0,
            Right : 1080,
            Up : 180
        }
    },
];