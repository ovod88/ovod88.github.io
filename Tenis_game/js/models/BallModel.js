function BallModel() {
    var elem_size = this.elem_size;
    var ballObj;

    var structure = [{x: elem_size, y: 26 * elem_size, quantity: 1}];

    this.getStructure = function() {

        if(!ballObj) {
            ballObj = this.convert(structure);
        }

        return ballObj;
    };
}

BallModel.prototype = Model;
