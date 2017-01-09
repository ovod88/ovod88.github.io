define(['jquery', '../scripts/initMasonry'], function($, initMasonry) {
    let ajaxRequests = [];

    console.log('LOAD inited');
    $('.discover_holiday_block_content').each(function() {
        let $imageBlock = $(this),
            category = $(this).data('category'),
            ajaxRequest;

        ajaxRequest = $.ajax({
            url: `https://pixabay2.com/api/?key=4214596-4796665cc8384e50741647005&q=${category}
                                                                                &image_type=photo&per_page=10`,
            dataType: 'json'
        });
        ajaxRequests.push(ajaxRequest);


        ajaxRequest.then(function (data) {
                $imageBlock.parent().css('display', 'block');
                $imageBlock.css({
                    'background': `url(${data.hits[Math.floor((Math.random() * 10))].webformatURL}) no-repeat center center`,
                    'background-size': 'cover'
                });
            },
            function () {
                console.log('Failed function loaded');
                $imageBlock.parent().css('display', 'block');

                switch (category) {
                    case 'sport':
                        $imageBlock.css({
                            'background': 'url("img/dist/Sport_and_avctivity_pic.jpg") no-repeat center center',
                            'background-size': 'cover'
                        });
                        break;
                    case 'health':
                        $imageBlock.css({
                            'background': 'url("img/dist/Welness_and_health_pic.jpg") no-repeat center center',
                            'background-size': 'cover'
                        });
                        break;
                    case 'extreme':
                        $imageBlock.css({
                            'background': 'url("img/dist/Extreme_sports_expeditions_pic.jpg") no-repeat center center',
                            'background-size': 'cover'
                        });
                        break;
                    case 'games':
                        $imageBlock.css({
                            'background': 'url("img/dist/Games_pic.jpg") no-repeat center center',
                            'background-size': 'cover'
                        });
                        break;
                    case 'culture':
                        $imageBlock.css({
                            'background': 'url("img/dist/Culture_education_pic.jpg") no-repeat center center',
                            'background-size': 'cover'
                        });
                        break;
                    case 'relaxation':
                        $imageBlock.css({
                            'background': 'url("img/dist/Relaxation.jpg") no-repeat center center',
                            'background-size': 'cover'
                        });
                        break;
                    case 'travelling':
                        $imageBlock.css({
                            'background': 'url("img/dist/Travelling.jpg") no-repeat center center',
                            'background-size': 'cover'
                        });
                        break;
                }
            });
    });
    //$.when(...ajaxRequests).always(function() {//TODO
    //    console.log('HERE');
    //   initMasonry();
    //});
});
