function FormsModel() {
    var elem_size = 15,
        inner_elem_size = 5,
        linesNumber = 15;

    var drawnObjects =[];

    var static_structures = {
        'heart': [
            {x: -6 * elem_size, y: 2 * elem_size, quantity: 3},
            {x: -8 * elem_size, y: 3 * elem_size, quantity: 6},
            {x: -9 * elem_size, y: 4 * elem_size, quantity: 8},
            {x: -9 * elem_size, y: 5 * elem_size, quantity: 9},
            {x: -9 * elem_size, y: 6 * elem_size, quantity: 9},
            {x: -8 * elem_size, y: 7 * elem_size, quantity: 8},
            {x: -8 * elem_size, y: 8 * elem_size, quantity: 8},
            {x: -7 * elem_size, y: 9 * elem_size, quantity: 7},
            {x: -7 * elem_size, y: 10 * elem_size, quantity: 7},
            {x: -6 * elem_size, y: 11 * elem_size, quantity: 6},
            {x: -6 * elem_size, y: 12 * elem_size, quantity: 6},
            {x: -5 * elem_size, y: 13 * elem_size, quantity: 5},
            {x: -4 * elem_size, y: 14 * elem_size, quantity: 4},
            {x: -3 * elem_size, y: 15 * elem_size, quantity: 3},
            {x: -1 * elem_size, y: 16 * elem_size, quantity: 1}
        ],
        'random' : (function() {
            var random_structure = [];
            for(var i = 0; i < 15; i++) {
                var randNum = getRandomArbitary( -15, 0);
                random_structure.push({
                    x: randNum * elem_size, y: (2 + i) * elem_size, quantity: getRandomArbitary(1, Math.abs(randNum) + 1)
                });
            }

            return random_structure;
        })(),
        'racket': [{x: -3 * elem_size, y: 27 * elem_size, quantity: 3}]
    };

    function getRandomArbitary(min, max) {

        return Math.floor(Math.random() * (max - min)) + min;
    }


    this.size = {
        ELEMENT_SIZE : elem_size,
        CENTRAL_ELEM_SIZE : inner_elem_size
    };

    this.getStructure = function(name) {

        return static_structures[name];
    };

    this.addStructure = function(structure) {
      if(!haveSameKeys(static_structures, structure)) {
          static_structures.push(structure);
      }
    };

    function haveSameKeys(a, b) {
        var aKeys = Object.keys(a).sort();
        var bKeys = Object.keys(b).sort();

        return JSON.stringify(aKeys) === JSON.stringify(bKeys);
    }

    this.addDrawnObject = function(structure) {
        drawnObjects.push(structure);
    };

    this.updateDrawedObject = function() {

    };
}
