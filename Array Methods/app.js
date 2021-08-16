const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const show_millionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calcWealth = document.getElementById('calculate-wealth');
const mainSection = document.getElementById('main');

// Global Storage for user information
let data = [];

async function getUserData() {
    const data = await fetch('https://randomuser.me/api');
    const response = await data.json();
    
    const randomMoney = Math.floor(Math.random() * 1000000);
    
    const newUser = {
        firstName: response.results[0].name.first,
        lastName: response.results[0].name.last,
        money: randomMoney
    };

    console.log(newUser);
    addNewUser(newUser);
};

function addNewUser(newUser) {
    data.push(newUser);

    updateUI();
};

function doubleMoney() {
    data = data.map(user => {
        return { ...user ,money: user.money * 2};
    });
    updateUI();
    totalWealth();
};

function sortsArray() {
    data.sort(function(a, b) {
        return b.money - a.money;
    });
    updateUI();
};

function showRich() {
    data = data.filter(function(people) {
        return people.money >= 1000000;
    });

    updateUI();
};

function totalWealth() {
    const totalAmt = data.reduce((total, currentValue) => (total += currentValue.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Amount: <strong>${formatMoney(totalAmt)}</strong></h3>`

    mainSection.appendChild(wealthEl);
}

function updateUI(dataStructure = data) {
    console.log(dataStructure);
    
    mainSection.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    
    dataStructure.forEach(dataSTR => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${dataSTR.firstName} ${dataSTR.lastName}</strong> ${formatMoney(dataSTR.money)}`;
        
        mainSection.appendChild(element);
    });


};

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}


addUser.addEventListener('click', getUserData);
double.addEventListener('click', doubleMoney);
sort.addEventListener('click', sortsArray);
show_millionaires.addEventListener('click', showRich);
calcWealth.addEventListener('click', totalWealth);

