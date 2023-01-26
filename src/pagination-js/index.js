import { UnsplashAPI } from './unsplash-API';
import { pagination } from './Pagination';
import { refs } from './refs';
import { createGalleryCards } from '../js/markup';
import { spinnerPlay, spinnerStop } from '../js/spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const page = pagination.getCurrentPage();
const unsplash = new UnsplashAPI();
spinnerPlay();

unsplash
  .getTrendPhotos(page)
  .then(({ total, results }) => {
    pagination.reset(total);
    const markup = createGalleryCards(results);
    refs.list.innerHTML = markup;
    refs.pagination.classList.remove('is-hidden');
  })
  .catch(() => {
    refs.pagination.classList.add('is-hidden');
  })
  .finally(() => {
    spinnerStop();
  });

const loadMoreTrandingPhotos = event => {
  const currentPage = event.page;
  spinnerPlay();
  unsplash
    .getTrendPhotos(currentPage)
    .then(({ total, results }) => {
      const markup = createGalleryCards(results);
      refs.list.innerHTML = markup;
    })
    .catch(() => {
      refs.pagination.classList.add('is-hidden');
    })
    .finally(() => {
      spinnerStop();
    });
};

const loadMorePhotosBySearch = event => {
  const currentPage = event.page;
  spinnerPlay();
  unsplash
    .getPhotosBySearch(currentPage)
    .then(({ total, results }) => {
      const markup = createGalleryCards(results);
      refs.list.innerHTML = markup;
    })
    .catch(() => {
      refs.pagination.classList.add('is-hidden');
    })
    .finally(() => {
      spinnerStop();
    });
};

function onSearch(event) {
  event.preventDefault();
  refs.pagination.classList.add('is-hidden');
  pagination.off('afterMove', loadMoreTrandingPhotos);
  pagination.off('afterMove', loadMorePhotosBySearch);
  pagination.on('afterMove', loadMorePhotosBySearch);
  const value = event.currentTarget.elements.query.value;

  if (!value) {
    return Notify.failure('Input any data!');
  }
  spinnerPlay();
  refs.list.innerHTML = '';
  unsplash.query = value;
  unsplash
    .getPhotosBySearch(page)
    .then(({ total, results }) => {
      if (results.length === 0) {
        return Notify.failure('Input correct data!');
      }
      pagination.reset(total);
      const markup = createGalleryCards(results);
      refs.list.innerHTML = markup;
      refs.pagination.classList.remove('is-hidden');
    })
    .catch(() => {})
    .finally(() => {
      spinnerStop();
    });
}

pagination.on('afterMove', loadMoreTrandingPhotos);

refs.form.addEventListener('submit', onSearch);
