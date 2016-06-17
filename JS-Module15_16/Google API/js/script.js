'use strict';
$(function() {
	var $search_box = $('.search_box');
	var $search_input = $search_box.find('input');
	var clavier;
	var watchInputInterval = setInterval(watchTextbox, 300);

	var activateSearchLine = function(e) {
		$search_box.addClass('highlighted');
		$search_box.removeClass('hovered');
		e.stopPropagation();
	};

	var clavier;
	var watchInputInterval = setInterval(watchTextbox, 300);

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

	function askBing() {
		var azureKey = btoa(':8IyMlq81z0M+RY63ZD4TyXP2Il8Fye8c83AgkXxM1NE');
    	var myUrl = 'https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27' + $search_input.val() + '%27' + '&$format=json';

    	if($search_input.val() && $search_input.val().trim().length) {
			$.ajax({
	      		method: 'post',
		     	url: myUrl,
		      	headers: {
		        	'Authorization': 'Basic ' + azureKey
		      	},
		      	success: function(data) {
		      		var ul;

		      		if($('.result').length) {
		      			ul = $('.result');
		      			ul.html('');
		      			ul = ul[0];
		      		} else {
			        	ul = document.createElement("ul");
			        	ul.className = 'result';
		      		}
				    $.each(data.d.results, function(i, val){
				            var li = document.createElement("li");
				            li.innerHTML = '<p class="title">' + '<a href="' + val.Url + '">'+ val.Title +
				            			'</a>' + '</p>' + '<p class = "url">' + 
				            				val.Url +'</p>' + '<p class="description">' + val.Description + '</p>';                         
				            ul.appendChild(li);
				    });
				    $('body').append(ul);
		      	}
		    });
    	}
	}

	function watchTextbox() {
		if($search_input.val()) {
			var $default_search = $('#default_search');
			$default_search.removeAttr('id').attr('id', 'search').attr('class', 'clearfix');
			$default_search.find('.logo img, .logo span').remove();
			$default_search.find('.buttons button').html('<span></span>');
			clearInterval(watchInputInterval);
			$(document).keypress(function(e) {
    			if(e.which == 13) {
        			askBing();
    			}
			});

			$('.buttons').click(function(e) {
        		askBing();
			});
		}
	}

	$('.transliteracja').hover(function() {
        	$(this).find("em").show();
    	}, function() {
        	$(this).find("em").hide();
    });

	$('.transliteracja a').click(function(event) {
		event.stopPropagation();
		clavier = new VirtualClavier('uk');
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

    		launchHandlers(this);
    	}

    	function launchHandlers(instance) {	
    		$('.vClavier-line').click(function(event) {
    			event.stopPropagation();
    			var $this = $(event.target).is('li') ? $(event.target) : $(event.target).parent(), character;
    			$this.mousedown(function() {
        				$this.css('border', '1px inset #aaa'); 
        			}).mouseup(function() {
        				$this.css('border', '1px solid #aaa'); 
        		});
        		if($this.is('li.letter') && $search_box.hasClass('highlighted')) {
        			character = $.trim($this.html());
					$search_input.val( $search_input.val() + character );
        		}
        		if($this.is('li.capslock')) {
        			if(!isCapslockOn) {
        				$this.css('border', '1px inset #aaa'); 
        				isCapslockOn = true;
        				$this.parents('.vClavier').find('li.letter').each(function() {
        					$(this).text($(this).text().toUpperCase());
        				});
        			} else {
        				$this.css('border', '1px solid #aaa');
        				$this.parents('.vClavier').find('li.letter').each(function() {
        					$(this).text($(this).text().toLowerCase());
        				});
        				isCapslockOn = false;
        			}
        		}
        		if($this.is('li.shift')) {
        			if(!isShiftOn) {
        				$this.css('border', '1px inset #aaa'); 
        				isShiftOn = true;
        				$this.parents('.vClavier').find('li.letter').each(function() {
        					$(this).text($(this).text().toUpperCase());
        				});
        				$(this).parents('.vClavier')
        									.find('.vClavier-line')
        									.eq(1).find('li.letter')
        									.each(function(index) {
        										$(this).html(content['line1_first_alt'][index]);
        									});
        			} else {
        				$this.css('border', '1px solid #aaa');
        				$this.parents('.vClavier').find('li.letter').each(function() {
        					$(this).text($(this).text().toLowerCase());
        				});
        				isShiftOn = false;
        				$(this).parents('.vClavier')
        									.find('.vClavier-line')
        									.eq(1).find('li.letter')
        									.each(function(index) {
        										$(this).html(content['line_first'][index]);
        									});
        			}
        		}
        		if($this.is('.space')) {
        			$search_input.val( $search_input.val() + ' ' );
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