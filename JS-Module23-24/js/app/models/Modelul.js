define([], function() {
    var Model_UL = function(list) {
        var my_list = list;

        this.add = function(val) {
            if( val ) {
                my_list.push(val);
                return this;
            }
        };

        this.remove = function (val) {
            var index = my_list.indexOf(val);

            if(index != -1) {
                my_list.splice(index, 1);

                return this;
            }

            console.log('No such value!');
        };

        this.update = function(oldValue, newValue) {
            var index = my_list.indexOf(oldValue);

            if(index) {
                my_list[index] = newValue;

                return this;
            }
            console.log('Nothing to update');

        };

        this.get = function() {
            return my_list;
        };

    };

    return Model_UL;
});
