$(function() {
	$('.header li:first a').addClass('active');
    $('.text p:not(:first)').hide();

    var $links = $('.header a');

    $links.click(function(e) {
    	$links.removeClass('active');
    	$(this).addClass('active');

    	var index = $links.index($(this));
    	$(".text p").hide().css('font-size', '16px').eq(index).animate({opacity:'show', fontSize:'17px'}, 300);
    	
    	e.preventDefault();
    });
});