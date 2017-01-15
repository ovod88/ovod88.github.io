define(['../scripts/globals' , 'jquery', '../scripts/initMasonry'], function(globals, $, initMasonry) {

    return function () {
        let activeRequests = 0;

        $('.discover_holiday_block_content').each(function() {
            let $imageBlock = $(this),
                category = $(this).data('category');

            activeRequests++;

            $.ajax({
                    url: `https://pixabay.com/api/?key=4214596-4796665cc8384e50741647005&q=${category}
                                                                                &image_type=photo&per_page=${ globals.imageNumbers }`,
                    dataType: 'json'
                })
                .then(function (data) {
                        $imageBlock.css({
                            'background': `url(${data.hits[Math.floor((Math.random() * globals.imageNumbers))].webformatURL}) no-repeat center center`,
                            'background-size': 'cover'
                        });
                        $imageBlock.parent().css('display', 'block');
                        syncMasonry(--activeRequests);
                    },
                    function () {
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
                            default:
                                $imageBlock.css({
                                    'background': 'grey'
                                });
                                break;
                        }
                        $imageBlock.parent().css('display', 'block');
                        syncMasonry(--activeRequests);
                    });
        });

        function syncMasonry(activeSessions) {
            if(!activeSessions) {
                initMasonry();
            }
        }
    };
});
