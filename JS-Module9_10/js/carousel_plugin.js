$(function() {
	$('.jcarousel').jcarousel()
		.jcarousel({
    		wrap: 'circular'
		})
		.jcarouselAutoscroll({
			interval: 5000
		});

	$('.jcarousel-prev').click(function(e) {
    	$('.jcarousel').jcarousel('scroll', '-=1');
    	e.preventDefault();
	});

	$('.jcarousel-next').click(function(e) {
    	$('.jcarousel').jcarousel('scroll', '+=1');
    	e.preventDefault();
	});

	$('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .on('click', function(e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
		});
});