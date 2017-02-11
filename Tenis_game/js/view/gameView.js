function gameView (){

    var canvasElem = document.querySelector('canvas'),
        drawContext = canvasElem.getContext("2d"),
        drawingField = document.querySelector('.game_field'),
        drawingFieldStyle = getComputedStyle(drawingField),
        drawingWidth = drawingFieldStyle.width,
        drawingHeight = drawingFieldStyle.height,
        middleLineX = Math.round(parseInt(drawingWidth)/2);

    if(!canvasElem.hasAttribute('width')) {
        canvasElem.setAttribute('width', drawingWidth);
    }
    if(!canvasElem.hasAttribute('height')) {
        canvasElem.setAttribute('height', drawingHeight);
    }

    this.fillSelect = function(options) {
        for( var i = 0; i < options.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = options[i];
            opt.value = options[i];
            this.elements.select.appendChild(opt);
        }
    };

    this.size = {
      middleX : middleLineX,
      maxX: parseInt(drawingWidth),
      maxY: parseInt(drawingHeight)
    };

    this.elements = {
        submitBtn:   document.querySelector('button'),
        select: document.querySelector('#select_form'),
        document : document,
        selectSize: document.querySelector('#select_size'),
        selectSpeed: document.querySelector('#select_speed')
    };

    this.testingelements = {
        canvasElem: canvasElem,
        drawContext: drawContext,
        drawingField: drawingField,
        drawingWidth: drawingWidth,
        drawingHeight: drawingHeight,
        middleLineX: middleLineX
    };

    function drawElement(extList, innerList, ext_size, inner_size) {
        var length = extList.length;

        for(var i = 0; i < length; i++) {
            drawContext.rect(extList[i].x, extList[i].y, ext_size, ext_size);
            drawContext.fillRect(innerList[i].x, innerList[i].y,
                                            inner_size, inner_size);
        }

        drawContext.stroke();
    }
    this.clear = function(obj) {
        if(obj) {
            for(var i = 0; i < obj.externalBlock.length; i++) {
                drawContext.clearRect(obj.externalBlock[i].x, obj.externalBlock[i].y, obj.elem_size + 0.5, obj.elem_size + 0.5);
            }
        } else {
            drawContext.clearRect(0, 0, parseInt(drawingWidth), parseInt(drawingHeight));
        }
    };

    this.draw = function(obj, color) {

        var elem_size = obj.elem_size,
            inner_elem_size = obj.inner_elem_size,
            color = color || '#000';

        drawContext.beginPath();
        drawContext.strokeStyle = color;
        drawContext.fillStyle = color;
        drawElement(obj.externalBlock, obj.internalBlock, elem_size, inner_elem_size);

        drawContext.stroke();
        drawContext.closePath();
    };
}
