// Game values
let min = 1, max = 10, correctNumber = getRandomNumber(), guessesLeft = 3;

// UI elements
const UIgame = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessButton = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-number'),
      message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessButton.addEventListener('click', mainFnc);

// Play again event listener
UIgame.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again')
        window.location.reload();
})

function mainFnc() {
    let guess = parseInt((guessInput.value));
    console.log(guess);

    if(isNaN(guess) || guess < min || guess > max) {
        setErrorMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === correctNumber) {
        
        gameOver(true, `${correctNumber} is correct!`);

    }else {
        guessesLeft--;
        
        if(guessesLeft === 0) {
            
            gameOver(false, `You lost bitch, the correct number was ${correctNumber}`);

        }else {
            
            // Clear Input Field
            guessInput.value = "";

            setErrorMessage(`${guess} was incorrect!, You have only ${guessesLeft} guesses left`, 'red');
        }
    }
}

function gameOver(status, message) {
        
        let color = status === true ? "green" : "red";


        // Disable Input
        guessInput.disabled = true;
        // Change the color of the border to green
        guessInput.style.borderColor = color;
        // Set Message
        setErrorMessage(message, color);

        // Play new game
        guessButton.value = 'Play Again';
        guessButton.className = 'play-again';
}

function setErrorMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

function checkEnterKey(e) {
    if(event.keyCode == 13) {
        mainFnc();
    }
}

function getRandomNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

console.log(`Correct Number -> ${correctNumber}`);