define(['jquery', 'resig'], function($, tmpl) {
    var View1 = function (model) {

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

    return View1;
});
