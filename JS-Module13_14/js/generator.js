'use strict';
var content = {
	test_title : 'test',
	questions : [
		{
			question : 'Сколько тебе лет?',
			answers : ['I am 22 years old','I am 23 years old']
		}, {
			question : 'Сколько маме лет?',
			answers : ['She is 40 years old', 'She is 41 years old', 'She is 42 years old', 'She is 43 years old']
		}, {
			question : 'Сколько брату лет?',
			answers : ['He is 30','He is 31', 'He is 32', 'He is 33','He is 34','He is 35','He is 36']
		}
	]
};


(function(data, key){
	var body = document.getElementsByTagName("body")[0];
	var div = document.createElement('div');
	var template_code = document.getElementById("test_template").innerHTML;
	var content;

	content = JSON.parse(checkStorage(key));
	div.innerHTML = _.template(template_code) (content);

	while (div.children.length > 0) {
    	body.appendChild(div.children[0]);
  	}

  	function checkStorage(key) {
		if(!localStorage[key]) {
			try {
				localStorage.setItem(key, JSON.stringify(data));
			} catch (err) {
				alert('Write to localStorage denied : ' + err);
			}
		}

		return localStorage[key];
  	} 

})(content, 'test_content');