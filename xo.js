let currentPlayer = "X";
let gameActive = true;
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("#reset-button");
const alertDiv = document.querySelector("#alert");
const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


function handleCellClick() {
   if (this.textContent !== "" || !gameActive) return;

   this.textContent = currentPlayer;

   if (checkWin()) {
      announceWinner();
      gameActive = false;
   } else if (checkDraw()) {
      announceDraw();
      gameActive = false;
   } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
   }
}

function handleResetClick() {
   cells.forEach(cell => cell.textContent = "");
   currentPlayer = "X";
   gameActive = true;
}

function checkWin() {
   return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return (
         cells[a].textContent === currentPlayer &&
         cells[b].textContent === currentPlayer &&
         cells[c].textContent === currentPlayer
      );
   });
}

function checkDraw() {
   return Array.from(cells).every(cell => cell.textContent !== "");
}

function announceWinner() {
   alertMsg(`Player ${currentPlayer} wins!`);
}

function announceDraw() {
   alertMsg("It's a draw!");
}

function alertMsg(msg) {
   const div = document.createElement('div')
   div.textContent = msg
   alertDiv.appendChild(div)

   setTimeout(() => { alertDiv.innerHTML = '' }, 5000);
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

resetButton.addEventListener("click", handleResetClick);
