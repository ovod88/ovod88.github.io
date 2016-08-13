describe("Testing the Test object with single option", function() {
    var test = new Test();

    window.onload = function() {
        document.getElementsByTagName("button")[0].addEventListener('click', test.checkAnswers.bind(test));
    };

    var test_content = {
        test_title : 'test',
        type : 'single_answer',
        questions : [
            {
                question : 'question1?',
                answers : ['answer1','answer2'],
                correct_answer : [1]
            }, {
                question : 'question2?',
                answers : ['answer1', 'answer2', 'answer3', 'answer4'],
                correct_answer : [2]
            }, {
                question : 'question3?',
                answers : ['answer1','answer2', 'answer3', 'answer4','answer5','answer6','answer7'],
                correct_answer : [1]
            }
        ]
    };

    it("test if page is filled with content", function() {
        var body = $('body');

        test.init(test_content);

        var li_to_test_question_text = $('.questions').find('li:eq(1)')
            .clone()
            .children()
            .remove()
            .end()
            .text();

        try {
            expect(body.find('ol.questions').length > 0).toBe(true);
            expect($.trim(li_to_test_question_text)).toEqual('question2?');
        } catch (e) {
            console.log("Exception is ---> ", e);
        }
    });
});