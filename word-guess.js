const readline = require('readline');

// Array of 20 single-word nouns
const words = [
  'planet', 'guitar', 'window', 'ocean', 'forest',
  'castle', 'rocket', 'camera', 'pencil', 'bridge',
  'dragon', 'flower', 'helmet', 'mirror', 'cloud',
  'button', 'tunnel', 'cookie', 'mountain', 'shadow'
];

// Randomly select a word
const word = words[Math.floor(Math.random() * words.length)];

const guessedLetters = new Set();
let remainingAttempts = 6;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayWord() {
  return word
    .split('')
    .map(letter => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');
}

function askGuess() {
  console.log(`\nWord: ${displayWord()}`);
  console.log(`Guessed: ${[...guessedLetters].join(', ') || 'None'}`);
  console.log(`Attempts left: ${remainingAttempts}`);

  rl.question('Guess a letter: ', input => {
    const guess = input.toLowerCase();

    if (!/^[a-z]$/.test(guess)) {
      console.log('Please enter a single letter.');
    } else if (guessedLetters.has(guess)) {
      console.log('You already guessed that letter.');
    } else {
      guessedLetters.add(guess);
      if (!word.includes(guess)) {
        remainingAttempts--;
        console.log(`Wrong guess!`);
      } else {
        console.log(`Good guess!`);
      }
    }

    if (word.split('').every(letter => guessedLetters.has(letter))) {
      console.log(`\nYou won! The word was "${word}".`);
      rl.close();
    } else if (remainingAttempts === 0) {
      console.log(`\nGame over! The word was "${word}".`);
      rl.close();
    } else {
      askGuess();
    }
  });
}

console.log('Welcome to the Word-Guessing Game!');
askGuess();
