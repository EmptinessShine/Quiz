export function updateScore(score) {
    const scoreElement = document.querySelector('.score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}

export function saveScore(score) {
    localStorage.setItem('recordScore', score);
}

export function displayRecord() {
    const recordScore = localStorage.getItem('recordScore') || 0;
    const recordElement = document.querySelector('.record');
    if (recordElement) {
        recordElement.textContent = `Record: ${recordScore}`;
    }
}