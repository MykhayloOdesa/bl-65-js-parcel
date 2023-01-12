// https://api.unsplash.com/search/photos?client_id=LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc&page=1&query=office

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';
  #page = 1;
  #per_page = 15;
  #totalPhotos = 0;

  getPhotos() {
    return fetch(
      `${this.#BASE_URL}?client_id=${this.#KEY}&page=${this.#page}&query=${
        this.#query
      }&per_page=${this.#per_page}&color=black_and_white&orientation=landscape`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  setTotalPhotos(totalPhotos) {
    this.#totalPhotos = totalPhotos;
  }

  hasMorePhotos() {
    return this.#page < Math.ceil(this.#totalPhotos / this.#per_page);
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
