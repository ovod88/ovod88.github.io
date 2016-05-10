$(function() {
	var carousel = $('.jcarousel');
	var img_width = carousel.find('img').first().width();
	var scrolling_timer = 1000;
	var scroll_timer = 4000;
	var scroll_interval = setInterval(scrollnext, scroll_timer);

	$('.jcarousel-prev').click(function(e) {
		clearInterval(scroll_interval);
		scrollprev();
		setTimeout(scroll_interval = setInterval(scrollnext, scroll_timer), scroll_timer);
    	e.preventDefault();
	});

	$('.jcarousel-next').click(function(e) {
    	clearInterval(scroll_interval);
    	scrollnext();
    	setTimeout(scroll_interval = setInterval(scrollnext, scroll_timer), scroll_timer);
    	e.preventDefault();
	});

	function scrollnext(){
		var lis = $('.jcarousel li');
    	carousel.find('ul')
    			.animate({left: -img_width}, 
    					scrolling_timer, 
    					function() {
				    		lis.first().insertAfter(lis.last());
				    		$(this).css({left: 0});
						});
	}

	function scrollprev(){
		var lis = $('.jcarousel li');
		lis.last().insertBefore(lis.first());
		carousel.find('ul').css({left: -img_width});
		carousel.find('ul')
    			.animate({left: 0}, scrolling_timer)};
}); 