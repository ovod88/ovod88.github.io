$(function(){
	var $submenu1 = $('.submenu_level_1');
	var $submenu2 = $('.submenu_level_2');
	var $submenu3 = $('.submenu_level_3');
	var ref_color;

	ref_color = $submenu1.css('background-color');

	$('.main_menu>li').each(function() {
		$(this).has('ul').children('a').append('<span>&#9660;</span>');
	});
	$('.submenu_level_1 li').each(function() {
		$(this).has('ul').children('a').append('<span>&#9658;</span>');
	});
	
	$('.main_menu li').hover(
		function() {
			ref_color = changeRed(ref_color, true);
			$(this).children('ul').slideDown('fast').css('background-color', ref_color);
		},
		function() {
			ref_color = changeRed(ref_color, false);
			$(this).children('ul').slideUp('fast').css('background-color', ref_color);
		}
	);

	function changeRed(rgb_color, flag) {
		var matched_red = rgb_color.match(/\(\d+/g)[0];
		var new_red = +matched_red.split('(')[1];

		if(new_red < 255 && flag) {
			new_red = '(' + (new_red + 50);	
		} else if (new_red > 0 && !flag) {
			new_red = '(' + (new_red - 50);
		} else {
			new_red = '(' + new_red;
		}

		return rgb_color.replace(matched_red, new_red);
	}
});