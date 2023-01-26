import { UnsplashAPI } from './unsplash-API';
import { pagination } from './Pagination';
import { refs } from './refs';
import { createGalleryCards } from '../js/markup';

// console.log(refs);

const page = pagination.getCurrentPage();
const unsplash = new UnsplashAPI();

unsplash.getTrendPhotos(page).then(({ total, results }) => {
  pagination.reset(total);
  const markup = createGalleryCards(results);
  refs.list.innerHTML = markup;
});
const loadMoreTrandingPhotos = event => {
  const currentPage = event.page;
  unsplash.getTrendPhotos(currentPage).then(({ total, results }) => {
    const markup = createGalleryCards(results);
    refs.list.innerHTML = markup;
  });
};

const loadMorePhotosBySearch = event => {
  const currentPage = event.page;
  unsplash.getPhotosBySearch(currentPage).then(({ total, results }) => {
    const markup = createGalleryCards(results);
    refs.list.innerHTML = markup;
  });
};

pagination.on('afterMove', loadMoreTrandingPhotos );

refs.form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  pagination.off('afterMove', loadMoreTrandingPhotos);
  pagination.off('afterMove', loadMorePhotosBySearch);
  pagination.on('afterMove', loadMorePhotosBySearch);
  const value = event.currentTarget.elements.query.value;

  if (!value) {
    return alert('Input any data!');
  }
  refs.list.innerHTML = '';
  unsplash.query = value;
  unsplash.getPhotosBySearch(page).then(({ total, results }) => {
  pagination.reset(total);
  const markup = createGalleryCards(results);
  refs.list.innerHTML = markup;
});
}