// DOM
let month = document.querySelector('#month');
let days = document.querySelector('#days');
let hours = document.querySelector('#hours');
let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let specific_timer = document.querySelector('.am-or-pm');


let today = '13th May, 2021';

function initialize() {

    //current time
    let current = new Date();
    
    let currentMonth = String(current.getMonth()).padStart(2, '0');
    month.textContent = currentMonth;
    
    let currentDay = current.getDate();
    days.textContent = currentDay;
    
    let currentHour = current.getHours();
    hours.textContent = currentHour;
    
    let currentMinute = current.getMinutes();
    minutes.textContent = currentMinute;
    
    let currentsecond = current.getSeconds();
    seconds.textContent = currentsecond;
}

// initialize();
setInterval(initialize, 1000);