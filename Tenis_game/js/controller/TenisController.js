function TenisController(view, models) {
    var gameIsOn = false;
    var gameIsPaused = false;
    var elem_size = Model.elem_size,
        inner_elem_size = Model.inner_elem_size,
        middleX = view.size.middleX;


    this.startGame = function() {
        view.fillSelect(models.figure.getStructure());

        view.elements.submitBtn.addEventListener('click', init);
    };

    function init () {
        if(!gameIsOn) {
            var select = view.elements.select;
            var selectedFigureName = select.options[select.selectedIndex].value || 'heart';

            var formObj = convertStructureToObject({
                structure: models.figure.getStructure(selectedFigureName)
            });

            var racketObj = convertStructureToObject({
                structure: models.racket.structure
            });

            var ballObj = convertStructureToObject({
                structure: models.ball.structure
            });
            ballObj.externalBlock = ballObj.externalBlock.slice(0, 1);
            ballObj.internalBlock = ballObj.internalBlock.slice(0, 1);
            console.log(ballObj);

            view.draw(formObj);
            view.draw(racketObj);
            view.draw(ballObj);
            models.figure.addDrawnObject(formObj);
            models.racket.addDrawnObject(racketObj);
            models.ball.addDrawnObject(ballObj);

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

    function convertStructureToObject(figureModel) {
        var form = figureModel.structure,
            formObj = {};


        formObj.externalBlock = [];
        formObj.internalBlock = [];
        formObj.elem_size = elem_size;
        formObj.inner_elem_size = inner_elem_size;

        for (var i = 0; i < form.length; i++) {
            var block = form[i];

            for (var j = 0; j < block.quantity; j++) {
                var pX = block.x + 0.5 + j * elem_size + middleX,
                    pY = block.y + 0.5,
                    nX = -block.x + 0.5 - ( j + 1 ) * elem_size + middleX,
                    nY = block.y + 0.5;

                formObj.externalBlock.push.apply(formObj.externalBlock, [{x: pX, y: pY}, {x: nX, y: nY}]);
                formObj.internalBlock.push.apply(formObj.internalBlock,
                    [{x: pX + inner_elem_size, y: pY + inner_elem_size},
                        {x: nX + inner_elem_size, y: nY + inner_elem_size}]);
            }
        }

        return formObj;
    }
}
