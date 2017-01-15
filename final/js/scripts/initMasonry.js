define(['jquery', 'jquery.masonry', 'jquery.bridget'], function($, Masonry, jQueryBridget) {
    let isCleaned = false;

    jQueryBridget( 'masonry', Masonry, $ );

    return function(option) {
        if(option === 'init') {
            $('.discover_holiday_blocks').masonry({
                itemSelector: '.discover_holiday_block',
                columnWidth: '.grid_size',
                percentPosition: true
            });
        } else {
            $('.discover_holiday_blocks').masonry('destroy');
        }
    };
});
