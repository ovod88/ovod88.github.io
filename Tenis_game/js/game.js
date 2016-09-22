var figure = new FormsModel();
var racket = new RacketModel();
var ball = new BallModel();

var view = new gameView(figure);

var controller = new TenisController(view, {
                                            'figure' : figure,
                                            'racket': racket,
                                            'ball': ball
                                            });

controller.startGame();
