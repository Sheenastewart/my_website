document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll("[data-cell]");
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const resetBtn = document.getElementById("resetBtn");
  const resetScoresBtn = document.getElementById("resetScores");
  const modeToggleBtn = document.getElementById("modeToggle");
  const scoreLight = document.getElementById("scoreLight");
  const scoreDark = document.getElementById("scoreDark");
  const scoreLabelDark = document.getElementById("scoreLabelDark");
  const modeLabel = document.getElementById("modeLabel");

  let currentPlayer = "💖";
  let isGameOver = false;
  let isSinglePlayer = false;

  let score = {
    "💖": 0,
    "🖤": 0
  };

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function initGame() {
    currentPlayer = "💖";
    isGameOver = false;
    message.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("heart-light", "heart-dark", "winner-glow");
      cell.removeAttribute("data-taken");
    });
  }

  function swapPlayer() {
    currentPlayer = currentPlayer === "💖" ? "🖤" : "💖";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkWin() {
    return WINNING_COMBINATIONS.some(combination => {
      const [a, b, c] = combination;
      return (
        cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer
      );
    });
  }

  function checkDraw() {
    return [...cells].every(cell => cell.textContent !== "");
  }

  function highlightWinner() {
    WINNING_COMBINATIONS.forEach(combination => {
      const [a, b, c] = combination;
      if (
        cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer
      ) {
        cells[a].classList.add("winner-glow");
        cells[b].classList.add("winner-glow");
        cells[c].classList.add("winner-glow");
      }
    });
  }

  function updateScore(winner) {
    score[winner]++;
    scoreLight.textContent = score["💖"];
    scoreDark.textContent = score["🖤"];
  }

  function handleClick(e) {
    const cell = e.target;
    if (cell.textContent !== "" || isGameOver) return;

    cell.textContent = currentPlayer;
    cell.setAttribute("data-taken", currentPlayer);
    cell.classList.add(currentPlayer === "💖" ? "heart-light" : "heart-dark");

    if (checkWin()) {
      message.textContent = `Player ${currentPlayer} wins! 🎉`;
      isGameOver = true;
      highlightWinner();
      updateScore(currentPlayer);
      return;
    }

    if (checkDraw()) {
      message.textContent = "It’s a draw!";
      isGameOver = true;
      return;
    }

    swapPlayer();

    if (isSinglePlayer && currentPlayer === "🖤") {
      setTimeout(computerMove, 400);
    }
  }

  function computerMove() {
  if (isGameOver) return;

  const emptyCells = [...cells].filter(cell => cell.textContent === "");
  let bestMove = null;

  // First: Try to win
  bestMove = findBestMove("🖤");
  // Then: Try to block 💖
  if (!bestMove) bestMove = findBestMove("💖");
  // Else: Pick random
  if (!bestMove) bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  if (bestMove) {
    bestMove.textContent = "🖤";
    bestMove.setAttribute("data-taken", "🖤");
    bestMove.classList.add("heart-dark");

    if (checkWin()) {
      message.textContent = "🖤 wins! (Computer)";
      isGameOver = true;
      highlightWinner();
      updateScore("🖤");
      return;
    }

    if (checkDraw()) {
      message.textContent = "It’s a draw!";
      isGameOver = true;
      return;
    }

    currentPlayer = "💖";
    message.textContent = "Player 💖's turn";
  }
}
//helper to win in computer mode
function findBestMove(symbol) {
  for (let combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    const values = [cells[a], cells[b], cells[c]];

    const marks = values.map(cell => cell.textContent);
    const empties = values.filter(cell => cell.textContent === "");

    if (marks.filter(mark => mark === symbol).length === 2 && empties.length === 1) {
      return empties[0];
    }
  }
  return null;
}

  // Event listeners
  cells.forEach(cell => cell.addEventListener("click", handleClick));
  resetBtn.addEventListener("click", initGame);

  resetScoresBtn.addEventListener("click", () => {
    score["💖"] = 0;
    score["🖤"] = 0;
 // Directly reset the displayed text
    scoreLight.textContent = "0";
    scoreDark.textContent = "0";


    scoreLabelDark.textContent = isSinglePlayer
      ? "Computer (🖤):"
      : "Player 2 (🖤):";

    modeLabel.textContent = isSinglePlayer
      ? "Mode: You vs Computer"
      : "Mode: Player 1 vs Player 2";
  });

  modeToggleBtn.addEventListener("click", () => {
    isSinglePlayer = !isSinglePlayer;

    modeToggleBtn.textContent = isSinglePlayer
      ? "Switch to 2 Player Mode"
      : "Switch to 1 Player Mode";

    scoreLabelDark.textContent = isSinglePlayer
      ? "Computer (🖤):"
      : "Player 2 (🖤):";

    modeLabel.textContent = isSinglePlayer
      ? "Mode: You vs Computer"
      : "Mode: Player 1 vs Player 2";

    initGame();
  });

  initGame();
});
