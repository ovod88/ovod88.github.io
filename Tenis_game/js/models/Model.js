var Model = {
    elem_size: 15,
    inner_elem_size: 5,
    linesNumber: 15,

    convert: function (structure) {
        var obj = {};

        obj.externalBlock = [];
        obj.internalBlock = [];
        obj.elem_size = this.elem_size;
        obj.inner_elem_size = this.inner_elem_size;

        for (var i = 0; i < structure.length; i++) {
            var block = structure[i];

            for (var j = 0; j < block.quantity; j++) {
                var pX = block.x + 0.5 + j * this.elem_size + this.middleX,
                    pY = block.y + 0.5,
                    nX = -block.x + 0.5 - ( j + 1 ) * this.elem_size + this.middleX,
                    nY = block.y + 0.5;

                obj.externalBlock.push.apply(obj.externalBlock, [{x: pX, y: pY}, {x: nX, y: nY}]);
                obj.internalBlock.push.apply(obj.internalBlock,
                    [{x: pX + this.inner_elem_size, y: pY + this.inner_elem_size},
                        {x: nX + this.inner_elem_size, y: nY + this.inner_elem_size}]);
            }
        }

        return obj;
    }
};