const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('password2');
const form = document.getElementById('form');

function showSuccess(element) {

    const parentElement = element.parentElement;

    if(parentElement.classList.contains('error'))
        parentElement.classList.remove('error');
    
    element.parentElement.classList.add('success');
}

function showError(element, msg) {
    const parentElement = element.parentElement;
    
    parentElement.classList.remove('success');
    parentElement.classList.add('error');

    const smallErrorMsg = parentElement.querySelector('small');
    smallErrorMsg.innerText = msg;
}

function checkForm(e) {
    
    if(validUsername(username.value)) {
        showSuccess(username);
    }else {
        showError(username, 'Username should be aleast 3 characters')
    }

    if(validEmail(email.value)) {
        showSuccess(email);
    }else {
        showError(email, 'Email is not valid');
    }

    if(validPassword(password.value)) {
        showSuccess(password);
    }else {
        showError(password, 'Password must be 6 characters');
    }

    if(validConfirmPassword(confirmPass.value)) {
        showSuccess(confirmPass);
    }else {
        showError(confirmPass, 'Password did not match');
    }

    e.preventDefault();
}

function validUsername(username) {
    return username.length >= 3;
}

function validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function validPassword(password) {
    return password.length >= 6;
}

function validConfirmPassword(confirmPassword) {
    if(confirmPassword.length > 0) {
        return password.value === confirmPassword;
    }
    return false;
}

form.addEventListener('submit', checkForm);