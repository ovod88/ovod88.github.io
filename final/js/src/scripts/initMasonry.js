define(['jquery', 'jquery.masonry', 'jquery.bridget'], function($, Masonry, jQueryBridget) {

    jQueryBridget( 'masonry', Masonry, $ );

    return function(option) {
        if(option === 'init') {
            $('.discover_holiday_blocks').masonry({
                itemSelector: '.discover_holiday_block',
                percentPosition: true
            });
            console.log('Masonry initiated');
        } else {
            $('.discover_holiday_blocks').masonry('destroy');
            console.log('Masonry destroyed');
        }
    };
});
