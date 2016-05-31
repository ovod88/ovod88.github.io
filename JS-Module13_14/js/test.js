'use strict';
function Test() {
	var questions;
	var answers;
	var content;

	this.init = function(data) {
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement('div');
		var template_code = document.getElementById("test_template").innerHTML;
		content = data;

		div.innerHTML = _.template(template_code) (content);

		while (div.children.length > 0) {
	    	body.appendChild(div.children[0]);
	  	}

	};

	this.checkAnswers = function(e) {
		e.preventDefault();

		var list = document.querySelector('.questions');
		questions = list.getElementsByTagName("li");

		if(content.type == 'single_answer') {
			answers = singleChoices.call(this, questions);
		} else if(content.type == 'multi') {
			answers = multiChoices.call(this, questions);
		}
		if(answers) {
			checkResults.call(this, answers);	
		}
	}

	function multiChoices(questions) {
		var answers = {};
		
		for( var i = 0; i < questions.length; i++ ) {
			var variants = questions[i].getElementsByTagName('label');
			answers[i] = [];
			for( var j = 0; j < variants.length; j++) {
				if (variants[j].querySelector('input').checked) {
					answers[i].push(j);
				}
			}
			
			if(!ifAnswers.call(this, answers[i])) {
				return;
			} 
		}

		return answers;
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
			
			if(!ifAnswers.call(this, answers[i])) {
				return;
			} 
			isReadyAnswered = false;
		}

		return answers;
	}

	function ifAnswers(answer) {
		if(answer.length == 0) {
			alert('Some questions not answered!!');
			this.reset();
			return false;
		} else {
			return true;
		}
	}

	function checkResults() {
		var correctAnswers = 0;
		var wrongAnswers = 0;
		var isOk = true;

		for( var key in answers) {
			var length_answers = answers[key].length;
			var length_correct_answers = content.questions[key].correct_answer.length;

			if(length_answers != length_correct_answers) {
				isOk = false;
				correctAnswers = 0;
				wrongAnswers = 0;
				break;
			}

			for(var i = 0; i < length_answers; i++) {
				if(answers[key][i] == content.questions[key].correct_answer[i]) {
					correctAnswers++;
				} else {
					wrongAnswers++;
				}
			}
		}

		if (wrongAnswers) {
			ModalWindow({
				message : 'Test is failed!',
				correct_answers : correctAnswers,
				wrong_answers : wrongAnswers
			})
		} else if (!isOk) {
			alert('You chose too many or too few answers!!!');
		} else {
			ModalWindow({
				message : 'Test is passed!',
				correct_answers : correctAnswers,
				wrong_answers : wrongAnswers
			})
		}

		this.reset();
	}

	function ModalWindow(results) {
		var modal_template = document.getElementById('modal_template').innerHTML;
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement('div');

		div.innerHTML = _.template(modal_template) (results);
		
		while (div.children.length > 0) {
	    	body.appendChild(div.children[0]);
	  	}

		var modal = document.getElementById('modal');
		var modal_content = modal.querySelector('.modal-content');
		var close_button = modal.querySelector('.close');
		var top = parseInt(window.getComputedStyle(modal_content).getPropertyValue('top'));

		modal.style.display = 'block';

		function linear(timeFraction) {
  			return timeFraction;
		}

		function hide() {
			top = parseInt(window.getComputedStyle(modal_content).getPropertyValue('top'));

			animate({
		        duration: 200,
		        timing: linear,
		        draw: function(progress) {
		          modal_content.style.top = top + (-230 - top) * progress + 'px';
		          modal_content.style.opacity = 1 - progress;
		          if(progress > 0.95) {
      				modal.style.display = 'none';
      				body.removeChild(modal);
		          }
		        }
      		});
		}

		animate({
	        duration: 600,
	        timing: linear,
	        draw: function(progress) {
	          modal_content.style.top = top + (100 - top) * progress + 'px';
	          modal_content.style.opacity = progress;
	        }
      	});
      	close_button.addEventListener('click', hide);
	}

	this.clear = function(dbkey) {
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
