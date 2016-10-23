$.fn.rotate = function(options) {
    var $this = $(this),
        settings = $.extend({
        startDeg: false,
        endDeg: 360,
        easing: 'linear'
    }, options),
        prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];

    function supports(prop) {
        var isSupport=false,
            style=document.createElement('div').style;

        $.each(prefixes, function(i, prefix) {
            if (style[prefix.replace(/\-/g, '')+prop]==='') {
                isSupport=true;
            }
        });
        return isSupport;
    }

    supports.transform = supports('Transform');
    supports.transition = supports('Transition');




    $this.css({'transform' : 'rotate('+ settings.endDeg +'deg)'});

    return $this;
};