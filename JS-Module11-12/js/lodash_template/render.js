$(function() {

	var user = {
		full_name : 'Христенко Владимир Игоревич',
		photo_path : 'img/My_photo.jpg',
		slogan : 'По жизни всегда студент',
		motives : ['Хорошо платят','Заставляет немного думать','Можно что-то творить как художник', 'Люблю это дело'],
		phone : '+48694703251',
		vk_link : 'http://vk.com/id6093452',
		feedback : 'Научите меня творить'
	};

	$('body').append(_.template($(profile_tmpl).html()) (user));
});