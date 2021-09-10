class UI {
  constructor() {
      this.icon = document.getElementById('w-icon');
      this.location = document.getElementById('w-location');
      this.desc = document.getElementById('w-desc');
      this.string = document.getElementById('w-string');
      this.details = document.getElementById('w-details');
      this.humidity = document.getElementById('w-humidity');     
      this.feelslike = document.getElementById('w-feels-like');     
      this.pressure = document.getElementById('w-pressure');
      this.wind = document.getElementById('w-wind');

    }
    
    paint(weather) {
    const weatherIcon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    this.icon.setAttribute("src", weatherIcon);
    this.icon.setAttribute("alt", weather.weather[0].main);
  
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].main;
    this.string.innerHTML = `${weather.main.temp} &deg;C`;
    this.humidity.innerHTML = `Humidity : ${weather.main.humidity} %`;
    this.feelslike.innerHTML = `Feels Like : ${weather.main.feels_like} &deg;C`;
    this.pressure.innerHTML = `Pressure : ${weather.main.pressure} hPa`;
    this.wind.innerHTML = `Wind : ${weather.wind.speed} m.s<sup>-1</sup>`;
  }
}