const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const heading = document.querySelector('h1');

const randomNumber1 = Math.floor(Math.random() * 6) + 1;
const randomNumber2 = Math.floor(Math.random() * 6) + 1;

if(randomNumber1 > randomNumber2) {
    heading.textContent = `Player 1 won`;
}else {
    heading.textContent = `Player 2 won`;
}

img1.setAttribute('src', `img/dice${randomNumber1}.png`);
img2.setAttribute('src', `img/dice${randomNumber2}.png`);
