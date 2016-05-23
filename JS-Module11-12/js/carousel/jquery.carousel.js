(function ($) {

	var currentLeftValue, elementsCount, list, minimumOffset, maximumOffset, settings;

	var methods = {
		init : function (options) {
			var defaults = {
				pixelsOffset : 130,
	    		visibleNumber : 3,
			};

			settings = $.extend( defaults, options);

	    	list = $(this).find('.carousel-list');
	    	var carousel_visible = $(this).find('.carousel-visible').css('width', settings.visibleNumber * settings.pixelsOffset);
	    	currentLeftValue = 0;
	    	elementsCount = list.find('li').length;
	    	minimumOffset = - ((elementsCount - settings.visibleNumber) * settings.pixelsOffset);
	    	maximumOffset = 0;	
		},
		right : function () {
			this.on('click.carousel', function() {
				if (currentLeftValue != minimumOffset) {
            		currentLeftValue -= settings.pixelsOffset;
            		list.animate({ left : currentLeftValue + "px"}, 500);
        		} 
			})
		},
		left : function() {
			this.on('click.carousel', function() {
				if (currentLeftValue != maximumOffset) {
            		currentLeftValue += settings.pixelsOffset;
            		list.animate({ left : currentLeftValue + "px"}, 500);
        		}    
			})
		}
	};

	$.fn.carousel = function(income) {

		if( typeof income === 'object' || ! income) {
			methods.init.apply(this, arguments);
		} else if (methods[income]) {
			methods[income].apply(this, Array.prototype.slice.call( arguments, 1 ));
		}
	};

} (jQuery));