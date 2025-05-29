// Buttons
const buttons = document.getElementsByClassName("btn");
const themeBtn = document.getElementById("btn-toggle-theme");
const alignBtn = document.getElementById("btn-toggle-align");
const runBtn = document.getElementById("btn-run");

const jsonInput = document.getElementById("json-input");
const apiSelector = document.getElementById("api-selector");
const result = document.getElementById("result");
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

runBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitForm();
});

// Select event listener
apiSelector.addEventListener("change", () => {
  const selectedService = apiSelector.value;

  const templates = {
    userService: `[
  {
    "service": "userService",
    "method": "getUserProfile",
    "params": ["john_doe"]
  }
]`,
    imageService: `[
  {
    "service": "imageService",
    "method": "getImageByName",
    "params": ["cat.jpg"]
  }
]`,
  };

  jsonInput.value = templates[selectedService] || "";
});

// Form submit
async function submitForm() {
  const inputText = jsonInput.value.trim();
  result.removeAttribute("data-highlighted");

  if (!inputText) {
    result.textContent = "Error: Missing JSON input.";
    return;
  }

  try {
    const response = await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonInput.value,
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
    hljs.highlightBlock(result);
  } catch (err) {
    result.textContent = `Error: ${err.message}`;
  }
}
