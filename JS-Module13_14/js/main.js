'use strict';
var test = new Test();

var content = {
	test_title : 'test',
	type : 'single_answer',
	questions : [
		{
			question : 'Сколько тебе лет?',
			answers : ['I am 22 years old','I am 23 years old'],
			correct_answer : [0]
		}, {
			question : 'Сколько маме лет?',
			answers : ['She is 40 years old', 'She is 41 years old', 'She is 42 years old', 'She is 43 years old'],
			correct_answer : [2]
		}, {
			question : 'Сколько брату лет?',
			answers : ['He is 30','He is 31', 'He is 32', 'He is 33','He is 34','He is 35','He is 36'],
			correct_answer : [1]
		}
	]
};


test.init(content, 'test_content');


window.onload = function() {
	document.getElementsByTagName("button")[0].addEventListener('click', test.checkAnswers.bind(test));
};