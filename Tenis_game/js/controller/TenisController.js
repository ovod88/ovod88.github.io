function TenisController(view, models) {
    this.startGame = function() {
        init();


    };

    function init () {
        var figure_name = 'heart';
        var form = models.figure.getStructure(figure_name);//TODO: ADD SELECT FOR NAME
        var elem_size = models.figure.elem_size,
            inner_elem_size = models.figure.inner_elem_size,
            middleX = view.size.middleX,
            formObj = {};

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
        view.draw(formObj);
    }
}
