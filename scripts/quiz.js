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

function shuffle(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function shuffleAnswers(questions) {
    questions.forEach(question => {
        var correctAnswer = question.answers[question.correctAnswerIndex];
        shuffle(question.answers);
        question.correctAnswerIndex = question.answers.indexOf(correctAnswer);
    });
}

shuffle(questionsAndAnswers);
shuffleAnswers(questionsAndAnswers);

export function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option');
    const imageElement = document.querySelector('#question-image img');
    const currentQuestion = questionsAndAnswers[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => checkAnswer(button.textContent);
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

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore(score);
    loadQuestion();
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questionsAndAnswers[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answers[currentQuestion.correctAnswerIndex]) {
        score++;
        updateScore(score);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsAndAnswers.length) {
        loadQuestion();
    } else {
        saveScore(score);
        displayRecord();
        showGameOverScreen();
    }
}

function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const quizScreen = document.querySelector('main');
    const finalScoreElement = document.getElementById('finalScore');

    gameOverScreen.style.display = 'flex';
    quizScreen.style.display = 'none';
    finalScoreElement.textContent = `Your score is: ${score}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('mainScreen');
    const quizScreen = document.querySelector('main');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const playAgainButton = document.getElementById('playAgainButton');

    function showMainScreen() {
        mainScreen.style.display = 'flex';
        quizScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
    }

    function startQuiz() {
        mainScreen.style.display = 'none';
        quizScreen.style.display = 'flex';
        gameOverScreen.style.display = 'none';
        loadQuestion();
        displayRecord();
    }

    startButton.addEventListener('click', startQuiz);
    restartButton.addEventListener('click', () => {
        resetQuiz();
        showMainScreen();
    });
    playAgainButton.addEventListener('click', () => {
        resetQuiz();
        startQuiz();
    });

    showMainScreen();
});