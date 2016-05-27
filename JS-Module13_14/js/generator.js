'use strict';
function Test() {
	var dbkey;
	var questions;
	var answers;
	var content;

	this.init = function(data, key) {
		dbkey = key;
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement('div');
		var template_code = document.getElementById("test_template").innerHTML;
		var content;

		content = JSON.parse(checkStorage(key));
		div.innerHTML = _.template(template_code) (data);

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
	};

	this.checkAnswers = function(e) {
		e.preventDefault();
		
		content = getContentFromDB(dbkey);
		var list = document.querySelector('.questions');
		questions = list.getElementsByTagName("li");

		if(content.type == 'single_answer') {
			answers = singleChoices.call(this, questions);
		} else if(content.type == 'multi') {

		}

		checkResults.call(this, answers);
	}

	function getContentFromDB(dbkey) {
		return JSON.parse(localStorage[dbkey]);
	}

	function singleChoices (questions) {
		var isReadyAnswered = false;
		var answers = {};

		for( var i = 0; i < questions.length; i++ ) {
			var variants = questions[i].getElementsByTagName('label');
			answers[i] = [];
			for( var j = 0; j < variants.length; j++) {
				if (variants[j].querySelector('input').checked) {
					if(isReadyAnswered) {
						alert('You picked more answers then allowed...');
						this.reset();
						return;
					} else {
						isReadyAnswered = true;
						answers[i].push(j);
					}
				}
			}
			if( typeof answers[i] === 'undefined' || answers[i] === null ) {
				alert('Some questions no answered!!');
				this.reset(questions);
				return;
			}
			isReadyAnswered = false;
		}
		return answers;
	}

	function checkResults() {
		var correctAnswers = 0;
		var wrongAnswers = 0;
		var isOk = true;

		for( var key in answers) {
			var length = answers[key].length;
			for(var i = 0; i < length; i++) {
				if(answers[key][i] == content.questions[key].correct_answer[i]) {
					correctAnswers++;
				} else {
					wrongAnswers++;
				}
			}
		}

		if (wrongAnswers) {
			isOk = false;
		}
		if(isOk) {
			alert('It is ok!\n' + 'Correct answers: ' + correctAnswers + '\n' 
							+ 'Wrong answers: ' + wrongAnswers);
		} else {
			alert('It is wrong!\n' + 'Correct answers: ' + correctAnswers + '\n' 
							+ 'Wrong answers: ' + wrongAnswers);
		}

		this.reset();
	}

	this.clear = function() {
		localStorage.removeItem(dbkey);
	}

	this.reset = function() {
		for( var i = 0; i < questions.length; i++ ) {
			var variants = questions[i].getElementsByTagName('label');

			for( var j = 0; j < variants.length; j++) {
				var input = variants[j].querySelector('input');
				if (input.checked) {
					input.checked = false;
				}
			}
		}
	}	
}
