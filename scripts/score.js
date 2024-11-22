let score = 0;

export function increaseScore(points) {
    score += points;
    updateScoreDisplay();
}

export function resetScore() {
    score = 0;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}