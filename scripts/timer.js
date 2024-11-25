import {currentQuestionIndex,loadQuestion,score} from "./quiz.js";
import {questionsAndAnswers} from "./questions.js";
import {displayRecord, saveScore} from "./score.js";

let timer;

export function  timerUpdate(){
    let time = 15;
    clearInterval(timer);
     timer = setInterval(() => {
        document.getElementById('timer').textContent = time;
            if(time>0){
                time--;
            } else {
                clearInterval(timer);
                currentQuestionIndex++;
                if (currentQuestionIndex<questionsAndAnswers.length){
                    loadQuestion()
                } else {
                    saveScore(score);
                    displayRecord();
                    alert(`Your score is: ${score}`);
                }
            }
    },1000);
}