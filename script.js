const ROWS = 15;
const COLS = 15;
const HEX_W = 60;
const HEX_H = 69;

const grid = document.getElementById("grid");
let hashome = false;
const hexMap = {};
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const hex = document.createElement("div");
    hex.className = "hex";
    hex.textContent = `${row},${col}`;

    // Store row/col on the element for easy access
    hex.dataset.row = row;
    hex.dataset.col = col;

    // Save to our map: "0-5" = hex element
    hexMap[`${row}-${col}`] = hex;
    // Odd rows shifted right for a staggered grid
    const xOffset = row % 2 === 1 ? HEX_W / 2 : 0;

    // Calculate positions
    const x = col * HEX_W + xOffset;
    const y = row * (HEX_H * 0.75);

    hex.style.left = `${x}px`;
    hex.style.top = `${y}px`;

    hex.addEventListener("click", () => {
      if (!hashome) {
        hex.classList.add("home");
        hashome = true;
      } else {
        if (isAdjacentToOwned(row, col)) {
          hex.classList.add("active", "owned");
        } else {
          console.log("Too far away! You can only expand to neighbors.");
        }
      }
    });

    grid.appendChild(hex);
  }
}

function isAdjacentToOwned(r, c) {
  const isOdd = r % 2 === 1;

  // Define the 6 relative directions based on row parity
  const neighbors = isOdd
    ? [
        [0, -1],
        [0, 1],
        [-1, 0],
        [-1, 1],
        [1, 0],
        [1, 1],
      ] // Odd row
    : [
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 0],
        [1, -1],
        [1, 0],
      ]; // Even row

  for (let [dr, dc] of neighbors) {
    const neighborHex = hexMap[`${r + dr}-${c + dc}`];
    if (neighborHex && neighborHex.classList.contains("owned")) {
      return true; // Found an adjacent owned hex!
    }
  }
  return false;
}

// Ensure the container is large enough for the absolute positioned children
grid.style.position = "relative";
grid.style.width = `${COLS * HEX_W + HEX_W / 2}px`;
grid.style.height = `${ROWS * (HEX_H * 0.75) + HEX_H * 0.25}px`;

// setInterval(() => {
//   console.log("I repeat!");
// }, 1000);
