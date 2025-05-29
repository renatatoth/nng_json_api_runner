// Buttons
const buttons = document.getElementsByClassName("btn");
const themeBtn = document.getElementById("btn-toggle-theme");
const alignBtn = document.getElementById("btn-toggle-align");
const runBtn = document.getElementById("btn-run");

const jsonInput = document.getElementById("json-input");
const apiSelector = document.getElementById("api-selector");
const resultContainer = document.getElementById("result-container");
const errorMessage = document.getElementById("error-message");
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
    "params": ["cat"]
  }
]`,
  };

  jsonInput.value = templates[selectedService] || "";
});

// Form submit
async function submitForm() {
  clearResultsUI();
  const inputText = jsonInput.value.trim();

  if (!inputText) {
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "Error: Missing JSON input.";
    return;
  }

  try {
    const response = await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonInput.value,
    });
    const data = await response.json();
    displayResult(data);
  } catch (err) {
    errorMessage.textContent = `Error: ${err.message}`;
  }
}

// Display image or code based on called API
function displayResult(data) {
  resultContainer.classList.remove("hidden");
  data.forEach((entry) => {
    if (entry.error) {
      showError(entry.error);
    } else if (entry.src) {
      showImage(entry.src, entry.alt);
    } else {
      showJson(entry);
    }
  });
}

function showError(message) {
  errorMessage.classList.remove("hidden");
  errorMessage.textContent = message;
}

function showImage(src, alt = "Image") {
  const resultImg = document.createElement("img");
  resultImg.src = src;
  resultImg.alt = alt;
  resultContainer.appendChild(resultImg);
}

function showJson(jsonData) {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.classList.add("language-json");
  code.removeAttribute("data-highlighted");
  pre.appendChild(code);
  resultContainer.appendChild(pre);

  code.textContent = JSON.stringify(jsonData, null, 2);

  hljs.highlightElement(code);
}

function clearResultsUI() {
  resultContainer.classList.add("hidden");
  resultContainer.innerHTML = "";
  errorMessage.classList.add("hidden");
}
