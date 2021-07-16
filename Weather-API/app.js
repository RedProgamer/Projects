// Initialize weather class
const weather = new Weather('Kolkata', 'in');

weather.changeLocation("New York", "us");

weather.getWeatherData()
.then(data => console.log(data))
.catch(err => console.log(err));
