const filter = document.getElementById('filter');
const posts = document.getElementById('posts-container');
const loading = document.querySelector('.loader');

let page = 1;
let limit = 3;

async function getPosts() {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const response = await data.json();
    
    return response;
}

async function addPost() {
    const data = await getPosts();
    console.log(data);

    data.forEach(function(item) {
        const { id, title, body } = item;
        
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
            <div class="number">${id}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <p class="post-body">${body}</p>
            </div>
        `;
        
        posts.append(div);
    });

}

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');
        
        setTimeout(() => {
            page++;
            addPost();
        }, 300);

    }, 1000);
};

function filterF(e) {
    const input = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(function(post) {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(input) > -1 || body.indexOf(input) > -1) {
            post.style.display = 'flex';
        }else {
            post.style.display = 'none';
        }
    });
}

filter.addEventListener('keyup', filterF);

window.onload = addPost;
window.addEventListener('scroll', function() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

