define(['jquery'], function() {
    var Controller1 = function(model, view) {
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

    return Controller1;
});
