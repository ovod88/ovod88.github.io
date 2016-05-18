document.addEventListener( 'DOMContentLoaded', function () {
	var main_menu = document.querySelector('.main_menu');
	var main_lis = main_menu.children;
	var span = document.createElement('span');
    var submenu1 = document.querySelector('.submenu_level_1');
    var submenu2 = document.querySelector('.submenu_level_2');
    var submenu3 = document.querySelector('.submenu_level_3');
    var ref_color;

    ref_color= window.getComputedStyle(submenu1, null).backgroundColor;

	for (var i = 0; i < main_lis.length; i++) {
		var li= main_lis[i];

		if(li.querySelector("ul")) {
			span.innerHTML = '';
			span.innerHTML = '&#9660;';
			li.querySelector("a").appendChild(span);
		}

	};

	addEventListenerNodeList(main_lis, "mouseenter", hoverDisplay);
	addEventListenerNodeList(main_lis, "mouseleave", hoverHide);



	function addEventListenerNodeList(list, event, fn) {
    	for (var i = 0, len = list.length; i < len; i++) {
        	list[i].addEventListener(event, fn, false);
    	}
	}

	function hoverDisplay(event) {
		console.log('TARGET SHOWN', event.target);
		var ul = event.target.querySelector("ul");
		if(ul) {
			ul.style.backgroundColor = ref_color;
			ref_color = changeRed(ref_color, true);
			animateMenu(ul);
		}
	}

	function hoverHide(event) {
		console.log('TARGET HIDEN', event.target);
		var ul = event.target.parentNode.querySelector("ul"); 
		if(ul) {
			ref_color = changeRed(ref_color, false);
			ul.style.display = 'none';
		}
	}

	function animateMenu(el) {
		var menu_height = 225;
		el.style.height = 0;
		el.style.display = "block";

		function linear(timeFraction) {
  			return timeFraction;
		}

		animate({
	        duration: 200,
	        timing: linear,
	        draw: function(progress) {
	          el.style.height = menu_height * progress + 'px';
	        }
      	});
	}

	function changeRed(rgb_color, flag) {
		var matched_red = rgb_color.match(/\(\d+/g)[0];
		var new_red = +matched_red.split('(')[1];

		if(new_red < 255 && flag) {
			new_red = '(' + Math.min(new_red + 75, 255);	
		} else if (new_red > 0 && !flag) {
			new_red = '(' + Math.min(new_red - 75, 0);
		} else {
			new_red = '(' + new_red;
		}
		console.log(rgb_color.replace(matched_red, new_red));
		return rgb_color.replace(matched_red, new_red);
	}
}, false );