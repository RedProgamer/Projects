document.querySelector('form').addEventListener('submit', getJokes);

function getJokes(e) {
    
    const categoryStorage = ['explicit', 'nerdy'];

    const number = document.querySelector('input[type="number"]').value;
    const api_URL = `http://api.icndb.com/jokes/random/${number}`;
    const jokeArea = document.querySelector('.list-group');
    const selectedCategories = document.querySelectorAll('input[name="category"]:checked');

    let output = "";
    
    fetch(api_URL)
        .then((response) => {
            return response.json();
        })
        .then(jokes => {
            console.log(jokes);
            jokes.value.forEach(function(joke) {
                output += `<li>${joke.joke}</li>`;
            });
        })
        .then(unUsed => jokeArea.innerHTML = output);
        
    console.log(output);
        
    e.preventDefault();
}


