const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const main = document.querySelector('.content');

let index = 0;
let users = [];

async function getUsesrProfile() {
    const data = await fetch('https://randomuser.me/api/?results=2&?gender=female');
    const response = await data.json();

    console.log(response);

    response.results.forEach(function(user){
        users.push(user);
    });
};


function showProfile(index) {
    getUsesrProfile();
    const currentProfile = users[index];

    let output = `
            <img class="mb-5" src="${currentProfile.picture.large}" alt="random-image">
    
            <ul class="list-group">
                <li class="list-group-item">Name : ${currentProfile.name.first} ${currentProfile.name.last}</li>
                <li class="list-group-item">Age: ${currentProfile.dob.age}</li>
                <li class="list-group-item">Phone no : ${currentProfile.phone}</li>
                <li class="list-group-item">Email : ${currentProfile.email}</li>
                <li class="list-group-item">Country: ${currentProfile.location.country}</li>
            </ul>
        `;
    main.innerHTML = output;
}

window.onload = async function() {
    await getUsesrProfile();
    const currentProfile = users[index];

    main.innerHTML = `
            <img class="mb-5" src="${currentProfile.picture.large}" alt="random-image">
    
            <ul class="list-group">
                <li class="list-group-item">Name : ${currentProfile.name.first} ${currentProfile.name.last}</li>
                <li class="list-group-item">Age: ${currentProfile.dob.age}</li>
                <li class="list-group-item">Phone no : ${currentProfile.phone}</li>
                <li class="list-group-item">Email : ${currentProfile.email}</li>
                <li class="list-group-item">Country: ${currentProfile.location.country}</li>
            </ul>
    `;
}


nextBtn.addEventListener('click', ()=> {
    index++;
    showProfile(index);

    prevBtn.disabled = false;

});
prevBtn.addEventListener('click', ()=> {
    index--;
    if(index <= 0) {
        prevBtn.disabled = true;
        index = 0;
    }
    showProfile(index);
});