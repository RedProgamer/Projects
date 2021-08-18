const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amtInput = document.getElementById('amount');


const itemCtrl = new Item();

function submittedForm(e) {
    itemCtrl.addItem(textInput.value, amtInput.value);

    e.preventDefault();
}


form.addEventListener('submit', submittedForm);