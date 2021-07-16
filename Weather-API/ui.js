const myModal = document.getElementById('locModal');
const myInput = document.querySelector('.btn-primary');

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
});