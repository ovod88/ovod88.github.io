var MyList = {};

MyList.Model_UL = function(list) {
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

MyList.View1 = function (model) {

    var self = this;

    function init() {
        var template = tmpl($('#skeleton').html());
        $('body').append(template);

        self.elements = {
            addBtn : $('button'),
            input: $('input'),
            ul : $('.main-list')
        };
        self.showList();
    }

    self.showList = function() {

        var list = model.get();
        var length = list.length;
        var newList = [];

        for(var i = 0; i < length; i++) {
            newList.push('<li>' + '<span class="display">' +
                        list[i] + '</span>' +
                        '<input type="text" class="edit" style="display:none"/>' +
                        '<span class="close">x</span></li>')
        }

        self.elements.ul.html(newList);
    };


    init();
};

MyList.Controller1 = function(model, view) {
    view.elements.addBtn.on("click", addItem);
    view.elements.ul.on('click', '.close',  removeItem);
    view.elements.ul.on('click', '.display',  runEdit);
    view.elements.ul.on('focusout', '.edit',  updateField);

    var oldValue, newValue;

    function addItem() {
        var newValue = view.elements.input.val();

        if(newValue) {
            model.add(newValue);
            view.showList();
            view.elements.input.val('');
        }
    }

    function removeItem() {
        model.remove($(this).siblings('.display').text());
        view.showList();
    }

    function runEdit() {
        oldValue = $(this).text();

        $(this).hide().siblings(".edit").show().val(oldValue).focus();
    }

    function updateField() {
        newValue = $(this).val();

        $(this).hide().siblings(".display").show().text(newValue);
        model.update(oldValue, newValue);
    }
};

$(document).ready(function () {
    var model_ul = new MyList.Model_UL(['Water is the best', 'Cidr is the best', 'Sport is the best']);
    var view = new MyList.View1(model_ul);
    var controller = new MyList.Controller1(model_ul, view);
});
