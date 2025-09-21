// Function to update the progress bar and question count
export function renderProgress(questionIndex, totalQuestions) {
  const progressText = document.getElementById("progress-text");
  const progressBarFill = document.getElementById("progress-bar-fill");

  if (progressText && progressBarFill) {
    progressText.textContent = `Question ${
      questionIndex + 1
    } of ${totalQuestions}`;
    const progressPercentage = (questionIndex / totalQuestions) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
  }
}

// Function to render the current question and its options
export function renderQuestion(questionData) {
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");

  if (questionElement && answerButtonsElement) {
    questionElement.textContent = questionData.question;
    answerButtonsElement.innerHTML = ""; // Clear previous buttons

    questionData.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("answer-btn");
      button.textContent = option;
      answerButtonsElement.appendChild(button);
    });
  }
}

// Function to update the score display
export function renderScore(score) {
  const scoreElement = document.getElementById("current-score");
  if (scoreElement) {
    scoreElement.textContent = `Score: ${score}`;
  }
}

// Function to provide visual feedback for the user's answer
export function highlightAnswer(isCorrect, button) {
  if (isCorrect) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }
}
