function TenisController(view, models) {
    var gameIsOn = false;

    this.startGame = function() {
        view.fillSelect(models.figurePicture.getStructure());

        view.elements.submitBtn.addEventListener('click', init);
    };

    function init () {
        if(!gameIsOn) {
            var select = view.elements.select;
            var selectedFigureName = select.options[select.selectedIndex].value || 'heart';

            var formObj = convertStructureToObject({
                structure: models.figurePicture.getStructure(selectedFigureName),
                elem_size: models.figurePicture.elem_size,
                inner_elem_size: models.figurePicture.inner_elem_size,
                middleX: view.size.middleX
            });

            view.draw(formObj);
            view.elements.submitBtn.innerHTML = "Pause game";
            gameIsOn = true;
        } else {
            pauseGame();
        }
    }
    function pauseGame() {
        view.elements.submitBtn.innerHTML = "Continue game";
        gameIsOn = false;
    }

    function convertStructureToObject(figureModel) {
        var form = figureModel.structure,
            middleX = figureModel.middleX,
            elem_size = figureModel.elem_size,
            inner_elem_size = figureModel.inner_elem_size,
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
