var Settings = {};

Settings.TIME_TO_NEW_PUCK = 5;  // время в секундах до пофвления нового шарика после забивания кем-то из игроков
Settings.COUNT_TO_WIN = 1; // количество очков в игре всего
Settings.RESTITUTION = 0.4; // отскок любых тел от любых пока единственный физический параметр что мы можем регулировать
Settings.MONE_USER_PADDLE = 0.6; // пока не понятно как это реализовать, в идеале надо мутить какую-то хрен с интерполящией за время

// для бота
Settings.DEFAULT_BOT_Y_POSITION = 200;
Settings.BOT_THRUST_FORWARD = 400;
Settings.BOT_THRUST_BACK = 120;

Settings.BOT_DELTA_Y = 80;
Settings.BOT_EASIER = 2;  // коэффициент который дает доту погрешность

Settings.BOT_DEFFENSIVE_POSITION = 120; // защитна позиция бота
Settings.BOT_DEFFENSIVE_VELOCITY = 3000; // фигня которая сигнализирует боту что надо перехдить в защитную позицию
Settings.BOT_DELTA_X = 200; // дельта смещения бота по иксу от -x до x
Settings.BOT_DELAY_TICKS = 6;


// для настройки колайдеров в воротах
Settings.SHOW_GATE_COLLIDERS = true;
Settings.GATE_COLLIDER_WIDTH = 300;
Settings.GATE_COLLIDER_HEIGHT = 60;
Settings.PLAYER_GATE_COLLIDER_OFFSET_Y = 10;
Settings.ENEMY_GATE_COLLIDER_OFFSET_Y = 10;
Settings.PLAYER_GATE_COLLIDER_OFFSET_X = 0;
Settings.ENEMY_GATE_COLLIDER_OFFSET_X = 0;


Settings.USE_NEW_BOT = true;

//настройки для нового бота
Settings.SKIP_TICKS_FROM_ATTACK = 30;
Settings.PUCK_RADIUS = 70;

//мой бот? попытка
Settings.DISTANCE_BETWEEN_PUCK_AND_BOT = 200;


// реворд за победу
Settings.WIN_REWARD = 30;


// текста тоже сюда наверное
Settings.locale = {};
Settings.locale.YOU_WIN = "YOU WIN!";
Settings.locale.ENEMY_WIN = "ENEMY WIN!";
Settings.locale.REPLAY_BUTTON = "Replay";
Settings.locale.YOUR_SCORE = "Your score:";
Settings.locale.YOUR_REWARD = "Your reward:";

// ресурсы что загружаются для использования в прелоадере
// потом они шарятся везде
Settings.firstPreloaded = {
    "main_bg" : "asset/new_assets/bg.jpg",
    "logo" : "asset/new_assets/logo.png",
    "prbar_bg" : "asset/new_assets/prbar_bg.png",
    "prbar_color" : "asset/new_assets/prbar_color.png"
};

// указываем имя ресурса и его путь что бы можно было грузить автоматом и больше не лазить в код загрузчика
Settings.resources = {
    "cloud_1" : "asset/new_assets/cloud_1.png",
    "cloud_2" : "asset/new_assets/cloud_2.png",
    "money_bg" : "asset/new_assets/money_bg.png",
    "icon_coin" : "asset/new_assets/icon_coin.png",
    "main_btn" : "asset/new_assets/main_btn.png",
    "btn_green" : "asset/new_assets/btn_green.png",
    "btn_blue" : "asset/new_assets/btn_blue.png",
    "btn_violet" : "asset/new_assets/btn_violet.png",
    "btn_yellow" : "asset/new_assets/btn_yellow.png",
    "icon_prize" : "asset/new_assets/icon_prize.png",
    "field_biege" : "asset/new_assets/field_biege.png",
    "popup_bg" : "asset/new_assets/popup_bg.png",
    "green_header" : "asset/new_assets/popup_header_green.png",
    "red_header" : "asset/new_assets/popup_header_red.png",
    "btn_close" : "asset/new_assets/close_btn.png",
    "sun_bg" : "asset/new_assets/sun_bg.png",
    "circle_bg" : "asset/new_assets/circle_bg.png",
    "fb_icon" : "asset/new_assets/facebook_icon.png",
    "youtube_icon" : "asset/new_assets/youtube_icon.png",
    "gatcha_box" : "asset/new_assets/gatcha_box.png",
    "task_complete" : "asset/new_assets/task_complete.png"
};