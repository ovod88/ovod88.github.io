function gameView (model){

    var canvasElem = document.querySelector('canvas'),
        drawContext = canvasElem.getContext("2d"),
        drawingField = document.querySelector('.game_field'),
        drawingFieldStyle = getComputedStyle(drawingField),
        drawingWidth = drawingFieldStyle.width,
        drawingHeight = drawingFieldStyle.height,
        middleLineX = Math.round(parseInt(drawingWidth)/2),
        elem_size = model.size.ELEMENT_SIZE,
        inner_elem_size = model.size.CENTRAL_ELEM_SIZE;

    if(!canvasElem.hasAttribute('width')) {
        canvasElem.setAttribute('width', drawingWidth);
    }
    if(!canvasElem.hasAttribute('height')) {
        canvasElem.setAttribute('height', drawingHeight);
    }

    function drawSymmetric(block, coordList) {
        for (var j = 0; j < block.quantity; j++) {

            var pX = block.x + 0.5 + j * elem_size + middleLineX,
                pY = block.y + 0.5,
                nX = -block.x + 0.5 - ( j + 1 ) * elem_size + middleLineX,
                nY = block.y + 0.5;

            coordList.push.apply(coordList, [{x: pX, y: pY}, {x: nX, y: nY}]);

            drawContext.rect(pX, pY, elem_size, elem_size);
            drawContext.rect(nX, nY, elem_size, elem_size);

            drawContext.fillRect(pX + inner_elem_size, pY + inner_elem_size,
                                    inner_elem_size, inner_elem_size);
            drawContext.fillRect(nX + inner_elem_size, nY + inner_elem_size,
                                    inner_elem_size, inner_elem_size);
        }
    }

    this.start = function(figureName) {
        var structure = model.getStructure(figureName);
        var structureObj = {};
        var coordList = [];


        drawContext.beginPath();

        drawContext.strokeStyle = '#000';
        drawContext.fillStyle = '#000';

        for (var i = 0; i < structure.length; i++) {
            var block = structure[i];

            drawSymmetric(block, coordList);
        }

        drawContext.stroke();

        structureObj[figureName] = coordList;
        model.addDrawnObject(structureObj);
    }
}
