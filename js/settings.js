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


// для настройки колайдеров в воротах
Settings.SHOW_GATE_COLLIDERS = true;
Settings.GATE_COLLIDER_WIDTH = 300;
Settings.GATE_COLLIDER_HEIGHT = 60;
Settings.PLAYER_GATE_COLLIDER_OFFSET_Y = 10;
Settings.ENEMY_GATE_COLLIDER_OFFSET_Y = 10;
Settings.PLAYER_GATE_COLLIDER_OFFSET_X = 0;
Settings.ENEMY_GATE_COLLIDER_OFFSET_X = 0;



// текста тоже сюда наверное
Settings.locale = {};
Settings.locale.YOU_WIN = "YOU WIN!";
Settings.locale.ENEMY_WIN = "ENEMY WIN!";