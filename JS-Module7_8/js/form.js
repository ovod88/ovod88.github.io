;$(function() {
	$('input').on('mouseover', function() {
		$(this).next('em').animate({ opacity: "show" }, "slow");
	});

	$('input').on('mouseout', function() {
		$(this).next('em').animate({ opacity: "hide" }, "slow");
	});

	$('button').on('click', function() {
		$('em')
			.animate({ opacity: "show" }, "slow");
	});
});