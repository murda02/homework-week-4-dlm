//lines 2-4 are getting elements from the web page 
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector('#quiz-counter');

const timePenalty = 10;
let timeLeft;
let timerEl = document.getElementById("quiz-counter");
let currentQuestion = {};
let acceptingAnswers = true;
let availableQuestions = [];

// an array of js questions, possible choices and the answer
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

// a count down timer
function countDown() {
    timeLeft = 60;

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
 
 // the function thats the quiz off
startQuiz = () => {
    countDown();
    availableQuestions = [...questions];
    nextQuestion();
};

// a function that returns timeLeft (the users score) after the last questions is anwsered
userScore = () => {
    if (availableQuestions.length === 0) {
        return timeLeft;
    }
};
 
// a function that randomly selects a questions form the question array, displays
// it on the page, grabs the timeLeft (or score) and takes the user to the
// high score page
nextQuestion = () => {
    if (availableQuestions.length === 0) {
        localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
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

// this loops through the choices array and checks if the users selected answer is
// right or wrong. If it's right the choice is highlighted green, if it's wrong
// it's highlighted red and the user losses 10 seconds off the clock
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if (selectedAnswer == currentQuestion.answer) {
        } else {
            timeLeft = timeLeft - timePenalty;
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            nextQuestion();
        }, 1000);
    });
});

startQuiz();

