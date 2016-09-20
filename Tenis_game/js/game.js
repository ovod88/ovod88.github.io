var figure = new FormsModel();
//var racket = new RacketModel();
//var ball = new BallModel();

var view = new gameView(figure);

var contoller = new TenisController(view, {'figurePicture' : figure});

contoller.startGame();
