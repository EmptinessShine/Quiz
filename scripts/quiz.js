import { questionsAndAnswers } from './questions.js';
import { updateScore, saveScore, displayRecord } from './score.js';
import{timerUpdate} from "./timer.js";

export let currentQuestionIndex = 0;
export let score = 0;

export function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option');

    const currentQuestion = questionsAndAnswers[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => checkAnswer(index);
    });
    timerUpdate()
}

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

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore(score);
    loadQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    displayRecord();
    document.getElementById('restartButton').addEventListener('click', resetQuiz);
});