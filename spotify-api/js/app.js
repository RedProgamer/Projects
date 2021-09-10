const my_client_id = 'f20f69e416c344528351a1fa7910ee19';
const my_client_secret = 'cfe3e6e9cfb7455e83ad9a6f1c9d6f0e';
const token_url = 'https://accounts.spotify.com/authorize';

const value = `
curl -X "GET" "" -H "Accept: application/json" -H "Content-Type: application/json" -H ""
`

async function getPlaylists() {

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQBvDiDsGnFW2dFs_nk9E78ynBWIiUhjmJQ3uFKcYtmYjcPGJgldxU0a5hxqH_bF9TbVwTZaoRKTqMz71nGL08Mr_qdbuKxZL2yOyu4gXG_ssfbwvswoVcI4oNih7DjTzN2uDHqxgyets7CKCX0NA0F_tll7KvCEYnw9mrPT14r0u7KBONFD_6okpX0CRcYYZOjn1wQRBbiNz9E2FXKnFWeNP21GotEAVoz73iDCuzES37avr2ZoeBuAGiwWxQRBpPYHgWIcTmPzpJ3uhj2CtEup8g3JKJp2Q0Lo1chE"curl -X "GET" "https://api.spotify.com/v1/me/playlists" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBvDiDsGnFW2dFs_nk9E78ynBWIiUhjmJQ3uFKcYtmYjcPGJgldxU0a5hxqH_bF9TbVwTZaoRKTqMz71nGL08Mr_qdbuKxZL2yOyu4gXG_ssfbwvswoVcI4oNih7DjTzN2uDHqxgyets7CKCX0NA0F_tll7KvCEYnw9mrPT14r0u7KBONFD_6okpX0CRcYYZOjn1wQRBbiNz9E2FXKnFWeNP21GotEAVoz73iDCuzES37avr2ZoeBuAGiwWxQRBpPYHgWIcTmPzpJ3uhj2CtEup8g3JKJp2Q0Lo1chE'
        }
    });

    const data = await response.json();
    return data;
};

getPlaylists().then(resData => console.log(resData));

