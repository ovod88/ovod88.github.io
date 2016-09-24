function RacketModel() {
    var elem_size = this.elem_size;
    var racketObj;

    var structure = [{x: -3 * elem_size, y: 27 * elem_size, quantity: 3}];

    this.getStructure = function() {

        if(!racketObj) {
            racketObj = this.convert(structure);
        }

        return racketObj;
    };

}

RacketModel.prototype = Model;
