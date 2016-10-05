(function ($) {

	var currentLeftValue, list, minimumOffset, maximumOffset, settings, lButton, rButton;

	var methods = {
		init : function (options) {
			var defaults = {
				pixelsOffset : 130,
	    		visibleNumber : 3
			};

			settings = $.extend({}, defaults, options);

	    	list = this.find('.carousel-list');
	    	this.css('width', settings.visibleNumber * settings.pixelsOffset);

	    	currentLeftValue = 0;
	    	minimumOffset = - ((list.find('li').length - settings.visibleNumber) * settings.pixelsOffset);
	    	maximumOffset = 0;	
		},
		right : function () {
			rButton = this;
			this.on('click.carousel', function() {
				if (currentLeftValue != minimumOffset) {
            		currentLeftValue -= settings.pixelsOffset;
            		list.animate({ left : currentLeftValue + "px"}, 500);
        		} 
			})
		},
		left : function() {
			lButton = this;
			this.on('click.carousel', function() {
				if (currentLeftValue != maximumOffset) {
            		currentLeftValue += settings.pixelsOffset;
            		list.animate({ left : currentLeftValue + "px"}, 500);
        		}    
			})
		},
		stop : function() {
			lButton.off('.carousel');
			rButton.off('.carousel');
		}
	};

	$.fn.carousel = function(param) {

		if( typeof param === 'object' || ! param) {
			methods.init.apply(this, arguments);
		} else if (methods[param]) {
			methods[param].apply(this, Array.prototype.slice.call( arguments, 1 ));
		}
	};

} (jQuery));