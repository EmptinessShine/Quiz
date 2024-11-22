import { startTimer, stopTimer } from './timer.js';
import { increaseScore, resetScore } from './score.js';
import { questions } from './questions.js';

document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const questionElement = document.getElementById('question');
    const timerElement = document.getElementById('timer');
    const questionImageElement = document.querySelector('.question-image img');
    let currentQuestionIndex = 0;

    function updateTimer(time) {
        timerElement.textContent = time;
    }

    function loadNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            questionImageElement.src = currentQuestion.image;
            options.forEach((option, index) => {
                option.textContent = currentQuestion.options[index];
                option.setAttribute('data-option', index);
            });
            startTimer(updateTimer, loadNextQuestion);
        } else {
            alert('Quiz completed!');
        }
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            const selectedOption = parseInt(option.getAttribute('data-option'));
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedOption === currentQuestion.correctAnswer) {
                alert('Correct!');
                increaseScore(10);
            } else {
                alert('Incorrect!');
            }
            stopTimer();
            currentQuestionIndex++;
            loadNextQuestion();
        });
    });

    resetScore();
    loadNextQuestion();
});