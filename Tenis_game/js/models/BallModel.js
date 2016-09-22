function BallModel() {
    var elem_size = this.elem_size;

    this.structure = [{x: elem_size, y: 26 * elem_size, quantity: 1}];
}

BallModel.prototype = Model;
