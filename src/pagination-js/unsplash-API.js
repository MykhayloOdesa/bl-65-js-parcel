export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';
  #per_page = 20;

  getTrendPhotos(page) {
    return fetch(
      `${this.#BASE_URL}?client_id=${
        this.#KEY
      }&page=${page}&query=cat&per_page=${
        this.#per_page
      }&color=black_and_white&orientation=landscape`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
