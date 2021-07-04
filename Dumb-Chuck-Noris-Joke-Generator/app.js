document.querySelector('form').addEventListener('submit', getJokes);

// function getJokes(e) {
    
//     const number = document.querySelector('input[type="number"]').value;
//     const api_URL = `http://api.icndb.com/jokes/random/${number}`;
//     const jokeArea = document.querySelector('.list-group');

//     let output = '';

//     fetch(api_URL)
//         .then((response) => {
//             return response.json();
//         })
//         .then((jokeData) => {
//             if(jokeData.type == 'success') {
//                 jokeData.value.forEach(function(joke) {
//                     output += `
//                         <li class="list-group-item">${joke.joke}</li>
//                     `;
//                     console.log(joke.joke);
//                 });
//             }else {
//                 output += `
//                     <li class="list-group-item"> Oops, something went wrong </li>
//                 `
//             }
//         })
//         .then ((JokeData) => {
//             jokeArea.innerHTML = output;
//         });
    
//     e.preventDefault();
// }

function getJokes(e) {
    
    const categoryStorage = ['explicit', 'nerdy'];

    console.log(categoryStorage);


    const number = document.querySelector('input[type="number"]').value;
    // const api_URL = `http://api.icndb.com/jokes/random/${number}?limitTo=categoryStorage`;
    const api_URL = `https://icanhazdadjoke.com/`;
    const jokeArea = document.querySelector('.list-group');
    const selectedCategories = document.querySelectorAll('input[name="category"]:checked');
    
    // http://api.icndb.com/jokes/random?limitTo=[nerdy]

    // let output = '';

    fetch(api_URL)
        .then((response) => {
            return response.json();
        })
        .then((jokes) => console.log(jokes));

    selectedCategories.forEach((category) => {
        categoryStorage.push(category.value);
    });
    
    console.log(categoryStorage);
    
    e.preventDefault();
}


