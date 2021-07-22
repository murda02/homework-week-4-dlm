/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/

const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector('#quiz-counter');
let timeLeft = 0;
let timerEl = document.getElementById("quiz-counter");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];
let questions = [
    {
        question: "Which of the following are JavaScript Data Types?",
        choice1: "Number",
        choice2: "String",
        choice3: "Object",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "What does the isNaN function return?",
        choice1: "Returns an error if the argument not a number",
        choice2: "Returns true if the argument is not a number; otherwise, it is false.",
        choice3: "Returns true if the argument is a number; otherwise, it is false.",
        choice4: "Returns a number that was converted from a string",
        answer: 2,
    },
    {
        question: "What character is used to perform a line break?",
        choice1: "backslash",
        choice2: "forwardslash",
        choice3: "question mark",
        choice4: "tilde",
        answer: 1,
    },
    {
        question: "What is a strict equality operator?",
        choice1: "=",
        choice2: "==",
        choice3: "===",
        choice4: "%",
        answer: 3,
    }
];

if (window.location == "file:///home/dave/du/homework/week4/quiz.html") {
    countDown();
}

function countDown() {
    let timeLeft = 60;

    let timeInterval = setInterval(() => {

        if (timeLeft > 1) {
            timerEl.textContent = "Timer: " + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Time's up!!!";
            clearInterval(timeInterval);
        }
    }, 1000);  
 }
 
 
startQuiz = () => {
    availableQuestions = [...questions];
    nextQuestion();
};
 
//need to figure out how to get '|| timeLeft === 0' to work in if statement
nextQuestion = () => {
    if (availableQuestions.length === 0) {
        return window.location.assign("highscores.html");
    }

    const questionIndex = Math.floor(Math.random() * availableQuestions.length) ;
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};
 
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            nextQuestion();
        }, 1000);
    });
});

startQuiz();

