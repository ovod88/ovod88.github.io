function RacketModel() {
    var racketObj;

    var structure = [{x: -3 * this.elem_size, y: 27 * this.elem_size, quantity: 3}];

    this.getStructure = function() {

        if(!racketObj) {
            racketObj = this.convert(structure);
        }

        racketObj.update = function() {
            if(this.direction === 'left' ) {
                for( var i = 0; i < racketObj.externalBlock.length; i++) {
                    this.externalBlock[i].x -= this.elem_size;
                    this.internalBlock[i].x -= this.elem_size;
                }
            } else if (this.direction === 'right') {
                for( var i = 0; i < racketObj.externalBlock.length; i++) {
                    this.externalBlock[i].x += this.elem_size;
                    this.internalBlock[i].x += this.elem_size;
                }
            }
            //console.log('RACKET OBJECT', racketObj);
        };

        return racketObj;
    };
}

RacketModel.prototype = Model;
