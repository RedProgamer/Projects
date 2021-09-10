class Weather {
    constructor(city, country) {
        this.apiKey = 'e0e3512cb56d29cf0348266f31533d9b',
        this.city = city;
        this.country = country;
    }

    async getWeatherData() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.apiKey}`);
        const resData = await response.json();

        return resData;
    }

    // Change weather location
    changeLocation(city, country) {
        this.city = city;
        this.country = country;
    }
}