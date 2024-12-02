import { getCurrentQuestionIndex, currentQusetionIndexPlusPlus, loadQuestion, score } from './quiz.js';
import { questionsAndAnswers } from './questions.js';
import { displayRecord, saveScore } from './score.js';

let timer;
export let timeLeft = 15; // Экспорт переменной timeLeft

export function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        currentQusetionIndexPlusPlus();
        if (getCurrentQuestionIndex() < questionsAndAnswers.length) {
            loadQuestion();
            timeLeft = 15;
            startTimer();
        } else {
            saveScore(score);
            displayRecord();
            alert(`Your score is: ${score}`);
        }
    } else {
        timeLeft--;
        document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

document.getElementById('startButton').addEventListener('click', startTimer);
export function resetTimer() {
    timeLeft = 15;
    document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
}