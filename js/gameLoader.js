(function () {


    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
    game.state.add('Game', BasicGame.Game);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Preload', BasicGame.Preloader);
    game.state.add('Boot', BasicGame.Boot);


    game.state.start('Boot');

})();

