// https://api.unsplash.com/search/photos?page=1&query=office

import { refs } from './refs';
import { UnsplashAPI } from './unsplashAPI';

console.log(UnsplashAPI);

refs.form.addEventListener('submit', onSearch);

const unsplashAPI = new UnsplashAPI();

function onSearch(event) {
  event.preventDefault();

  const value = event.currentTarget.elements.query.value;

  if (!value) {
    return alert('Input any data!');
  }

  unsplashAPI.query = value;

  unsplashAPI.getPhotos();
}
