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

let buttonEl = document.querySelector("button");
let counterEl = document.getElementById("quiz-counter");


buttonEl.addEventListener("click", function () { 
    buttonEl.setAttribute("class", "change-color");
    counterEl.setAttribute("class", "change-color");
    countDown();
 });

 function countDown() {
    let timeLeft = 60;

    let timeInterval = setInterval(() => {
        if (timeLeft > 1) {
            counterEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        } else {
            counterEl.textContent = "Time's up!!!";
            clearInterval(timeInterval);
        }
    }, 1000);  
 }
