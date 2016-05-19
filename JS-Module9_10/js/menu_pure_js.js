document.addEventListener( 'DOMContentLoaded', function () {
	var main_menu = document.querySelector('.main_menu');
	var main_lis = main_menu.children;
	var lis = main_menu.querySelectorAll('li');
    var submenu1 = document.querySelector('.submenu_level_1');
    var other_lis = submenu1.querySelectorAll('li');
    var ref_color;

    ref_color= window.getComputedStyle(submenu1, null).backgroundColor;

	for (var i = 0; i < main_lis.length; i++) {
		var li= main_lis[i];
		var span = document.createElement('span');

		if(li.querySelector("ul")) {
			span.innerHTML = '';
			span.innerHTML = '&#9660;';
			li.querySelector("a").appendChild(span);
		}

	};

	for (var j = 0; j < other_lis.length; j++) {
		var li= other_lis[j];
		var span = document.createElement('span');

		if(li.querySelector("ul")) {
			span.innerHTML = '';
			span.innerHTML = '&#9658;';
			li.querySelector("a").appendChild(span);
		}

	};

	addEventListenerNodeList(lis, "mouseenter", hoverMainDisplay);
	addEventListenerNodeList(lis, "mouseleave", hoverMainHide);

	function addEventListenerNodeList(list, event, fn) {
    	for (var i = 0, len = list.length; i < len; i++) {
        	list[i].addEventListener(event, fn, false);
    	}
	}

	function hoverMainDisplay(event) {
		var ul = event.target.querySelector("ul");
		if(ul) {
			ul.style.backgroundColor = ref_color;
			animateMenu(ul);
			ref_color = changeRed(ref_color, true);
		}
	}

	function hoverMainHide(event) {
		var ul = event.target.querySelector("ul"); 
		if(ul) {
			ul.style.display = 'none';
			ref_color = changeRed(ref_color, false);
		}
	}

	function animateMenu(el) {
		var menu_height = 225;
		el.style.height = 0;

		function linear(timeFraction) {
  			return timeFraction;
		}

		animate({
	        duration: 200,
	        timing: linear,
	        draw: function(progress) {
	          el.style.height = menu_height * progress + 'px';
	          if(progress > 0.7) {
				el.style.display = "block";
	          }
	        }
      	});
	}

	function changeRed(rgb_color, flag) {
		var matched_red = rgb_color.match(/\(\d+/g)[0];
		var new_red = +matched_red.split('(')[1];

		if(new_red < 255 && flag) {
			new_red = '(' + Math.min(new_red + 55, 255);	
		} else if (new_red > 0 && !flag) {
			new_red = '(' + Math.max(new_red - 55, 0);
		} else {
			new_red = '(' + new_red;
		}
		return rgb_color.replace(matched_red, new_red);
	}
}, false );