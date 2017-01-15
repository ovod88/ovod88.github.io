define(['jquery', 'lodash', '../scripts/loadImages'], function($, _, loadImages) {
    let template = _.template($('#discover_holiday_block_template').html()),
        discoverHolidayBlocks = $('.discover_holiday_blocks');

    return function(categories) {
        $('.discover_holiday_block').remove();

        for(let i = 0; i < categories.length; i++) {
            for(let category in categories[i]) {
                discoverHolidayBlocks.append(template({
                    category: category,
                    text:categories[i][category]
                }))
            }
        }
        loadImages();
    };
});
