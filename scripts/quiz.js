import { questionsAndAnswers } from './questions.js';
import { updateScore, saveScore, displayRecord } from './score.js';
import { timerUpdate } from './timer.js';

/*   Used for call functions in ./timer.js and increment CurrentQuestionINdex*/
export let currentQuestionIndex = 0;
export let score = 0;

export function currentQusetionIndexPlusPlus(){
    currentQuestionIndex++;
}
export function getCurrentQuestionIndex(){
    return currentQuestionIndex;
}



export function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option');
    const imageElement = document.querySelector('#question-image img');
    const currentQuestion = questionsAndAnswers[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => checkAnswer(index);
    });
    if (imageElement){
        imageElement.src = currentQuestion.image;
    } else {
        const img = document.createElement('img');
        img.src = currentQuestion.image;
        document.querySelector('.question-image').appendChild(img);
    }


    timerUpdate();
}

/*   Main questions loading functions*/
function checkAnswer(selectedIndex) {
    const currentQuestion = questionsAndAnswers[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswerIndex) {
        score++;
        updateScore(score);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsAndAnswers.length) {
        loadQuestion();
    } else {
        saveScore(score);
        displayRecord();
        alert(`Your score is: ${score}`);
    }
}
//
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore(score);
    loadQuestion();
}


/* questions will load when user download all scripts  */
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    displayRecord();
    document.getElementById('restartButton').addEventListener('click', resetQuiz);
});