function TenisController(view, models) {
    var gameIsOn = false;
    var gameIsPaused = false;
    var keyPressed = false;
    var objects = {};

    var timeout;
    this.startGame = function() {

        view.fillSelect(models.figure.getStructure());
        view.elements.submitBtn.addEventListener('click', init);
    };

    function init () {
        if(!gameIsOn) {
            var select = view.elements.select;
            var selectedFigureName = select.options[select.selectedIndex].value || 'heart';

            objects.form = models.figure.getStructure(selectedFigureName);
            console.log(objects.form);
            objects.racket = models.racket.getStructure();
            objects.ball = models.ball.getStructure();
            objects.ball.externalBlock = objects.ball.externalBlock.slice(0, 1);

            objects.ball.internalBlock = objects.ball.internalBlock.slice(0, 1);

            redraw();
            view.elements.submitBtn.innerHTML = "Pause game";

            gameIsOn = true;
            view.elements.document.addEventListener('keydown', moveRacket);
            view.elements.document.addEventListener('keyup', function(e) {
                if(e.keyCode == 37 || e.keyCode == 39) {
                    clearTimeout(timeout);
                    timeout = -1;
                }
                keyPressed = !keyPressed;
            })
        } else {
            if(gameIsPaused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
    }

    function pauseGame() {
        gameIsPaused = true;
        view.elements.document.removeEventListener('keydown', moveRacket);
        view.elements.submitBtn.innerHTML = "Continue game";
    }

    function resumeGame() {
        gameIsPaused = false;
        view.elements.document.addEventListener('keydown', moveRacket);
        view.elements.submitBtn.innerHTML = "Pause game";
    }

    function redraw() {
        view.clear();
        view.draw(objects.form);
        view.draw(objects.racket);
        view.draw(objects.ball);
    }

    function moveRacket(e) {
        if(!keyPressed) {
            if(e.keyCode == 37 || e.keyCode == 39) {
                if(e.keyCode == 37) {
                    objects.racket.direction = 'left';
                } else if(e.keyCode == 39) {
                    objects.racket.direction = 'right';
                }
                objects.racket.update();
                redraw();
                timeout = setTimeout(function moveRacket() {
                    objects.racket.update();
                    redraw();
                    timeout = setTimeout(moveRacket, 50);
                }, 400);
            }
            keyPressed = !keyPressed;
        }
    }
}
