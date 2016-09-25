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
            checkWallReached();
            directions[this.direction].apply(ballObj);
        };

        ballObj.mirrorDirection = function() {
            if(this.direction == 'eastN') {
                this.direction = 'westN';
            } else if(ballObj.direction == 'westN') {
                this.direction = 'westS';
            } else {
                this.direction = 'eastS';
            }
        }


        return ballObj;
    };

    function checkWallReached() {
        var leftX = ballObj.externalBlock[0].x - elem_size,
            leftY = ballObj.externalBlock[0].y - elem_size,
            rightX = ballObj.externalBlock[0].x + elem_size;

        if(leftX < 0 || leftY < 0 || rightX > view.size.maxX ) {
            ballObj.mirrorDirection();
        }
    }
}

BallModel.prototype = Model;
