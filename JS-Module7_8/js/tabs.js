$(function() {
	$('.header li:first a').addClass('active');
    $('.text p:not(:first)').hide();

    var $links = $('.header a');

    $links.click(function(e) {
    	$links.removeClass('active');
    	$(this).addClass('active');
    	
    	$(".text p:visible")
    			.hide()
    			.css('font-size', '16px');

    	var index = $links.index($(this));
    	$(".text p").eq(index).animate({opacity:'show', fontSize:'17px'}, 300);
    	
    	e.preventDefault();
    });
})