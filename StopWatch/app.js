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
   
function timer() {

    hourOut = cleaner(hrs);
    minutesOut = cleaner(mins);
    secondsOut = cleaner(secs);
    milliSecondsOut = cleaner(miliSec);
    
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
    
    
    hours.innerHTML = hourOut;
    minutes.innerHTML = minutesOut;
    seconds.innerHTML = secondsOut;
    milli_seconds.innerHTML = milliSecondsOut; 
};

function cleaner(time) {
    if(time < 10) {
        time = `0${time}`;
    }
    return time;
};

function lapsRecord() {

    if(miliSec <= 0) {
        console.log('No records');
    }else {
        // time = {
        //     id: id,
        //     hours: hrs,
        //     minutes: mins,
        //     seconds: secs,
        //     milliSeconds: miliSec
        // };
        time = {
            id: id,
            hours: hourOut,
            minutes: minutesOut,
            seconds: secondsOut,
            milliSeconds: milliSecondsOut
        };
        // console.log(`Hour : ${time.hours}, Minutes : ${time.minutes}, Seconds : ${time.seconds}, Milliseconds : ${time.milliSeconds}`);
        id++;

        
        const currentLapse = new Date();
        
        currentLapse.setHours(time.hours);
        currentLapse.setMinutes(time.minutes);
        currentLapse.setSeconds(time.seconds);
        currentLapse.setMilliseconds(time.milliSeconds);
        
        TotalmilliSeconds = currentLapse.getTime();
        
        diff = TotalmilliSeconds - previousLapse;
        previousLapse = TotalmilliSeconds;

        // const diffObj = differenceInTime(diff);
        // console.log(diffObj);

        // addToLists(time);
        addToTable(time);
    }

    // console.log("Difference : " + diff);

};

function reset() {

    
    switcher = 2;
    startStop();
    
    hrs = 0, mins = 0, secs = 0, miliSec = 0;
    previousLapse = 0, TotalmilliSeconds = 0, diff = 0, id = 1;
    
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

function addToLists(time) {
    
    const li = document.createElement('li');
    li.className = 'list-group-item';

    li.innerHTML = `Time: ${time.hours}::${time.minutes}::${time.seconds}::${time.milliSeconds}`;
    
    listGroup.appendChild(li);
};

function addToTable(time) {
    console.log('Working');
    console.log(tableRow);

    const tr = document.createElement('tr');
    const th = document.createElement('th');

    th.scope = 'row';
    th.textContent = time.id;

    const td = document.createElement('td');
    td.appendChild(document.createTextNode(`${time.hours}::${time.minutes}::${time.seconds}.${time.milliSeconds}`));

    tr.appendChild(th);
    tr.appendChild(td);

    tableRow.appendChild(tr);
}

// function differenceInTime(diff) {

//     let msec = diff;

//     let hrs = Math.floor(msec / 1000 / 60 / 60);
//     console.log("Hours : " + hrs);
//     msec -= hrs * 1000 * 60 * 60;

//     let minutes = Math.floor(msec / 1000 / 60);
//     console.log("Minutes : " + minutes);
//     msec -= minutes * 1000 * 60;

//     let seconds = Math.floor(msec / 1000);
//     console.log("Seconds: " + seconds);
//     msec -= seconds * 1000;

//     seconds += Math.floor(msec / 100);

//     msec = msec % 100;

//     console.log("Milliseconds : " + msec);

//     return {
//         hours: hrs,
//         minutes: minutes,
//         seconds: seconds,
//         milliseconds: msec
//     }
// };


(function innit() {
    lapsBtn.disabled = true;
    resetBtn.disabled = true;
})();




startBtn.addEventListener('click', startStop);
lapsBtn.addEventListener('click', lapsRecord);
resetBtn.addEventListener('click', reset);
