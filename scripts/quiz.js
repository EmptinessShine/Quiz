import { questionsAndAnswers } from './questions.js';
import { updateScore, saveScore, displayRecord } from './score.js';

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option');

    if (!questionElement || optionButtons.length === 0) {
        console.error('DOM elements not found');
        return;
    }

    const currentQuestion = questionsAndAnswers[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => checkAnswer(index);
    });
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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    displayRecord();
});