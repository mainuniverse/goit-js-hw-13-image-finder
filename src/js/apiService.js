const API_KEY = '24183865-520b97805ca8322c4646aea82';
const BASE_URL = 'https://pixabay.com/api/';

//const API_KEY = '563492ad6f91700001000001d1419f589de84e29a5d70ab4e71b662a';
//const BASE_URL = 'https://api.pexels.com/v1/';
export default class SearchImageAPI {
  constructor() {
    this.url = BASE_URL;
    this.key = API_KEY;
    this.searchQuery = '';
    this.page = 1;
    // this.perPage = 12;
    // this.imgType = 'photo';
    // this.orientation = 'horizontal'
  }

  fetchImages() {
    const url = `${this.url}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.key}`;
    return fetch(url)
      .then(response => response.json())
      .then(images => {
        this.incrementPage();
        return images.hits;
      })
      .catch();
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

//   async fetchImages() {
//  const response = await fetch(
//    `${this.url}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.key}`,
//    //`${DATA_URL}?image_type=${this.imgType}&orientation=${this.orientation}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;
//   );

//   return response.json()
// };
