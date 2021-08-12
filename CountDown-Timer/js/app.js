// DOM
let month = document.querySelector('#month');
let days = document.querySelector('#days');
let hours = document.querySelector('#hours');
let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let specific_timer = document.querySelector('.am-or-pm');


// let today = '13th May, 2021';
const nextYear = new Date().getFullYear() + 1;
const newYear = new Date(`01-01-${nextYear}`);

function initialize() {
    
    //current time
    let current = new Date();
    let diff = new Date(newYear - current);

    
    let currentMonth = String(diff.getMonth()).padStart(2, '0');
    month.textContent = currentMonth;
    
    let currentDay = diff.getDate();
    days.textContent = currentDay;
    
    let currentHour = diff.getHours();
    hours.textContent = currentHour;
    
    let currentMinute = diff.getMinutes();
    minutes.textContent = currentMinute;
    
    let currentsecond = diff.getSeconds();
    seconds.textContent = currentsecond;
}

// initialize();
setInterval(initialize, 1000);