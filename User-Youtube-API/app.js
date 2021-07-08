// DOM objects
const signInButton = document.querySelector('#login-out');
const revokeButton = document.querySelector('#revokeAccess');
const alertMenu = document.querySelector('.alert');
const documentContainer = document.querySelector('.container-lg');

// Client-Side Information
const client_id = '998400505735-v15ojonfpscdpcqc2llb1vts68gds3c6.apps.googleusercontent.com';
const client_secret = 'ZMSDHFOfC7fQXD1Leq8mkoq2';
const api_key = 'AIzaSyD9FNaxC-juqGCpeUKo8NPLN31OgAD601Q';
const SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';
const discovery = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

let GoogleAuth; // Google Auth object.

function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
};

function initClient() {
  gapi.client.init({
      'apiKey': api_key,
      'clientId': client_id,
      'scope': SCOPE,
      'discoveryDocs': [discovery]
  }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
      setSigninStatus();

      signInButton.addEventListener('click', handleAuthClick);
      revokeButton.addEventListener('click', revokeAccess);
  });
}

let isAuthorized;
let currentApiRequest;

/**
 * Store the request details. Then check to determine whether the user
 * has authorized the application.
 *   - If the user has granted access, make the API request.
 *   - If the user has not granted access, initiate the sign-in flow.
 */
 function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked "Sign out" button.
      GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn();
    }
  }

  function revokeAccess() {
    GoogleAuth.disconnect();
  }

  function setSigninStatus() {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        signInButton.textContent = 'Sign out';

        revokeButton.style.display = 'inline-block';

        alertMenu.innerHTML = `You are currently signed in and have granted access to this app.`;
        getChannelInfo();
    } else {
        signInButton.textContent = 'Sign In/Authorize';

        revokeButton.style.display = 'none';
        
        alertMenu.innerHTML = `You have not authorized this app or you are signed out.`;
    }
}

function updateSigninStatus() {
    setSigninStatus();
}

function getChannelInfo() {
    const request = gapi.client.request({
        'method': 'GET',
        'path': '/youtube/v3/channels',
        'params': {
            'part': 'snippet, contentDetails, statistics',
            'mine': 'true'
        }
    });
    // Execute the API request.
    request.execute(function(response) {
        console.log(response);

        const statistics = response['items'][0].statistics;
        const uploadsPlaylists = response.items[0].contentDetails.relatedPlaylists.uploads;

        showChannelStats(statistics);
        getChannelVideos(uploadsPlaylists);

        console.log(statistics);
        console.log(uploadsPlaylists);
    });
};

function getChannelVideos(uploadsPlaylistsId) {
    const responseParams = {
        "part": [
            'snippet, contentDetails'
        ],
        "maxResults": 10,
        "playlistId": uploadsPlaylistsId
    };

    const serverData = gapi.client.youtube.playlistItems.list(responseParams);

    serverData.execute(function(responseObject) {
        
        console.log(responseObject);
        
        responseObject.items.forEach(function(objects) {
            const video_object = objects.snippet;
            console.log(video_object);
            // displayVideosCards(video_object);
        });

    });
};

function showChannelStats(stats) {
    // const requestOptions = {

    // }
}

function displayVideosCards(object) {

    let output = "";
    output += `
        <div class="card" style="width: 18rem;">
            <img src="${object.thumbnails.maxres.url}" class="card-img-top" alt="Youtube Video Thumbnail">
            <div class="card-body">
                <h5 class="card-title">${object.title}</h5>
                <p class="card-text">${object.description.substring(0, 100)}</p>
                <a href="https://youtu.be/${object.resourceId.videoId}" class="btn btn-primary">Watch</a>
            </div>
        </div>`;

    documentContainer.innerHTML = output;
};







