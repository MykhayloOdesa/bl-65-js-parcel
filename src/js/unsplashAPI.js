// https://api.unsplash.com/search/photos?client_id=LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc&page=1&query=office

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';
  #page = 1;

  getPhotos() {
    return fetch(
      `${this.#BASE_URL}?client_id=${this.#KEY}&page=${this.#page}&query=${
        this.#query
      }`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(response);
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
