function TenisController(view, models) {
    var gameIsOn = false, gameIsPaused = false,
        keyPressed = false, objects = {},
        figure = [], ball, racket = [], redrawTimer;

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

            redrawTimer = setInterval(redraw, 20);
            gameIsOn = true;

            view.elements.submitBtn.innerHTML = "Pause game";
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
        clearInterval(redrawTimer);
    }

    function resumeGame() {
        gameIsPaused = false;
        redrawTimer = setInterval(redraw, 20);
        view.elements.document.addEventListener('keydown', moveRacket);
        view.elements.submitBtn.innerHTML = "Pause game";
        moveBall();
    }

    function redraw() {
        view.clear();
        view.draw(objects.form);
        view.draw(objects.ball);
        view.draw(objects.racket);
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
                timeoutRacket = setTimeout(function moveRacket() {
                    objects.racket.move();
                    timeoutRacket = setTimeout(moveRacket, 50);
                }, 200);
            }
            keyPressed = !keyPressed;
        }
    }

    function moveBall() {
        if(!objects.ball.direction) {
            objects.ball.direction = 'eastN';
        }
        objects.ball.move();
        //checkIfBallReachedWall();
        //checkBallHitsFigure();
        //checkBallHitsRacket();
        timeoutBall = setTimeout(moveBall, 500);
    }

    function checkIfBallReachedWall() {
        var leftX = objects.ball.externalBlock[0].x - objects.ball.elem_size,
            leftY = objects.ball.externalBlock[0].y - objects.ball.elem_size,
            rightX = objects.ball.externalBlock[0].x + objects.ball.elem_size;

        if(leftX < 0 || leftY < 0 || rightX > view.size.maxX ) {
            objects.ball.mirrorDirection();
        }

        //TODO if reached bottom wall -- stop game!!!
    }

    function checkBallHitsFigure() {

        if (!figure.length) {
            generateFullFigure();
        }
        generateFullBall();
        for( var i = 0; i < figure.length; i++ ) {
            processHit(checkObjectsCollapsed(ball, figure[i]));
        }
    }
    function checkBallHitsRacket() {
        generateFullBall();
        generateFullRacket();

        for( var i = 0; i < racket.length; i++ ) {
            processRacketHit(checkObjectsCollapsed(ball, racket[i]));
        }
    }

    function checkObjectsCollapsed(ball, target) {
        var hits= {};
        var result = Model.compareObjects(ball, target);

        if( result.bottom || result.top || result.left || result.right ) {
            hits.borders_ids = target.topleft;
        } else if((result.left_bottom_corner && objects.ball.direction == 'eastN') ||
            (result.left_top_corner && objects.ball.direction == 'westS') ||
            (result.right_bottom_corner && objects.ball.direction == 'westN') ||
            (result.right_top_corner && objects.ball.direction == 'eastS')) {
            hits.corners_ids = target.topleft;
        }
        return hits;
    }

    function processHit(hits) {//TODO rewrite this method
        if(hits.borders_ids) {
            objects.ball.mirrorDirection();
            for(var j = 0; j < objects.form.externalBlock.length; j++) {
                if(objects.form.externalBlock[j].x == hits.borders_ids.x &&
                    objects.form.externalBlock[j].y == hits.borders_ids.y) {
                    objects.form.externalBlock.splice(j, 1);
                    objects.form.internalBlock.splice(j, 1);
                    return;
                }
            }
        }
        if(hits.corners_ids) {
            objects.ball.oppositeDirection();
            for (var j = 0; j < objects.form.externalBlock.length; j++) {
                if (objects.form.externalBlock[j].x == hits.corners_ids.x &&
                    objects.form.externalBlock[j].y == hits.corners_ids.y) {
                    objects.form.externalBlock.splice(j, 1);
                    objects.form.internalBlock.splice(j, 1);
                    return;
                }
            }
        }
    }

    function processRacketHit(hits) {
        if(hits.borders_ids) {
            objects.ball.mirrorDirection();
        }
        if(hits.corners_ids) {
            objects.ball.oppositeDirection();
        }
    }

    function generateFullFigure() {
        for( var i = 0; i < objects.form.externalBlock.length; i++) {
            figure.push(Model.transformToBlockObj(objects.form.externalBlock[i]));
        }
    }

    function generateFullBall() {
        ball = Model.transformToBlockObj(objects.ball.externalBlock[0]);
    }

    function generateFullRacket() {
        for( var i = 0; i < objects.racket.externalBlock.length; i++) {
            racket.push(Model.transformToBlockObj(objects.racket.externalBlock[i]));
        }
    }
}
