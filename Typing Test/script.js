let quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast helps you work efficiently.",
  "Practice makes perfect in everything you do.",
  "JavaScript is fun and powerful.",
  "Accuracy is just as important as speed.",
  "Consistency builds typing confidence."
];

let currentQuote = "";
let startTime;
let typingStarted = false;

function startTest() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteElement = document.getElementById("quote");
  quoteElement.innerHTML = "";

  currentQuote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteElement.appendChild(span);
  });

  document.getElementById("input").value = "";
  document.getElementById("input").disabled = false;
  document.getElementById("input").focus();
  document.getElementById("results").innerHTML = "";
  typingStarted = false;
}

function resetTest() {
  document.getElementById("input").value = "";
  document.getElementById("input").disabled = true;
  document.getElementById("quote").innerText = "Click 'Start' to begin the test.";
  document.getElementById("results").innerText = "";
  typingStarted = false;
}

document.getElementById("input").addEventListener("input", function () {
  const inputText = this.value;
  const quoteSpans = document.querySelectorAll("#quote span");

  if (!typingStarted) {
    startTime = new Date();
    typingStarted = true;
  }

  let correctChars = 0;
  let errorCount = 0;

  quoteSpans.forEach((span, i) => {
    const typedChar = inputText[i];

    if (typedChar == null) {
      span.classList.remove("correct", "incorrect");
    } else if (typedChar === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctChars++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      errorCount++;
    }
  });

  if (inputText.length === currentQuote.length) {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    const wordCount = currentQuote.trim().split(" ").length;
    const wpm = Math.round((wordCount / timeTaken) * 60);

    const totalChars = currentQuote.length;
    const accuracy = ((correctChars / totalChars) * 100).toFixed(2);

    document.getElementById("results").innerHTML = `
      <p>✅ Completed!</p>
      <p>⏱ Time: ${timeTaken.toFixed(2)} sec</p>
      <p>📈 WPM: ${wpm}</p>
      <p>✔️ Accuracy: ${accuracy}%</p>
      <p>❌ Errors (Characters): ${errorCount}</p>
    `;

    this.disabled = true;
  }
});
