const hours = document.querySelector('.hour');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const milli_seconds = document.querySelector('.milli-seconds');


const startBtn = document.querySelector('.start');
const lapsBtn = document.querySelector('.laps');
const resetBtn = document.querySelector('.reset');


const listGroup = document.querySelector('.list-group');

const table = document.querySelector('.table');
const tableRow = document.querySelector('tbody');
const tableBody = document.querySelector('tbody tr');

let x;
let switcher = 1;

function startStop() {
    if(switcher === 1) {
        start();
        switcher = 2;
        startBtn.textContent = 'Stop';
    }else if(switcher === 2) {
        stop(); 
        switcher = 1;
        startBtn.textContent = 'Start';
    }
};

function start(delay=10) {
    x = setInterval(timer, delay);
    lapsBtn.disabled = false; 
    resetBtn.disabled = false;     
};

function stop() {
    clearInterval(x);
    lapsBtn.disabled = true;
};

let hrs = 0, mins = 0, secs = 0, miliSec = 0;
let hourOut = 0, minutesOut = 0, secondsOut = 0, milliSecondsOut = 0;

// Lapse variables
let previousLapse = 0, TotalmilliSeconds = 0, diff = 0, id = 1;
let timeLists = [];
let time = {};
let lastLaps = {hours: 0, mins: 0, secs: 0, milliseconds: 0};
let lapHour = 0, lapMins = 0, lapSeconds = 0, lapMilliseconds = 0;
   
function timer() {

    hourOut = hrs;
    minutesOut = mins;
    secondsOut = secs;
    milliSecondsOut = miliSec;
    
    ++miliSec;  
    
    if(miliSec === 100) {
        miliSec = 0;
        secs++;
    }
    
    if(secs === 60) {
        secs = 0;
        mins++;
    }
    
    if(mins === 60) {
        mins = 0;
        hrs++;
    }
    
    
    hours.innerHTML = cleaner(hourOut);
    minutes.innerHTML = cleaner(minutesOut);
    seconds.innerHTML = cleaner(secondsOut);
    milli_seconds.innerHTML = cleaner(milliSecondsOut); 
};

function cleaner(time) {
    if(time < 10) {
        time = `0${time}`;
    }
    return time;
};

function lapsRecord() {

    time = {
        id: id,
        hours: hrs,
        minutes: mins,
        seconds: secs,
        milliSeconds: miliSec
    };
    // console.log(`Hour : ${time.hours}, Minutes : ${time.minutes}, Seconds : ${time.seconds}, Milliseconds : ${time.milliSeconds}`);
    id++;

    const diff = differenceInTime(time);
    addToTable(time, diff);

};

function reset() {
    
    switcher = 2;
    startStop();
    
    hrs = 0, mins = 0, secs = 0, miliSec = 0;
    previousLapse = 0, TotalmilliSeconds = 0, diff = 0, id = 1;

    timeLists = [];
    time = {};
    lastLaps = {hours: 0, mins: 0, secs: 0, milliseconds: 0};
    lapHour = 0, lapMins = 0, lapSeconds = 0, lapMilliseconds = 0;
        
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    milli_seconds.innerHTML = "00";
    
    // Removing Lists
    let items = document.querySelectorAll('tbody tr');
    items = Array.from(items);
    
    items.forEach(function(item) {
        item.remove();
    });
    
    startBtn.textContent = 'Start';
    
    resetBtn.disabled = true;
};

function addToTable(time, diff) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');

    th.scope = 'row';
    th.textContent = time.id;

    const td = document.createElement('td');
    td.appendChild(document.createTextNode(`${cleaner(time.hours)}:${cleaner(time.minutes)}:${cleaner(time.seconds)}.${cleaner(time.milliSeconds)}`));
    // lapHour,
        // lapMins,
        // lapSeconds,
        // lapMilliseconds
    // Difference Element
    const diffTd = document.createElement('td');
    diffTd.appendChild(document.createTextNode(`+${cleaner(diff.lapHour)}:${cleaner(diff.lapMins)}:${cleaner(diff.lapSeconds)}.${cleaner(diff.lapMilliseconds)}`))

    tr.appendChild(th);
    tr.appendChild(diffTd);
    tr.appendChild(td);

    tableRow.appendChild(tr);
}

function differenceInTime(time) {
    console.log(time);
    console.log(lastLaps);

    lapHour = time.hours - lastLaps.hours;
    lapMins = time.minutes - lastLaps.mins;
    lapSeconds = time.seconds - lastLaps.secs;
    lapMilliseconds = Math.abs(time.milliSeconds - lastLaps.milliseconds);

    lastLaps = {
        hours: time.hours,
        mins: time.minutes,
        secs: time.seconds,
        milliseconds: time.milliSeconds,
    };
    console.log(lastLaps);

    return {
        lapHour,
        lapMins,
        lapSeconds,
        lapMilliseconds
    };
    
};


(function innit() {
    lapsBtn.disabled = true;
    resetBtn.disabled = true;
})();




startBtn.addEventListener('click', startStop);
lapsBtn.addEventListener('click', lapsRecord);
resetBtn.addEventListener('click', reset);
