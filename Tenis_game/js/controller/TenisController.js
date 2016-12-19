function TenisController(view, models) {
    var gameIsOn = false, gameIsPaused = false,
        keyPressed = false, objects = {},
        figure = [], ball, racket = [], wall = {}, hits = {}, redrawTimer;

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
                if (e.keyCode == 37) {
                    objects.racket.direction = 'left';
                } else if (e.keyCode == 39) {
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

        checkIfBallReachedWall();
        checkBallHitsFigure();
        checkBallHitsRacket();

        timeoutBall = setTimeout(moveBall, 150);
    }

    function checkIfBallReachedWall() {
        var leftX = objects.ball.externalBlock[0].x - objects.ball.elem_size,
            leftY = objects.ball.externalBlock[0].y - objects.ball.elem_size,
            rightX = objects.ball.externalBlock[0].x + objects.ball.elem_size,
            rightY = objects.ball.externalBlock[0].y + objects.ball.elem_size;//TODO if reached bottom wall -- stop game!!!

        if(leftX < 0) {
            if(objects.ball.direction == 'westS') {
                objects.ball.counterclock = true;
            } else if(objects.ball.direction == 'westN') {
                objects.ball.counterclock = false;
            }
            wall = {};
            wall.left_wall = true;
            objects.ball.mirrorDirection();
        }  else if(leftY < 0) {
            if(objects.ball.direction == 'westN') {
                objects.ball.counterclock = true;
            } else if(objects.ball.direction == 'eastN') {
                objects.ball.counterclock = false;
            }
            wall = {};
            wall.top_wall = true;
            objects.ball.mirrorDirection();
        }  else if(rightX > view.size.maxX ) {
            if(objects.ball.direction == 'eastN') {
                objects.ball.counterclock = true;
            } else if(objects.ball.direction == 'eastS') {
                objects.ball.counterclock = false;
            }
            wall = {};
            wall.right_wall = true;
            objects.ball.mirrorDirection();
        }  else if (rightY > view.size.maxY && objects.ball.direction == 'westS') {//TODO delete this part since it is End of Game
            objects.ball.counterclock = false;
        } else if(rightY > view.size.maxY && objects.ball.direction == 'eastS') {
            objects.ball.counterclock = true;
        }
    }

    function checkBallHitsFigure() {

        if (!figure.length) {
            generateFullFigure();
        }
        generateFullBall();

        for( var i = 0; i < figure.length; i++ ) {
            checkObjectsCollapsed(ball, figure[i]);
        }
        analiseHitedElements(objects.form);
        hits = {};
        figure = [];
    }

    function checkBallHitsRacket() {
        generateFullBall();
        generateFullRacket();

        for( var i = 0; i < racket.length; i++ ) {
            checkObjectsCollapsed(ball, racket[i]);
        }
        analiseHitedElements(objects.racket);
        hits = {};
        racket = [];
    }

    function checkObjectsCollapsed(ball, target) {
        var result = Model.compareObjects(ball, target);


        for( var key in result) {
            if(result[key]) {
                hits[key] = target.topleft;
            }
        }
    }

    function analiseHitedElements(target) {

        if(Object.keys(hits).length !== 0) {
            var hitsSided = {}, hitsCornered = {};
            for(var key in hits) {
                if(key === 'right' || key === 'left' || key === 'top' || key === 'bottom') {
                    hitsSided[key] = hits[key];
                } else {
                    hitsCornered[key] = hits[key];
                }
            }

            if(Object.keys(hitsSided).length !== 0) {
                for( var key in hitsSided) {

                    if(Object.keys(hitsSided).length == 2) {
                        console.log('KEY', key);
                    }
                    if (key === 'right' && wall.right_wall) {
                        console.log('TOOK CHANGING OF COUNTERCLOCK');
                        objects.ball.counterclock = !objects.ball.counterclock;
                    }
                    if (key === 'left' && wall.left_wall) {
                        objects.ball.counterclock = !objects.ball.counterclock;
                    }
                    if (key === 'top' && wall.top_wall) {
                        objects.ball.counterclock = !objects.ball.counterclock;
                    }
                    objects.ball.mirrorDirection();
                    wall = {};
                    if(target === objects.form) {
                        redrawHitedTarget(hitsSided[key], target);
                    }
                }
            } else {
                if(Object.keys(hitsCornered).length !== 0) {
                    console.log('CORNERED LAUNCHED');
                    for( var key in hitsCornered) {
                        if ((key === 'left_top_corner' && objects.ball.direction === 'eastS') ||
                            (key === 'left_bottom_corner' && objects.ball.direction === 'eastN') ||
                            (key === 'right_top_corner' && objects.ball.direction === 'westS') ||
                            (key === 'right_bottom_corner' && objects.ball.direction === 'westN')) {
                            objects.ball.oppositeDirection();
                            if (target === objects.form) {
                                redrawHitedTarget(hitsCornered[key], target);
                            }
                        }
                    }
                }

            }
        }
    }

    function redrawHitedTarget(element, target) {
        if(element) {
            for(var j = 0; j < target.externalBlock.length; j++) {
                if(target.externalBlock[j].x == element.x &&
                    target.externalBlock[j].y == element.y) {
                    target.externalBlock.splice(j, 1);
                    target.internalBlock.splice(j, 1);
                }
            }
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
