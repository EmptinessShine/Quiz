let timeLeft = 15;
let timerInterval;

export function startTimer(updateTimer, loadNextQuestion) {
    timeLeft = 15;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const seconds = timeLeft % 60;
        updateTimer(`0:${seconds < 10 ? '0' : ''}${seconds}`);
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            alert('Time is up!');
            clearInterval(timerInterval);
            loadNextQuestion();
        }
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
}