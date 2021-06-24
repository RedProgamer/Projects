document.querySelector('form').addEventListener('submit', getJokes);

function getJokes(e) {
    
    const number = document.querySelector('input[type="number"]').value;
    const api_URL = `http://api.icndb.com/jokes/random/${number}`;
    const jokeArea = document.querySelector('.list-group');

    let output = '';

    fetch(api_URL)
        .then((response) => {
            return response.json();
        })
        .then((jokeData) => {
            if(jokeData.type == 'success') {
                jokeData.value.forEach(function(joke) {
                    output += `
                        <li class="list-group-item">${joke.joke}</li>
                    `;
                    console.log(joke.joke);
                });
            }else {
                output += `
                    <li class="list-group-item"> Oops, something went wrong </li>
                `
            }
        })
        .then ((JokeData) => {
            jokeArea.innerHTML = output;
        });
    
    e.preventDefault();
}



