var figure = new FormsModel();
//var racket = new RacketModel();
//var ball = new BallModel();

var view = new gameView();

var contoller = new TenisController(view, {'figure' : figure});

contoller.startGame();
