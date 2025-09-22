import { questionsByCategory } from "./triviaModel.js";
import {
  renderProgress,
  renderQuestion,
  renderScore,
  highlightAnswer,
} from "./triviaView.js";

let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let category = "";

// DOM elements for the modal and feedback section
const resultsModal = document.getElementById("resultsModal");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartBtn");
const feedbackSection = document.getElementById("feedback-section");
const feedbackTitle = document.getElementById("feedback-title");
const explanationText = document.getElementById("explanation-text");

function getCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  return category || "general"; // Default to 'general' if no category is specified
}

function showFeedback(isCorrect, explanation) {
  feedbackSection.classList.add("visible");

  if (isCorrect) {
    feedbackSection.classList.add("correct");
    feedbackTitle.classList.add("correct");
    feedbackTitle.textContent = "Correct! ✅";
  } else {
    feedbackSection.classList.add("incorrect");
    feedbackTitle.classList.add("incorrect");
    feedbackTitle.textContent = "Incorrect! ❌";
  }
  explanationText.textContent = explanation;
}

function hideFeedback() {
  feedbackSection.classList.remove("visible");
  feedbackSection.classList.remove("correct", "incorrect");
  feedbackTitle.classList.remove("correct", "incorrect");
}

function handleAnswerClick(event) {
  const selectedButton = event.target;
  const selectedAnswer = selectedButton.textContent;
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;

  highlightAnswer(isCorrect, selectedButton);

  if (isCorrect) {
    score += 10;
    renderScore(score);
  }

  // Disable all buttons after an answer is selected
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => (button.disabled = true));

  // Show feedback and explanation
  showFeedback(isCorrect, currentQuestion.explanation);

  // Move to the next question after a delay
  setTimeout(() => {
    hideFeedback(); // Hide the feedback section
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      startQuestion();
    } else {
      showResultsModal();
    }
  }, 10000); // 3-second delay to give user time to read
}

function showResultsModal() {
  finalScoreElement.textContent = `${score} / ${currentQuestions.length}`;
  resultsModal.classList.add("visible");
}

function restartQuiz() {
  // Reset game state
  currentQuestionIndex = 0;
  score = 0;

  // Hide modal
  resultsModal.classList.remove("visible");

  // Restart quiz from the beginning of the same category
  startQuiz();
}

export function startQuiz() {
  category = getCategoryFromUrl();
  currentQuestions = questionsByCategory[category];

  if (!currentQuestions) {
    console.error("Category not found:", category);
    currentQuestions = questionsByCategory["general"];
  }

  renderScore(score);

  startQuestion();
}

function startQuestion() {
  // Re-enable buttons from a previous round if any
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach((button) => (button.disabled = false));

  const currentQuestion = currentQuestions[currentQuestionIndex];
  renderProgress(currentQuestionIndex, currentQuestions.length);
  renderQuestion(currentQuestion);

  const newAnswerButtons = document.querySelectorAll(".answer-btn");
  newAnswerButtons.forEach((button) => {
    button.addEventListener("click", handleAnswerClick);
  });
}

// Add event listener to the restart button
restartButton.addEventListener("click", restartQuiz);
