define(['../scripts/globals' , 'jquery', 'lodash','../scripts/initMasonry'], function(globals, $, _, initMasonry) {
    let template = _.template($('#discover_holiday_block_template').html()),
        discoverHolidayBlocks = $('.discover_holiday_blocks'),
        atLeastOnePictureLoaded = true,
        $errormessage = $('.discover_holiday_search_box__link__error'),
        activeRequests = 0;

    function initialLoad(categories) {

        for(let i = 0; i < categories.length; i++) {
            for(let category in categories[i]) {
                activeRequests++;
                $.ajax({
                        url: `https://pixabay.com/api/?key=4214596-4796665cc8384e50741647005&q=${category}
                                                                                &image_type=photo&per_page=${ globals.imageNumbers }`,
                        dataType: 'json'
                    })
                    .then(function (data) {
                            if (data.hits.length) {
                                $(template({
                                    category: category,
                                    text: categories[i][category]
                                })).appendTo(discoverHolidayBlocks)
                                    .css('display', 'block')
                                    .find('.discover_holiday_block_content')
                                    .css({
                                        'background': `url(${data.hits[Math.floor((Math.random() * globals.imageNumbers))].webformatURL})
                                                                                                                        no-repeat center center`,
                                        'background-size': 'cover'
                                    });
                            }
                            syncMasonry(--activeRequests, 'init');
                        },
                        function () {
                            switch (category) {
                                case 'sport':
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'url("img/dist/Sport_and_avctivity_pic.jpg") no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'health':
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'url("img/dist/Welness_and_health_pic.jpg") no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'extreme':
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'url("img/dist/Extreme_sports_expeditions_pic.jpg") no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'games':
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'url("img/dist/Games_pic.jpg") no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'culture':
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'url("img/dist/Culture_education_pic.jpg") no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'relaxation':
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'url("img/dist/Relaxation.jpg") no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'travelling':
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'url("img/dist/Travelling.jpg") no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                default:
                                    $(template({
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'grey'
                                        });
                                    break;
                            }
                            syncMasonry(--activeRequests, 'init');
                        });
            }
        }
    }

    function loadPartner(category) {
        activeRequests++;
        $.ajax({
                url: `https://pixabay.com/api/?key=4214596-4796665cc8384e50741647005&q=${category}
                                                                                &image_type=photo&per_page=${ globals.maxImagesNumber }`,
                dataType: 'json'
            })
            .then(function (data) {
                    if (data.hits.length) {
                        $errormessage.hide('slow');
                        if (atLeastOnePictureLoaded) {
                            syncMasonry(null, 'destroy');
                            $('.discover_holiday_block').remove();
                            atLeastOnePictureLoaded = false;
                        }
                        for(let i = 0; i < globals.maxImagesNumber; i++) {
                            $(template({
                                category: category,
                                text: category
                            })).appendTo(discoverHolidayBlocks)
                                .css('display', 'block')
                                .find($('.discover_holiday_block_content'))
                                .css({
                                    'background': `url(${data.hits[i].webformatURL}) no-repeat center center`,
                                    'background-size': 'cover'
                                });
                        }
                        syncMasonry(--activeRequests, 'init');
                    } else {
                        $errormessage.text('Unfortunately - no partners for your request');
                        $errormessage.show('slow');
                        activeRequests--;
                    }
                },
                function () {
                    $errormessage.text('Error accessing server');
                    $errormessage.show('slow');
                });
    }

    function syncMasonry(activeSessions, option) {
        if(activeSessions != null) {
            if (!activeSessions) {
                atLeastOnePictureLoaded = true;
                initMasonry(option);
            }
        } else {
            initMasonry(option);
        }
    }

    return function (categories) {
        if(Array.isArray(categories)) {
            initialLoad(categories);
        } else {
            loadPartner(categories);
        }
    }
});
