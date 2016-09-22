function RacketModel() {
    var elem_size = this.elem_size;

    this.structure = [{x: -3 * elem_size, y: 27 * elem_size, quantity: 3}];
}

RacketModel.prototype = Model;
