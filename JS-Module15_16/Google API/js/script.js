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

	$('.transliteracja a').click(function(event) {
		event.stopPropagation();
		var clavier = new VirtualClavier('uk');
		clavier.init();		
	});

    function VirtualClavier(language) {
    	var isCapslockOn = false;
    	var isShiftOn = false;

    	var content = {
    		'name': 'Екранна клавіатура',
    		'line_first' : ["'", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='],
    		'line1_first_alt' : ["₴", '!', '"', '№',';', '%', ':', '?', '*', '(', ')', '_', '+']

    	}
    	if(language == 'uk') {
    		content['second_line'] = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї', 'ґ'];
    		content['third_line'] = ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є'];
    		content['fourth_line'] = ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'];
    	}

    	this.init = function() {
    		$('body').append(_.template($('#clavier_template').html()) (content));
    		$('<link rel="stylesheet" href="css/vClavier.css" type="text/css" />').insertAfter($('link'));

    		launchHandlers();
    	}

    	function launchHandlers() {	
    		$('.vClavier-line').click(function(event) {
    			event.stopPropagation();
    			var $this = $(event.target), character;
    			$this.mousedown(function() {
        				$this.css('border', '1px inset #aaa'); 
        			}).mouseup(function() {
        				$this.css('border', '1px solid #aaa'); 
        		});
        		if($this.is('li.letter') && $search_box.hasClass('highlighted')) {
        			character = $.trim($this.html());
					$search_input.val( $search_input.val() + character );
        		}
			});

			$('.vClavier-closebutton').click(function() {
				$(this).parents('.vClavier').remove();
			});

			$('.vClavier-lines--header').hover(function() {
				$(this).parents('.vClavier').draggable(
					{containment: 'window'}
				);
			});
    	}
    }
})