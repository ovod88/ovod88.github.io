function TenisController(view, models) {
    var gameIsOn = false;
    var gameIsPaused = false;
    var objects = {};

    this.startGame = function() {
        view.fillSelect(models.figure.getStructure());

        view.elements.submitBtn.addEventListener('click', init);
    };

    function init () {
        if(!gameIsOn) {
            var select = view.elements.select;
            var selectedFigureName = select.options[select.selectedIndex].value || 'heart';

            objects.form = models.figure.getStructure(selectedFigureName);
            objects.racket = models.racket.getStructure();
            objects.ball = models.ball.getStructure();
            objects.ball.externalBlock = objects.ball.externalBlock.slice(0, 1);
            objects.ball.internalBlock = objects.ball.internalBlock.slice(0, 1);

            view.draw(objects.form);
            view.draw(objects.racket);
            view.draw(objects.ball);

            view.elements.submitBtn.innerHTML = "Pause game";
            gameIsOn = true;
        } else {
            pauseGame();
        }
    }
    function pauseGame() {
        if(!gameIsPaused) {
            gameIsPaused = true;
            view.elements.submitBtn.innerHTML = "Continue game";
        } else {
            gameIsPaused = false;
            view.elements.submitBtn.innerHTML = "Pause game";
        }
    }
}
