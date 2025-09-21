export function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navbarLinks = document.getElementById("navbarLinks");
  const startQuizButton = document.getElementById("startQuizButton");

  menuToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
    menuToggle.classList.toggle("is-active");
  });

  startQuizButton.addEventListener("click", () => {
    console.log("Start Quiz button clicked!");
  });
}
