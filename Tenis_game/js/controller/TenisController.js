function TenisController(view, models) {
    var gameIsOn = false;
    var gameIsPaused = false;
    var keyPressed = false;
    var objects = {};
    var figure = [];
    var ball;

    var timeoutRacket, timeoutBall;
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

            //console.log('RACKET -->', objects.racket.externalBlock);
            //console.log('BALL -->', objects.ball.externalBlock);

            redraw();
            view.elements.submitBtn.innerHTML = "Pause game";

            gameIsOn = true;
            view.elements.document.addEventListener('keydown', moveRacket);
            view.elements.document.addEventListener('keyup', function(e) {
                if(e.keyCode == 37 || e.keyCode == 39) {
                    clearTimeout(timeoutRacket);
                    timeoutRacket = -1;
                }
                keyPressed = !keyPressed;
            });
            moveBall();
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
        clearTimeout(timeoutBall);
    }

    function resumeGame() {
        gameIsPaused = false;
        view.elements.document.addEventListener('keydown', moveRacket);
        view.elements.submitBtn.innerHTML = "Pause game";
        moveBall();
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
                objects.racket.move();
                redraw();
                timeoutRacket = setTimeout(function moveRacket() {
                    objects.racket.move();
                    redraw();
                    timeoutRacket = setTimeout(moveRacket, 50);
                }, 400);
            }
            keyPressed = !keyPressed;
        }
    }

    function moveBall() {
        if(!objects.ball.direction) {
            objects.ball.direction = 'eastN';
        }
        checkIfBallReachedWall();
        checkBallHitsFigure();
        redraw();
        objects.ball.move();
        timeoutBall = setTimeout(moveBall, 600);
    }

    function checkIfBallReachedWall() {
        var leftX = objects.ball.externalBlock[0].x - objects.ball.elem_size,
            leftY = objects.ball.externalBlock[0].y - objects.ball.elem_size,
            rightX = objects.ball.externalBlock[0].x + objects.ball.elem_size;

        if(leftX < 0 || leftY < 0 || rightX > view.size.maxX ) {
            objects.ball.mirrorDirection();
        }
    }

    function checkBallHitsFigure() {
        if (!figure.length) {
            generateFullFigure();
        }
        generateFullBall();

        for(var i = 0; i < figure.length; i++) {
            var result = Model.compareObjects(ball, figure[i]);

            if( result.bottom ) {
                console.log("BOTOOM HITED!!!");
            }
        }
    }

    function generateFullFigure() {
        for( var i = 0; i < objects.form.externalBlock.length; i++) {
            figure.push(Model.transformToBlockObj(objects.form.externalBlock[i]));
        }
        //console.log('Figure --> ', figure);
    }

    function generateFullBall() {
        ball = Model.transformToBlockObj(objects.ball.externalBlock[0]);
    }
}
