$(function(){
	$('.main_menu>li').each(function() {
		$(this).has('ul').children('a').append('<span>&#9660;</span>');
	});
	$('.submenu_level_1 li').each(function() {
		$(this).has('ul').children('a').append('<span>&#9658;</span>');
	});
	
	$('.main_menu li').hover(
		function() {
			$(this).children('ul').slideDown('fast');
		},
		function() {
			$(this).children('ul').slideUp('fast');
		}
	);
});