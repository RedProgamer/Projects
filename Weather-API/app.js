// Initialize weather class
const weather = new Weather('Kolkata', 'in');
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    weather.getWeatherData()
    .then(data => ui.paint(data))
    .catch(err => console.log(err));    
};


