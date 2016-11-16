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
    },
    transformToBlockObj: function(obj) {
        return {
            'topleft': {x: obj.x, y: obj.y},
            'topright': {x: obj.x + this.elem_size, y: obj.y},
            'bottomleft': {x: obj.x, y: obj.y + this.elem_size},
            'bottomright': {x: obj.x + this.elem_size, y: obj.y + this.elem_size}
        }
    },
    compareObjects: function(ball, figure_element) {
        //console.log("Ball  ", JSON.stringify(p1.bottomright));
        //console.log("Figure block ", JSON.stringify(p2.bottomright));
        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        function comparePoints(p1, p2) {
            return p1.x == p2.x && p1.y == p2.y;
        }

        return {
            'left': comparePoints(ball.topleft, figure_element.topright) && comparePoints(ball.bottomleft, figure_element.bottomright),
            'right':  comparePoints(ball.topright, figure_element.topleft) && comparePoints(ball.bottomright, figure_element.bottomleft),
            'bottom': comparePoints(ball.topleft, figure_element.bottomleft) && comparePoints(ball.topright, figure_element.bottomright),
            'top': comparePoints(ball.bottomleft, figure_element.topleft) && comparePoints(ball.bottomright, figure_element.topright),
            'left_top_corner': comparePoints(ball.bottomright, figure_element.topleft),
            'left_bottom_corner': comparePoints(ball.topright, figure_element.bottomleft),
            'right_top_corner': comparePoints(ball.bottomleft, figure_element.topright),
            'right_bottom_corner': comparePoints(ball.topleft, figure_element.bottomright)
        }


    }
};