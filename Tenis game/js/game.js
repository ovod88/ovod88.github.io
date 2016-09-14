var figure = new FormsModel();
var view = new gameView(figure);
var contoller = new TenisController(view, figure);

contoller.startGame();
