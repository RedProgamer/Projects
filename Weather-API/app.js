// Initializing storage class
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();

// Initialize weather class
const weather = new Weather(weatherLocation.city, weatherLocation.country);
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    weather.getWeatherData()
    .then(data => ui.paint(data))
    .catch(err => console.log(err));    
};


//Changing Weather
const new_city = document.getElementById('city');
const new_country = document.getElementById('country');
const changesBtn = document.getElementById('w-change-btn');


changesBtn.addEventListener('click', changeWeather);

function changeWeather() {
    if(handleEdgeCases())
        $('#locModal').modal('hide');
    
    weather.changeLocation(new_city.value, new_country.value);
    
    // set location in localStorage
    storage.setLocationData(new_city.value, new_country.value);
    
    getWeather();

};

// Handling edge cases

function handleEdgeCases() {
    if(new_city.value.trim() === '' && new_country.value.trim() === '')
        alert('Empty Fields, please fill them');
    else if(new_city.value.trim() === '')
        alert('Please fill the city field');
    else if(new_country.value.trim() === '')
        alert('Please fill the country field (IN)');
    else if(new_city.value.trim() && new_country.value.trim())
        return true;
    return false;
}




