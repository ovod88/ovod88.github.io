$(function() {
    var clock = new Clock(
        {
            seconds: $('#second_arrow'),
            minutes: $('#minute_arrow'),
            hours: $('#hour_arrow')
        }
    )

    $('button').click(function () {
        clock.start();
    })
});
