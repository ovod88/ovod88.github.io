$(function() {
    $('.carousel').carousel({
        visibleNumber : 2
    });

    $('.carousel-arrow-left').carousel('left');
    $('.carousel-arrow-right').carousel('right');

    $('button').click(function() {
        $('.carousel').carousel('stop');//turns off only listeners provided by plugin. All other listeners work
    });
});