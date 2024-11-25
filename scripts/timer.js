import { getCurrentQuestionIndex,currentQusetionIndexPlusPlus,loadQuestion,score } from './quiz.js';
import { questionsAndAnswers } from './questions.js';
import { displayRecord,saveScore} from './score.js';

let timer;

export function timerUpdate() {
    let time = 15;
    clearInterval(timer);
    timer = setInterval(() => {
        document.getElementById('timer').innerHTML = time;
        if (time > 0) {
            time--;
        } else {
            clearInterval(timer);
            currentQusetionIndexPlusPlus()
            if (getCurrentQuestionIndex() < questionsAndAnswers.length) {
                loadQuestion();
            } else {
                saveScore(score);
                displayRecord();
                alert(`Your score is: ${score}`);
            }
        }
    }, 1000);
}