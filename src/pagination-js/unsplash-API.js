import axios from 'axios';
axios.defaults.baseURL = 'https://api.unsplash.com/search';
axios.defaults.headers.common['Authorization'] =
  'Client-ID 4dc0c9edd3f8399861773bf78562a506e26384e3c5d582c06359e3e1c4b70c33';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';
  #per_page = 20;

  async getTrendPhotos(page) {
    const { data } = await axios.get('/photos', {
      params: {
        page,
        query: 'girls',
        per_page: this.#per_page,
        color: 'yellow',
        orientation: 'landscape',
      },
    });

    return data;
  }

  async getPhotosBySearch(page) {
    const { data } = await axios.get(
      `/photos?page=${page}&query=${this.#query}&per_page=${
        this.#per_page
      }&color=black_and_white&orientation=landscape`
    );
    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
