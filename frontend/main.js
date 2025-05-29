const buttons = document.getElementsByClassName("btn");
const themeBtn = document.getElementById("btn-toggle-theme");
const alignBtn = document.getElementById("btn-toggle-align");
const body = document.querySelector("body");

// Button event listeners
alignBtn.addEventListener("click", () => {
  for (const button of buttons) {
    button.classList.toggle("align-right");
  }
});

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
});
