document.addEventListener("DOMContentLoaded", function () {
  const favoriteNumber = 2; // your favorite number
  let attempts = 0;

  const guessBtn = document.getElementById("guessButton");
  const resetBtn = document.getElementById("resetButton");

  guessBtn.addEventListener("click", function () {
    const guess = parseInt(document.getElementById("guessInput").value);
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");

    if (!guess || guess < 1 || guess > 10) {
      alert("Please enter a number between 1 and 10.");
      return;
    }

    attempts++;

    if (guess === favoriteNumber) {
      alert("Correct! 💖");
      message.textContent = `You guessed my favorite number in ${attempts} attempt(s)!`;
      message.style.color = "#009900";
    } else {
      alert("Nope, that's not it.");
      message.textContent = "Try again!";
      message.style.color = "#cc0000";
    }

    attemptsDisplay.textContent = `Attempts: ${attempts}`;
  });

  resetBtn.addEventListener("click", function () {
    attempts = 0;
    document.getElementById("guessInput").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "";
  });
});
