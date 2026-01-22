const playerTeams = ["red", "yellow"];
const playerColors = ["#fb1d2d", "#ffa015"];
let currentPlayer = 0;
let turns = 0;
let gameRunning = true;

// Store the state of the board in an array;
const boardState = new Array(42).fill(null);

const grid = document.getElementById("game-grid");
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
      currentPlayer = (currentPlayer + 1) % 2;
      break;
    }
  }
});
