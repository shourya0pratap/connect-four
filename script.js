const playerTeams = ["red", "yellow"];
const playerColors = ["#fb1d2d", "#ffa015"];
let currentPlayer = 0;
let turns = 0;
let gameRunning = true;

// Store the state of the board in an array;
const boardState = new Array(42).fill(null);

const grid = document.getElementById("game-grid");
const btn = document.getElementById("reset-btn");

for (let i = 0; i < 42; i++) {
  const cell = document.createElement("div");
  cell.classList.add("slot");
  const row = Math.floor(i / 7);
  const col = i % 7;
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.dataset.index = i;
  grid.appendChild(cell);
}

grid.addEventListener("click", (e) => {
  const pressedSlot = e.target.closest(".slot");
  if (!pressedSlot) return;
  const colClicked = parseInt(pressedSlot.dataset.col);

  // Loop from bottom to top to find an empty spot
  for (let row = 5; row >= 0; row--) {
    const ind = row * 7 + colClicked;
    if (boardState[ind] === null) {
      boardState[ind] = playerTeams[currentPlayer];
      const targetCell = document.querySelector(`.slot[data-index='${ind}']`);
      targetCell.style.backgroundColor = playerColors[currentPlayer];
      targetCell.classList.add("falling");
      currentPlayer = (currentPlayer + 1) % 2;
      break;
    }
  }
});

function resetGame() {
  boardState.fill(null);
  const allSlots = document.querySelectorAll(".slot");
  allSlots.forEach((slot) => {
    slot.style.backgroundColor = ""; // Remove color
    slot.classList.remove("falling"); // Remove class so it can play again later
  });
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
