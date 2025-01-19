"use strict";

const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const guessMessage = document.getElementById('guess-message');
const currentGuess = document.getElementById('current-guess');
const computerGuess = document.getElementById('computer-guess');
const guessHistory = document.getElementById('guess-history');

// Define game variables
let randomNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
let attemptsLeft = 3;
let history = [];

// Function to handle the game logic
function handleGuess() {
    const userGuess = parseInt(guessInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        guessMessage.textContent = 'Please enter a number between 1 and 10.';
        return;
    }

    // Add current guess to history
    history.push(userGuess);
    guessHistory.textContent = history.join(', ');

    // Update current guess and computer guess
    currentGuess.textContent = userGuess;
    computerGuess.textContent = randomNumber;

    // Check for win or loss
    if (userGuess === randomNumber) {
        guessMessage.textContent = 'Congratulations, you won!';
        endGame();
    } else {
        attemptsLeft--;
        if (attemptsLeft === 0) {
            guessMessage.textContent = `You lost! The correct number was ${randomNumber}.`;
            endGame();
        } else {
            guessMessage.textContent = userGuess < randomNumber ? 'Too low!' : 'Too high!';
        }
    }
}

// Function to disable game when over
function endGame() {
    submitBtn.disabled = true;
    restartBtn.disabled = false;
}

// Event listener for the submit button
submitBtn.addEventListener('click', handleGuess);

// Event listener for the restart button
restartBtn.addEventListener('click', () => {
    // Reset game variables
    randomNumber = Math.floor(Math.random() * 10) + 1;
    attemptsLeft = 3;
    history = [];
    
    // Reset HTML elements
    guessMessage.textContent = 'Try to guess the computer\'s number within 3 tries!';
    currentGuess.textContent = '';
    computerGuess.textContent = '';
    guessHistory.textContent = '';
    
    // Enable the submit button and disable restart button
    submitBtn.disabled = false;
    restartBtn.disabled = true;
});
