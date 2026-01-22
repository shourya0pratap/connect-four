const playerTeams = ["red", "yellow"];
const playerColors = ["#fb1d2d", "#ffa015"];
let currentPlayer = 0;
let turns = 0;
let gameRunning = true;

// Store the state of the board in an array;
let boardState = Array(6)
  .fill(null)
  .map(() => Array(7).fill(null));

const grid = document.getElementById("game-grid");
const btn = document.getElementById("reset-btn");
const winner_disp = document.getElementById("winner-display");

for (let i = 0; i < 42; i++) {
  const cell = document.createElement("div");
  cell.classList.add("slot");
  const row = Math.floor(i / 7);
  const col = i % 7;
  cell.dataset.row = row;
  cell.dataset.col = col;
  grid.appendChild(cell);
}

grid.addEventListener("click", (e) => {
  const pressedSlot = e.target.closest(".slot");
  if (!pressedSlot || !gameRunning) return;
  const colClicked = parseInt(pressedSlot.dataset.col);

  // Loop from bottom to top to find an empty spot
  for (let row = 5; row >= 0; row--) {
    if (boardState[row][colClicked] === null) {
      boardState[row][colClicked] = playerTeams[currentPlayer];
      const targetCell = document.querySelector(
        `.slot[data-row='${row}'][data-col='${colClicked}']`,
      );
      targetCell.style.setProperty(
        "--piece-color",
        playerColors[currentPlayer],
      );
      targetCell.classList.add("falling");
      setTimeout(() => {
        let result = checkWin(row, colClicked);
        if (result) {
          gameRunning = false;
          winner_disp.innerHTML = `Team ${result.winner} Wins!`;
        } else if (turns == 42) {
          gameRunning = false;
          winner_disp.innerHTML = "Tie!";
        }
      }, 10);
      currentPlayer = (currentPlayer + 1) % 2;
      turns += 1;
      break;
    }
  }
});

function checkWin(row, col) {
  const currentTeam = boardState[row][col];
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal Down-Right
    [1, -1], // Diagonal Down-Left
  ];

  for (const [dirRow, dirCol] of directions) {
    let pieceCount = 1;

    // 1. Scan Positive Direction
    for (let i = 1; i < 4; i++) {
      const r = row + dirRow * i;
      const c = col + dirCol * i;

      if (
        inRange(r, 0, 5) &&
        inRange(c, 0, 6) &&
        boardState[r][c] === currentTeam
      ) {
        pieceCount++;
      } else {
        break;
      }
    }

    // 2. Scan Negative Direction
    for (let i = 1; i < 4; i++) {
      const r = row - dirRow * i;
      const c = col - dirCol * i;

      if (
        inRange(r, 0, 5) &&
        inRange(c, 0, 6) &&
        boardState[r][c] === currentTeam
      ) {
        pieceCount++;
      } else {
        break;
      }
    }

    if (pieceCount >= 4) {
      return { winner: currentTeam.toUpperCase(), type: [dirRow, dirCol] };
    }
  }

  return null;
}

function inRange(x, min, max) {
  return min <= x && x <= max;
}

function resetGame() {
  boardState = Array(6)
    .fill(null)
    .map(() => Array(7).fill(null));
  const allSlots = document.querySelectorAll(".slot");
  allSlots.forEach((slot) => {
    slot.style.removeProperty("--piece-color");
    slot.classList.remove("falling");
  });
  winner_disp.innerHTML = "Winner:";
  gameRunning = true;
  currentPlayer = 0;
  turns = 0;
}

btn.addEventListener("mouseenter", () => {
  btn.innerHTML = "Reset??";
  btn.style.cursor = "pointer";
  btn.style.transform = "scale(1.1) rotateZ(-15deg)";
  btn.style.boxShadow = "10px 10px 10px black";
});

btn.addEventListener("mouseleave", () => {
  btn.innerHTML = "Reset?";
  btn.style.transform = "scale(1)";
  btn.style.boxShadow = "none";
});

btn.addEventListener("mousedown", () => {
  btn.innerHTML = "RESET!";
  btn.style.transform = "scale(0.95)";
  btn.style.boxShadow = "none";
  btn.style.backgroundColor = "black";
  btn.style.color = "white";
});

btn.addEventListener("mouseup", () => {
  btn.innerHTML = "Reset?";
  btn.style.transform = "scale(1)";
  btn.style.backgroundColor = "white";
  btn.style.color = "black";
  resetGame();
});
