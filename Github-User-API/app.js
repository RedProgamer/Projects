// Init Github
const github = new Github();

// Init UI
const ui = new UI();

// Search Input
const searchUser = document.getElementById('searchUser');

// Search Input event Listener
searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;


    if(userText != '') {
        // Make HTTP call
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === "Not Found") {
                // Show Alert
                ui.showAlert('User not found', 'alert alert-danger');
            }else {
                // Show Profile
                ui.showProfile(data.profile, data.repository);
                ui.showRepos(data.repository);
                console.log(data);
            }
        });
    }else {
        // Clear Profile
        ui.clearProfile();
    }
});