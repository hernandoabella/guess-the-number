// ADIVINA EL NÚMERO 

function modoOscuro() {
    document.getElementsByClassName('container')[0].classList.toggle('modo-oscuro');
    document.getElementsByClassName('dark-mode-btn')[0].classList.toggle('modo-oscuro1');
    document.querySelector('h1').classList.toggle('modo-oscuro');
    document.getElementsByClassName('hamburger')[0].classList.toggle('modo-oscuro');
    document.getElementsByClassName('active')[0].classList.toggle('modo-oscuro');
}

// Generar un número aleatorio entre 1 y 500
let randomNumber = parseInt((Math.random() * 100) + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 0;
let playGame = true;

if (playGame){
    subt.addEventListener('click', function(e){
        e.preventDefault();
        //Grab guess from user
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if (isNaN(guess)){
        displayMessage(`Por favor ingresa un número válido`);
    } else if (guess < 1) {
        displayMessage(`Por favor ingresa un número mayor que 1`);
    } else if (guess > 100){
        displayMessage(`Por favor ingresa un número menor que 100`);
    } else {
        //Keep record of number of attempted guesses
        previousGuesses.push(guess);
        //Check to see if game is over
        if (numGuesses === 10){
            displayGuesses(guess);
            displayMessage(`😐 ¡Perdiste! El número era ${randomNumber}`);
            endGame();
        } else {
        //Display previous guessed numbers
        displayGuesses(guess);
        //Check guess and display if wrong
        checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    // Muestra una pista de si el número adivinado es demasiado alto o demasiado bajo
    if (guess === randomNumber){
        displayMessage(`🥳 ¡Felicidades lo has adivinado!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`¡Demasiado bajo!`);
    } else if (guess > randomNumber) {
        displayMessage(`¡Demasiado alto!`);
    }
}

function displayGuesses(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    numGuesses++
    remaining.innerHTML = `${11 - numGuesses}  `;
}

function displayMessage(message){
        lowOrHi.innerHTML = `<p>${message}</p>`
}

function endGame(){
    //Clear user input
    userInput.value = '';
    //Disable user input button
    userInput.setAttribute('disabled', '');
    //Display Start new Game Button
    p.classList.add('button');
    p.innerHTML = `<p id="newGame">Nuevo Juego</p>`
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(){
        // Elegir un nuevo número aleatorio
        randomNumber = parseInt((Math.random() * 100) + 1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}
//Allow to restart game with restart button
//Change DIV to a form so it can accept the enter key

//NOTES:
//NaN != NaN