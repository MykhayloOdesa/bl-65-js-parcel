// https://api.unsplash.com/search/photos?page=1&query=office

import { refs } from './refs';
import { UnsplashAPI } from './unsplashAPI';
import { createGalleryCards } from './markup';

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback, options);

refs.form.addEventListener('submit', onSearch);

const unsplashAPI = new UnsplashAPI();

function onSearch(event) {
  event.preventDefault();

  const value = event.currentTarget.elements.query.value;

  if (!value) {
    return alert('Input any data!');
  }
  refs.list.innerHTML = '';
  unsplashAPI.query = value;

  unsplashAPI
    .getPhotos()
    .then(({ results, total }) => {
      if (results.length === 0) {
        return alert('Enter normal value');
      }
      const markup = createGalleryCards(results);

      refs.list.insertAdjacentHTML('beforeend', markup);
      unsplashAPI.setTotalPhotos(total);
      const hasMore = unsplashAPI.hasMorePhotos();
      if (hasMore) {
        const item = document.querySelector('.gallery__item:last-child');
        observer.observe(item);
      }
    })
    .catch(err => console.log(err));
}
