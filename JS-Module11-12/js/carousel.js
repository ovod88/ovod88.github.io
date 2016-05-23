$(function() {
    $('.wrapper').carousel({
        visibleNumber : 2
    });

    var leftarrow = $('.wrapper').find('.carousel-arrow-left');
    leftarrow.carousel('left');
    var rightarrow = $('.wrapper').find('.carousel-arrow-right');
    rightarrow.carousel('right');

    $('button').click(function() {
        leftarrow.off('.carousel');
        rightarrow.off('.carousel');//turns off only listeners provided by plugin. All other listeners work
    });

});