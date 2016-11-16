function BallModel() {
    var ballObj;
    var elem_size = this.elem_size;
    var directions = {
        'eastN': function() {
                this.externalBlock[0].x += elem_size;
                this.internalBlock[0].x += elem_size;
                this.externalBlock[0].y -= elem_size;
                this.internalBlock[0].y -= elem_size;
        },
        'eastS': function() {
                this.externalBlock[0].x += elem_size;
                this.internalBlock[0].x += elem_size;
                this.externalBlock[0].y += elem_size;
                this.internalBlock[0].y += elem_size;
        },
        'westN': function() {
                this.externalBlock[0].x -= elem_size;
                this.internalBlock[0].x -= elem_size;
                this.externalBlock[0].y -= elem_size;
                this.internalBlock[0].y -= elem_size;
        },
        'westS': function() {
                this.externalBlock[0].x -= elem_size;
                this.internalBlock[0].x -= elem_size;
                this.externalBlock[0].y += elem_size;
                this.internalBlock[0].y += elem_size;
        }
    };

    var structure = [{x: elem_size, y: 26 * elem_size, quantity: 1}];

    this.getStructure = function() {

        if(!ballObj) {
            ballObj = this.convert(structure);
        }

        ballObj.move = function() {
            directions[this.direction].apply(ballObj);
        };

        ballObj.mirrorDirection = function() {
            if(this.direction == 'eastN') {
                this.direction = 'westN';
            } else if(this.direction == 'westN') {
                this.direction = 'westS';
            } else {
                this.direction = 'eastS';
            }
        };

        ball.oppositeDirection = function () {
            if(this.direction == 'eastN') {
                this.direction = 'westS';
            } else if(ballObj.direction == 'westN') {
                this.direction = 'eastS';
            } else if(this.direction = 'eastS' ) {
                this.direction == 'westN'
            } else {
                this.direction == 'eastN';
            }

        };


        return ballObj;
    };
}

BallModel.prototype = Model;
