function FormsModel() {
    var elem_size = this.elem_size;
    var formObj;

    var structures = {
        'heart': [
            {x: -3 * elem_size, y: 1 * elem_size, quantity: 1}
            //{x: -8 * elem_size, y: 3 * elem_size, quantity: 6},
            //{x: -9 * elem_size, y: 4 * elem_size, quantity: 8},
            //{x: -9 * elem_size, y: 5 * elem_size, quantity: 9},
            //{x: -9 * elem_size, y: 6 * elem_size, quantity: 9},
            //{x: -8 * elem_size, y: 7 * elem_size, quantity: 8},
            //{x: -8 * elem_size, y: 8 * elem_size, quantity: 8},
            //{x: -7 * elem_size, y: 9 * elem_size, quantity: 7},
            //{x: -7 * elem_size, y: 10 * elem_size, quantity: 7},
            //{x: -6 * elem_size, y: 11 * elem_size, quantity: 6},
            //{x: -6 * elem_size, y: 12 * elem_size, quantity: 6},
            //{x: -5 * elem_size, y: 13 * elem_size, quantity: 5},
            //{x: -4 * elem_size, y: 14 * elem_size, quantity: 4},
            //{x: -3 * elem_size, y: 15 * elem_size, quantity: 3},
            //{x: -1 * elem_size, y: 16 * elem_size, quantity: 1}
        ],
        'random' : (function() {
            var random_structure = [];
            for(var i = 0; i < 15; i++) {
                var randNum = getRandomArbitrary( -15, 0);
                random_structure.push({
                    x: randNum * elem_size, y: (2 + i) * elem_size, quantity: getRandomArbitrary(1, Math.abs(randNum) + 1)
                });
            }

            return random_structure;
        })()
    };

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.getStructure = function(name) {
        if(!name) {
            return Object.keys(structures);
        }

        if(!formObj) {
            formObj = this.convert(structures[name]);
        }
        //formObj.update = function(ball) {
        //    var hitedElements;
        //};
        //
        //formObj.remove = function(elems) {
        //
        //};

        return formObj;
    };

    //function checkIfHittedBall(ball) {
    //    var ballCorners = getElementCorners({x: ball.externalBlock[0].x, y: ball.externalBlock[0].y});
    //
    //    for(var i = 0; i < formObj.externalBlock.length; i++) {
    //        var blockCorners = getElementCorners({x: formObj.externalBlock[i].x, y: formObj.externalBlock[i].y});
    //
    //        if(ifEqualCoords(ballCorners, blockCorners)) {
    //
    //        }
    //    }
    //}

    //function getElementCorners(point) {
    //    var pointCorners = [];
    //
    //    pointCorners.push({x: point.x, y: point.y});
    //    pointCorners.push({x: point.x + elem_size, y: point.y});
    //    pointCorners.push({x: point.x + elem_size, y: point.y + elem_size});
    //    pointCorners.push({x: point.x, y: point.y + elem_size});
    //
    //    return pointCorners;
    //}
    //
    //function ifEqualCoords(first, second) {
    //
    //}
}

FormsModel.prototype = Model;