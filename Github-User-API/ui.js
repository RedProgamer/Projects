class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    showProfile(user, totalRepos) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mb-2" src="${user.avatar_url}">
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                </div>
                <div class="col-md-9">
                    <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
                    <span class="badge bg-secondary">Public Gists: ${user.public_gists}</span>
                    <span class="badge bg-success">Followers: ${user.followers}</span>
                    <span class="badge bg-info">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Website/Blog: ${user.blog}</li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
                </div>
            </div>
            
            <h3 class="page-heading mb-3">Latest Repos 
            <span class="badge bg-primary"> ${totalRepos.length}</span></h3>
            
            
            <div id="repos"></div>
            `;
        }
        
    showRepos(repos) {
        let output = '';

        for(let i = 0; i < 5; i++) {
            const repo = repos[i];
            output += `
                <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                    <span class="badge bg-primary">Stars: ${repo.stargazers_count}</span>
                    <span class="badge bg-secondary">Watchers: ${repo.watchers_count}</span>
                    <span class="badge bg-success">Forks: ${repo.forms_count}</span>
                    </div>
                </div>
                </div>
            `;
        };
            // });
    // Output repos
    document.getElementById('repos').innerHTML = output;

    }

    // Show alert message when there is no user found
    showAlert(msg, className) {

        // Remove any remaining errors
        this.clearAlert();


        const div = document.createElement('div');
        div.className = className;

        // Add Text
        div.appendChild(document.createTextNode(msg));

        // Get parent
        const parent = document.querySelector('.searchContainer');
        const search = document.querySelector('.search');

        // Insert Alert
        parent.insertBefore(div, search);


        // Remove alert after 3s
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const holder = document.querySelector('.alert');

        if(holder) {
            holder.remove();
        }
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }
}