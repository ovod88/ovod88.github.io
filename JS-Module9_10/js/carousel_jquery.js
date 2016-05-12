$(function() {
	var carousel = $('.jcarousel');
	var picture_index = 0;
	var buttons = $('.jcarousel-pagination a');
	var img_width = carousel.find('img').first().width();
	var default_speed_scrolling  = 1000;
	var speed_when_clicked = 500;
	var scroll_timer = 4000;
	var scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); }, 
													scroll_timer);

	buttons.on('click', function(e) {
		clearInterval(scroll_interval);
		var current_lis = $('.jcarousel li');
		var new_picture_index = buttons.index(this);
		var difference = Math.abs(new_picture_index - picture_index);
		var $this = $(this);

        if ($this.data('activated')) return false; 

        $this.data('activated', true);
        setTimeout(function() {
            $this.data('activated', false)
        }, default_speed_scrolling); 

        if( new_picture_index > picture_index) {
		    carousel.find('ul')
					.animate({left: -difference * img_width}, 
							speed_when_clicked, 
							function() {
					    		current_lis.slice(0, difference).insertAfter(current_lis.last());
					    		$(this).css({left: 0});
							});
        } else if (new_picture_index < picture_index) {
        	current_lis.slice(-difference).insertBefore(current_lis.first());
        	carousel.find('ul').css({left: -difference * img_width});
        	carousel.find('ul')
        			.animate({left: 0}, 
        				speed_when_clicked);
        }
		picture_index = new_picture_index;
		activateButton();

		setTimeout(scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); }, 
													scroll_timer),default_speed_scrolling);
        e.preventDefault();
    });


	$('.jcarousel-prev').click(function(e) {
		clearInterval(scroll_interval);

		var $this = $(this);
        if ($this.data('activated')) return false; 

        $this.data('activated', true);
        setTimeout(function() {
            $this.data('activated', false)
        }, default_speed_scrolling); 

		scrollprev(speed_when_clicked);
		setTimeout(scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); },
													 scroll_timer), scroll_timer);
    	e.preventDefault();
	});

	$('.jcarousel-next').click(function(e) {
    	clearInterval(scroll_interval);
    	
    	var $this = $(this);
        if ($this.data('activated')) return false; 

        $this.data('activated', true);
        setTimeout(function() {
            $this.data('activated', false)
        }, default_speed_scrolling); 

        scrollnext(speed_when_clicked);

    	setTimeout(scroll_interval = setInterval(function() {  scrollnext(default_speed_scrolling); },
    												 scroll_timer), scroll_timer);
    	e.preventDefault();
	});

	function scrollnext(speed){
		var current_lis = $('.jcarousel li');
		picture_index++;
		if( picture_index > current_lis.length - 1) {
			picture_index = 0;
		}
		

		activateButton();
    	
    	carousel.find('ul')
    			.animate({left: -img_width}, 
    					speed, 
    					function() {
				    		current_lis.first().insertAfter(current_lis.last());
				    		$(this).css({left: 0});
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
		carousel.find('ul')
    			.animate({left: 0}, speed
    			)
    };

    function activateButton() {
    	buttons.eq(picture_index).addClass('active')
					  .siblings()
					  .removeClass('active');
    }


}); 