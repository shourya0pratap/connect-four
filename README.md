# 🔴 Connect 4 🟡

A fully functional, physics-based Connect 4 game built with Vanilla JavaScript. This project features a smart "gravity" system, a robust win-detection algorithm, and hardware-accelerated CSS animations.

## 🔗 Live Demo

[**Play the Game Here**](https://shourya0pratap.github.io/connect-4/)

---

## ✨ Features

### 🎮 Gameplay Mechanics

- **Gravity Logic:** Pieces don't just appear where you click—they "fall" to the lowest available row in the selected column.
- **Smart Win Detection:** Instantly calculates wins in all 4 directions (Horizontal, Vertical, and both Diagonals) using a localized search algorithm.
- **Tie Handling:** Detects when the board is full (42 turns) and declares a draw.

### 🎨 UI & Animation

- **Physics-Based Drop:** Pieces fall with a custom easing curve (`ease-in` / `ease-out`) to simulate real gravity and bouncing.
- **"Ghost" Pieces:** Uses CSS Pseudo-elements (`::after`) to animate the pieces falling _behind_ the board slots, creating a realistic depth effect.
- **Dynamic Reset:** A playful, interactive reset button with hover and click transforms.

---

## 🧠 Technical Highlights

### 1. The "Radar" Win Algorithm

Instead of scanning the entire board every turn (which is inefficient), the game uses a **localized search**. It starts from the piece just dropped and "looks" outward in 4 directions to count consecutive matches.

```javascript
// The 4 axes of victory
const directions = [
  [0, 1], // Horizontal
  [1, 0], // Vertical
  [1, 1], // Diagonal (Down-Right)
  [1, -1], // Diagonal (Down-Left)
];

// The algorithm walks "Forward" and "Backward" along these axes
// to count the total streak length.
```

### 2. State Management (2D Array)
The board isn't just HTML; it's backed by a 6x7 2D Array in memory. This prevents logic errors (like wrapping from the right edge to the left edge) that happen with simple 1D arrays.

```javascript
// A clean 6x7 matrix
let boardState = Array(6)
.fill(null)
.map(() => Array(7).fill(null)); 
```

### 3. CSS Variables for Animation
To animate the falling piece without moving the "hole" in the grid, the game injects the player's color into a CSS variable on the parent slot. The ::after element picks this up and handles the animation.

```javascript
targetCell.style.setProperty("--piece-color", playerColors[currentPlayer]);
targetCell.classList.add("falling");
```

```css
.falling::after {
content: "";
background-color: var(--piece-color); /_ Dynamic Color _/
animation: realistic-drop 0.6s forwards;
}
```

# 🛠️ Technologies Used
* HTML5: Semantic structure.

* CSS3: Flexbox, Grid, CSS Variables, Keyframe Animations.

* JavaScript (ES6+): 2D Arrays, Event Delegation, DOM Manipulation.

# 🚀 How to Run Locally
1. Clone the repository:

```bash
git clone [https://github.com/your-username/connect-4.git](https://github.com/your-username/connect-4.git)
```

2. Open the project: Navigate to the folder and double-click index.html to open it in your browser.


# 🔮 Future Improvements
* [] Sound Effects: Add a "clack" sound when pieces hit the bottom.

* [] AI Opponent: Implement a Minimax algorithm for single-player mode.

* [] Score Tracking: Keep a tally of Red vs. Yellow wins across sessions.
