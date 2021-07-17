class UI {
  constructor() {
      this.location = document.getElementById('w-location');
      this.desc = document.getElementById('w-desc');
      this.string = document.getElementById('w-string');
      this.details = document.getElementById('w-details');
      this.humidity = document.getElementById('w-humidity');     
      this.feelslike = document.getElementById('w-feels-like');     
      this.dewpoint = document.getElementById('w-dewpoint');
      this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].main;
    this.string.textContent = `${weather.main.temp} C`;
    this.humidity.textContent = `Humidity : ${weather.main.humidity}`;
    this.feelslike.textContent = `Feels Like : ${weather.main.feels_like}`;
    this.wind.textContent = `Wind : ${weather.wind.speed}`;
  }
}