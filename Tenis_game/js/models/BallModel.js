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
            directions[this.direction].apply(this);
            console.log('BALL DIRECTION IS ', this.direction);
            console.log('PROTIV STRELKI --> ', this.counterclock);
        };

        ballObj.mirrorDirection = function() {//OK
            if(this.counterclock) {
                switch (this.direction) {
                    case 'eastN':
                        this.direction = 'westN';
                        break;
                    case 'westN':
                        console.log('TOOK TO WEST SOUTH');
                        this.direction = 'westS';
                        break;
                    case 'westS':
                        this.direction = 'eastS';
                        console.log('TOOK TO EAST SOUTH');
                        break;
                    case 'eastS':
                        this.direction = 'eastN';
                        break;
                }
            } else {
                switch (this.direction) {
                    case 'eastN':
                        this.direction = 'eastS';
                        break;
                    case 'westN':
                        this.direction = 'eastN';
                        break;
                    case 'eastS':
                        this.direction = 'westS';
                        break;
                    case 'westS':
                        this.direction = 'westN';
                        break;
                }
            }
        };

        ballObj.oppositeDirection = function () {
            this.counterclock = !this.counterclock;

            if(this.direction == 'eastN') {
                this.direction = 'westS';
            } else if(this.direction == 'westN') {
                this.direction = 'eastS';
            } else if(this.direction == 'eastS' ) {
                this.direction = 'westN';
            } else {
                this.direction = 'eastN';
            }

        };


        return ballObj;
    };
}

BallModel.prototype = Model;
