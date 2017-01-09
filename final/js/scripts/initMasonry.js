define(['jquery', 'jquery.masonry', 'jquery.bridget'], function($, Masonry, jQueryBridget) {
    return function() {
        jQueryBridget( 'masonry', Masonry, $ );
        $('.discover_holiday_blocks').masonry({
            itemSelector: '.discover_holiday_block',
            columnWidth: '.grid_size',
            percentPosition: true
        });
        console.log('MAsonry inited');
    };
});
