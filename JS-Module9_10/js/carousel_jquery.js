$(function() {
	var carousel = $('.jcarousel');
	var picture_index = 0;
	var isAnimated = false;
	var buttons = $('.jcarousel-pagination a');
	var img_width = carousel.find('img').first().width();
	var default_speed_scrolling  = 1000;
	var clicked_speed_scrolling = 500;
	var scroll_timer = 4000;
	var scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); }, 
													scroll_timer);

	buttons.on('click', scrollMultiple);
	$('.jcarousel-prev').on('click', moveBack);
	$('.jcarousel-next').on('click', moveNext);


	function scrollMultiple(e) {
		if(!isAnimated) {
			clearInterval(scroll_interval);

			var current_lis = $('.jcarousel li');
			var new_picture_index = buttons.index(this);
			var difference = Math.abs(new_picture_index - picture_index);
			var $this = $(this);

	        if ($this.data('activated')) return false; 

	        $this.data('activated', true);
	        setTimeout(function() {
	            $this.data('activated', false)
	        }, clicked_speed_scrolling); 

	        if( new_picture_index > picture_index) {
	        	isAnimated = true;
			    carousel.find('ul')
						.animate({left: -difference * img_width}, 
								clicked_speed_scrolling, 
								function() {
						    		current_lis.slice(0, difference).insertAfter(current_lis.last());
						    		$(this).css({left: 0});
						    		isAnimated = false;
								});
	        } else if (new_picture_index < picture_index) {
	        	current_lis.slice(-difference).insertBefore(current_lis.first());
	        	carousel.find('ul').css({left: -difference * img_width});
	        	isAnimated = true;
	        	carousel.find('ul')
	        			.animate({left: 0}, 
	        				clicked_speed_scrolling, isAnimated = false);
	        }
			picture_index = new_picture_index;
			activateButton();

			setTimeout(scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); }, 
														scroll_timer), 4);
	        e.preventDefault();
	    }
	}


	function moveBack(e) {
		if(!isAnimated) {
			clearInterval(scroll_interval);

			var $this = $(this);
	        if ($this.data('activated')) return false; 

	        $this.data('activated', true);
	        setTimeout(function() {
	            $this.data('activated', false)
	        }, default_speed_scrolling); 

			scrollprev(clicked_speed_scrolling);
			setTimeout(scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); },
														 scroll_timer), scroll_timer);
	    	e.preventDefault();
	    }
	}

	function moveNext(e) {
		if(!isAnimated) {
	    	clearInterval(scroll_interval);
	    	
	    	var $this = $(this);
	        if ($this.data('activated')) return false; 

	        $this.data('activated', true);
	        setTimeout(function() {
	            $this.data('activated', false)
	        }, default_speed_scrolling); 

	        scrollnext(clicked_speed_scrolling);

	    	setTimeout(scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); },
	    												 scroll_timer), scroll_timer);
	    	e.preventDefault();
	    }
	}

	function scrollnext(speed){
		var current_lis = $('.jcarousel li');
		picture_index++;
		if( picture_index > current_lis.length - 1) {
			picture_index = 0;
		}
		

		activateButton();
    	
    	isAnimated = true;
    	carousel.find('ul')
    			.animate({left: -img_width}, 
    					speed, 
    					function() {
				    		current_lis.first().insertAfter(current_lis.last());
				    		$(this).css({left: 0});
				    		isAnimated = false;
						});
	}

	function scrollprev(speed){
		var current_lis = $('.jcarousel li');

		picture_index--;

		if(picture_index < 0) {
			picture_index = current_lis.length - 1;
		}
		
		activateButton();

		current_lis.last().insertBefore(current_lis.first());
		carousel.find('ul').css({left: -img_width});
		isAnimated = true;
		carousel.find('ul')
    			.animate({left: 0}, speed, isAnimated = false);
    };

    function activateButton() {
    	buttons.eq(picture_index).addClass('active')
					  .siblings()
					  .removeClass('active');
    }


}); 