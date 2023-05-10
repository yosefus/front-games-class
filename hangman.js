const words = ['hangman', 'apple', 'banana', 'orange', 'cherry'];
let currentWord = '';
let guesses = [];
let remainingGuesses = 6;

const wordDisplay = document.querySelector('#word-display');
const guessesDisplay = document.querySelector('#guesses');
const keyboard = document.querySelector('#keyboard');
const resetButton = document.querySelector('#reset-button');
const hangman = document.querySelector('.hangman');

function getRandomWord() {
   return words[Math.floor(Math.random() * words.length)];
}

function generateWordDisplay() {
   let display = '';
   for (const char of currentWord) {
      if (guesses.includes(char)) {
         display += char;
      } else {
         display += '_';
      }
      display += ' ';
   }
   return display;
}

function updateWordDisplay() {
   wordDisplay.textContent = generateWordDisplay();
}

function updateGuessesDisplay() {
   guessesDisplay.textContent = `Guesses: ${guesses.join(', ')}`;
}

function updateKeyboard() {
   keyboard.innerHTML = '';
   for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const button = document.createElement('button');
      button.textContent = letter;
      button.addEventListener('click', () => makeGuess(letter));
      keyboard.appendChild(button);
   }
}

function makeGuess(letter) {
   if (!guesses.includes(letter)) {
      guesses.push(letter);
      if (!currentWord.includes(letter)) {
         remainingGuesses--;
      }
      updateWordDisplay();
      updateGuessesDisplay();
      checkGameStatus();
   }
}

function checkGameStatus() {
   if (generateWordDisplay().indexOf('_') === -1) {
      endGame(true);
   } else if (remainingGuesses === 0) {
      endGame(false);
   }
}

function endGame(isWin) {
   keyboard.innerHTML = '';
   const message = document.createElement('p');
   message.textContent = isWin ? 'Congratulations! You won!' : 'Game over! You lost!';
   message.style.fontWeight = 'bold';
   hangman.appendChild(message);
}

function resetGame() {
   currentWord = getRandomWord().toUpperCase();
   guesses = [];
   remainingGuesses = 6;
   updateWordDisplay();
   updateGuessesDisplay();
   updateKeyboard();

   const p = hangman.querySelector('p')

   if (p) {
      hangman.removeChild(p);
   }
}

resetButton.addEventListener('click', resetGame);

resetGame();
