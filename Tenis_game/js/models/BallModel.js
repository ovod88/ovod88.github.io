function BallModel() {
    var ballObj;

    var structure = [{x: this.elem_size, y: 26 * this.elem_size, quantity: 1}];

    this.getStructure = function() {

        if(!ballObj) {
            ballObj = this.convert(structure);
        }

        return ballObj;
    };
}

BallModel.prototype = Model;
