import { UnsplashAPI } from './unsplash-API';
import { pagination } from './Pagination';
import { refs } from './refs';
import { createGalleryCards } from '../js/markup';

console.log(refs);

const page = pagination.getCurrentPage();
const unsplash = new UnsplashAPI();

unsplash.getTrendPhotos(page).then(({ total, results }) => {
  pagination.reset(total);
  const markup = createGalleryCards(results);
  refs.list.innerHTML = markup;
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
});
