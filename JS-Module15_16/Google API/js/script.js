'use strict';
$(function() {
	var $search_box = $('.search_box');
	var $search_input = $search_box.find('input');
	var activateSearchLine = function(e) {
		$search_box.addClass('highlighted');
		$search_box.removeClass('hovered');
		e.stopPropagation();
	};

	$search_input.click(activateSearchLine).focus(activateSearchLine);

	$(window).click(function() {
		$search_box.removeClass('highlighted');
	});

	$search_box.hover(function() {
		if($(this).hasClass('highlighted')) {
			return;
		} else {
			$(this).addClass('hovered');
		}
	}, function() {
		$(this).removeClass('hovered');
	});

	$('.transliteracja').hover(function() {
        	$(this).find("em").show();
    	}, function() {
        	$(this).find("em").hide();
    });



    function VirtualClavier(language) {
    	if(language == 'uk') {
    		
    	}
    }
})