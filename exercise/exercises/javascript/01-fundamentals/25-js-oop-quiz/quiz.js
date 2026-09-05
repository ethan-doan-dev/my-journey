class Question {
    constructor(text, answer) {
        this.text = text;
        this.answer = answer;
    }

    checkAnswer(userAnswer) {
        if (userAnswer === this.answer) {
            return true;
        }
        return false;
    }
}

class quiz {
    #points = 0;
    constructor(exam) {
        this.exam = exam;
        this.listQuestions = [];
    }

    addQuestion(newQuestion) {
        this.listQuestions.push(newQuestion);
    }

    
    submit(userAnswers) {
        console.log("Subwitting answers...");
        this.#points = 0;
        for(let i = 0; i < this.listQuestions.length; i++) {
            if (this.listQuestions[i].checkAnswer(userAnswers[i])) {
                this.#points++;
            }
        }
        console.log(`points: ${this.#points} / ${this.listQuestions.length} points.\n`);
    }

}

const Q1 = new Question("What is the opposite of \"hot\"?", "cold");
const Q2 = new Question("What is the capital of France?", "Paris");
const Q3 = new Question("1 + 1 equals what?", "2");

const Exam1 = new quiz("Final exam");
Exam1.addQuestion(Q1);
Exam1.addQuestion(Q2);
Exam1.addQuestion(Q3);

const userAnswers1 = ["cold", "Paris", "2"];
Exam1.submit(userAnswers1);

const userAnswers2 = ["hot", "london", "2"];
Exam1.submit(userAnswers2);