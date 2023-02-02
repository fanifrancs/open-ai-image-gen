const button = document.querySelector('button'),
      inputField = document.querySelector('input'),
      imgDisplay = document.querySelector('#img-display'),
      spinner = '<div class="spinner-grow text-danger"></div>';

button.addEventListener('click', () => {
    if (inputField.value) {
        imgDisplay.innerHTML = spinner;
    }
})
