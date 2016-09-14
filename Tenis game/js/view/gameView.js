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

    function drawSymmetric(block) {
        for (var j = 0; j < block.quantity; j++) {
            drawContext.rect(block.x + 0.5 + j * elem_size + middleLineX, block.y + 0.5, elem_size, elem_size);
            drawContext.rect(-block.x + 0.5 - ( j + 1 ) * elem_size + middleLineX, block.y + 0.5, elem_size, elem_size);

            drawContext.fillRect(block.x + 0.5 + inner_elem_size + j * elem_size + middleLineX,
                block.y + 0.5 + inner_elem_size,
                inner_elem_size, inner_elem_size);
            drawContext.fillRect(-block.x + 0.5 + inner_elem_size - ( j + 1 ) * elem_size + middleLineX,
                block.y + 0.5 + inner_elem_size,
                inner_elem_size, inner_elem_size);
        }
    }
    this.start = function(figureName) {
        var structure = model.getStructure(figureName);

        canvasElem.setAttribute('width', drawingWidth + 'px');
        canvasElem.setAttribute('height', drawingHeight + 'px');
        drawContext.strokeStyle = '#000';
        drawContext.fillStyle = '#000';

        drawContext.clearRect(0, 0, drawingWidth, drawingHeight);

        for (var i = 0; i < structure.length; i++) {
            var block = structure[i];

            drawSymmetric(block);
        }

        drawContext.stroke();
    }
}
