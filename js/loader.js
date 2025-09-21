document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const loaderContainer = document.querySelector(".loader-container");

  startButton.addEventListener("click", () => {
    loaderContainer.classList.add("fade-out");

    loaderContainer.addEventListener(
      "transitionend",
      () => {
        window.location.href = "index.html";
      },
      { once: true }
    );
  });
});
