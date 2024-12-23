// AOS animation
AOS.init({
  once: true
});

document.addEventListener('DOMContentLoaded', () => {
  const preloadImages = (imagePaths) => {
    return Promise.all(
      imagePaths.map((path) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  };

  const images = ['../img/bg-top.png', '../img/bg-bottom.png'];

  const wrapper = document.querySelector('.wrapper');
  if (wrapper) {
    wrapper.style.visibility = 'hidden';
  }

  preloadImages(images)
    .then(() => {
      if (wrapper) {
        wrapper.style.visibility = 'visible';
      }
      document.body.classList.add('animation-ready');
    })
    .catch((error) => console.error('Ошибка загрузки изображения:', error));
});

// work with form
const form = document.querySelector('.js-form');
const loader = document.querySelector('.js-loader');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loader.classList.add('active');
  document.body.classList.add('is-loader');

  const scriptURL =
    'https://script.google.com/macros/s/AKfycbxUqKO0skJ-PSAtVyRmh5tIDJV4NnEJdUG5OordP1cLVEalbtPZK2eNkYhIJAl9A0XY/exec';

  const dataTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  document.querySelector('.js-form-date').value = dataTime;

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      window.location.href =
        'https://christmas-invitation-2024.vercel.app/thanks.html';
      console.log('Success!', response);
    })
    .catch((error) => {
      console.error('Error!', error.message);
    });
});
