$(function(){
	$(".niceCheck").each(
		function() {
		    changeCheckStart($(this));
		});
});

function changeCheckStart(el) {
	var el = el,
	    checkName = el.attr("name"),
	    checkId = el.attr("id"),
	    checkChecked = el.attr("checked"),
	    checkDisabled = el.attr("disabled"),
	    checkTab = el.attr("tabindex"),
	    checkValue = el.attr("value");

    if(checkChecked)
        el.after("<span class='niceCheck niceChecked'>" +
            "<input type='checkbox'"+
            "name='"+checkName+"'"+
            "id='"+checkId+"'"+
            "checked='"+checkChecked+"'"+
            "value='"+checkValue+"'"+
            "tabindex='"+checkTab+"' /></span>");
	else
    	el.after("<span class='niceCheck'>" +
            "<input type='checkbox'"+
            "name='"+checkName+"'"+
            "id='"+checkId+"'"+
             "value='"+checkValue+"'"+
            "tabindex='"+checkTab+"' /></span>");

    if(checkDisabled) {
        el.next().addClass("niceCheckDisabled");
        el.next().find("input").eq(0).attr("disabled","disabled");
	}

	el.next().on("click", function(e) { changeCheck($(this)) });
	el.parent().find('label').on('click', function(e) { changeCheck($(this).next('span'))});
	el.remove();
}

function changeCheck(el) {
	var el = el,
        input = el.find("input").eq(0);
           
    if(el.attr("class").indexOf("niceCheckDisabled")==-1)
    {   
        if(!input.attr("checked")) {
            el.addClass("niceChecked");
            input.attr("checked", true);
        } else {
            el.removeClass("niceChecked");
            input.attr("checked", false).focus();
        }
    }
}