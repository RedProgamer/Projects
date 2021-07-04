const my_client_id = 'f20f69e416c344528351a1fa7910ee19';
const base_url = 'https://api.spotify.com';

async function authorize(url, client_id) {
    const response = await fetch(url, {
        client_id: client_id,
        method: "GET",
        response_type: "code"
    });

    const data = await response.json();

    return data;
};

const str = 'values3453534'.encode();
const str_b64 = base64
console.log(str);