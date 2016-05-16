//Очень галимое решение. Создает определенный елемент, а надо шаблонный метод, которому все равно что создавать. 
//Есть решение на вебинаре №9
var generator_quetionnaire_obj = {
	body : document.body,
	question_counter : 0,
	generate_skeleton : function( header_text ) {

		var header = document.createElement('h3');
		header.className = 'questionnaire_header';
		header.appendChild( document.createTextNode( header_text ) );

		var form = document.createElement("form");
		form.setAttribute('action', '#');

		var list = document.createElement('ol');
		list.className = 'questions';
		this.list = list;

		var submit = document.createElement('button');
		submit.setAttribute('type','submit');
		submit.className = 'btn btn-primary';
		submit.innerHTML = "Проверить результаты";


		this.body.appendChild(header);
		this.body.appendChild(form);
		form.appendChild(list);
		form.appendChild(submit);
	},

	generate_question : function ( question_text ) {
		this.question_counter++;
		var question = document.createElement('li');
		question.innerHTML = question_text;
		question.setAttribute('id', 'question_' + this.question_counter);

		this.list.appendChild(question);


		return question;
	},
	generate_answer : function( question, answer_text ) {
		var label = document.createElement('label');
		var input = document.createElement('input');
		input.setAttribute('type', 'checkbox');

		var span = document.createElement('span');
		span.innerHTML = answer_text;

		question.appendChild(label);
		label.appendChild(input);
		label.appendChild(span);

	}

}
/*TO TEST THE SCRIPT*/

// generator_quetionnaire_obj.generate_skeleton("test");
// var question = generator_quetionnaire_obj.generate_question("Сколько тебе лет?");
// generator_quetionnaire_obj.generate_answer( question, "I am 22 years old");
// generator_quetionnaire_obj.generate_answer( question, "I am 23 years old");

// question = generator_quetionnaire_obj.generate_question("Сколько маме лет?");
// generator_quetionnaire_obj.generate_answer( question, "She is 40 years old");
// generator_quetionnaire_obj.generate_answer( question, "She is 41 years old");
// generator_quetionnaire_obj.generate_answer( question, "She is 42 years old");
// generator_quetionnaire_obj.generate_answer( question, "She is 43 years old");

// question = generator_quetionnaire_obj.generate_question("Сколько брату лет?");
// generator_quetionnaire_obj.generate_answer( question, "He is 30");
// generator_quetionnaire_obj.generate_answer( question, "He is 31");
// generator_quetionnaire_obj.generate_answer( question, "He is 32");
// generator_quetionnaire_obj.generate_answer( question, "He is 33");
// generator_quetionnaire_obj.generate_answer( question, "He is 34");
// generator_quetionnaire_obj.generate_answer( question, "He is 35");
// generator_quetionnaire_obj.generate_answer( question, "He is 36");
// generator_quetionnaire_obj.generate_answer( question, "He is 37");
// console.log('QUESTION  ', question);