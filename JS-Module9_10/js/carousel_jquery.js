$(function() {
	var carousel = $('.jcarousel');
	var img_width = carousel.find('img').first().width();
	var scroll_timer = 1000;

	console.log(carousel.width());

	setTimeout(function scrollback(){
			var lis = $('.jcarousel li');
        	carousel.find('ul')
        			.animate({
        				left: -img_width
        			}, scroll_timer, function() {
									    lis.first().insertAfter(lis.last());
									    $(this).css({left: 0});
									    setTimeout(scrollback, 3000);
  									});
	},3000);

}); 