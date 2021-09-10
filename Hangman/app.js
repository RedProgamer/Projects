const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figurePart = document.querySelectorAll('.figure-part');
const loadingGif = document.getElementById('loading');

let selectedWord = null;

function getWords() {
    fetch('words.json')
    .then(data => data.json())
    .then(res => parseArray(res));
}

function parseArray(response) {    
    const length = response.length;
    selectedWord = response[Math.floor(Math.random() * length)];
};

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
};

// Updates the wrong letters
function updateWrongLettersEl() {
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figurePart.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }
    });

    // check if lost
    if(wrongLetters.length === figurePart.length) {
        finalMessage.innerText = `You lost!\nActual Word : ${selectedWord}`;
        popup.style.display = 'flex';
    }
};

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
};
// Event Listener for play again button
playAgainBtn.addEventListener('click', () => {window.location.reload()});

// keydown letter press
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                
                displayWord();
            }else {
                showNotification();
            }
        }else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            }else {
                showNotification();
            }
        }
    }
});

getWords();
setTimeout(() => {
    loadingGif.style.display = 'none';
    displayWord()
}, 1000);

