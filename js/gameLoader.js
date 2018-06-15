
var GameApp = GameApp || {};

GameApp.BASE_WIDTH = 1080;
GameApp.BASE_HEIGHT = 1920;

GameApp.CANVAS_WIDTH = window.innerWidth;
GameApp.CANVAS_HEIGHT = window.innerHeight;

GameApp.ASPECT_RATIO = GameApp.CANVAS_WIDTH / GameApp.CANVAS_HEIGHT;
GameApp.ASPECT_RATIO_ROUND = Math.round(GameApp.ASPECT_RATIO);


GameApp.LogWidth = Math.log2(GameApp.CANVAS_WIDTH / GameApp.BASE_WIDTH);
GameApp.LogHeight = Math.log2(GameApp.CANVAS_HEIGHT / GameApp.BASE_HEIGHT);


// float logWeightedAverage = Mathf.Lerp(logWidth, logHeight, m_MatchWidthOrHeight);
// scaleFactor = Mathf.Pow(kLogBase, logWeightedAverage);

GameApp.SCALE_RATIO = Math.pow(2, GameApp.LogHeight);



// if (GameApp.ASPECT_RATIO > 1) {
//     GameApp.SCALE_RATIO = GameApp.CANVAS_HEIGHT / GameApp.CANVAS_WIDTH;
// } else {
//     GameApp.SCALE_RATIO = GameApp.CANVAS_WIDTH/ GameApp.CANVAS_WIDTH;
// }


console.log("test calculate => " + GameApp.CANVAS_HEIGHT / GameApp.CANVAS_WIDTH);

console.log(GameApp.ASPECT_RATIO);

console.log(GameApp.CANVAS_HEIGHT / GameApp.BASE_WIDTH);

console.log(GameApp.BASE_HEIGHT/ GameApp.BASE_WIDTH);