define(['jquery', 'jquery.masonry', 'jquery.bridget'], function($, Masonry, jQueryBridget) {
    jQueryBridget( 'masonry', Masonry, $ );

    return function() {
        $('.discover_holiday_blocks').masonry({
            itemSelector: '.discover_holiday_block',
            columnWidth: '.grid_size',
            percentPosition: true
        });
        console.log('Masonry inited');
    };
});
