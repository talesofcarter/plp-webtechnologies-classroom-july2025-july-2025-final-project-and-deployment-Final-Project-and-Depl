import { questions } from "./triviaModel.js";
import {
  renderProgress,
  renderQuestion,
  renderScore,
  highlightAnswer,
} from "./triviaView.js";

let currentQuestionIndex = 0;
let score = 0;

function handleAnswerClick(event) {
  const selectedButton = event.target;
  const selectedAnswer = selectedButton.textContent;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;

  highlightAnswer(isCorrect, selectedButton);

  if (isCorrect) {
    score++;
    renderScore(score);
  }

  // Disable all buttons after an answer is selected
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => (button.disabled = true));

  // Move to the next question after a delay
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      startQuestion();
    } else {
      // End of quiz logic here
      alert(
        `Quiz Finished! Your score is ${score} out of ${questions.length}.`
      );
    }
  }, 1000); // 1-second delay
}

export function startQuiz() {
  startQuestion();
}

function startQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  renderProgress(currentQuestionIndex, questions.length);
  renderQuestion(currentQuestion);

  // Add event listeners to the new buttons
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => {
    button.addEventListener("click", handleAnswerClick);
  });
}
