var brush = (function() {
    var ELEMENT_SIZE = 15;
    var CENTRAL_ELEM_SIZE = 5;

    var static_structures = {
        'heart' :[
            {x:135, y: 30, quantity: 3},
            {x: 105, y: 45, quantity: 6},
            {x: 90, y: 60, quantity: 7},
            {x: 90, y: 75, quantity: 8},
            {x: 90, y: 90, quantity: 9},
            {x: 105, y: 105, quantity: 8},
            {x: 105, y: 120, quantity: 8},
            {x: 120, y: 135, quantity: 7},
            {x: 120, y: 150, quantity: 7},
            {x: 135, y: 165, quantity: 6},
            {x: 135, y: 180, quantity: 6},
            {x: 150, y: 195, quantity: 5},
            {x: 165, y: 210, quantity: 4},
            {x: 180, y: 225, quantity: 3},
            {x: 210, y: 240, quantity: 1}
        ]
    };

    var canvasElem = document.querySelector('canvas'),
        drawContext = canvasElem.getContext("2d"),
        drawingField = document.querySelector('.game_field'),
        drawingFieldStyle = getComputedStyle(drawingField),
        drawingWidth = drawingFieldStyle.width,
        drawingHeight = drawingFieldStyle.height,
        browserWidth = document.documentElement.clientWidth,
        browserHeight = document.documentElement.clientHeight;


    return {
        start: function() {
            canvasElem.setAttribute('width', drawingWidth + 'px');
            canvasElem.setAttribute('height', drawingHeight + 'px');
            drawContext.strokeStyle = '#000';
            drawContext.fillStyle = '#000';

            for (var i = 0; i < static_structures.heart.length; i++) {
                var block = static_structures.heart[i];

                for (var j = 0; j < block.quantity; j++) {
                    drawContext.rect(block.x + 0.5 + j * ELEMENT_SIZE, block.y + 0.5, ELEMENT_SIZE, ELEMENT_SIZE);
                    drawContext.fillRect(block.x + 0.5 + CENTRAL_ELEM_SIZE + j * ELEMENT_SIZE,
                        block.y + 0.5 + CENTRAL_ELEM_SIZE, CENTRAL_ELEM_SIZE, CENTRAL_ELEM_SIZE);
                }
            }

            drawContext.stroke();
        }
    }

})();
