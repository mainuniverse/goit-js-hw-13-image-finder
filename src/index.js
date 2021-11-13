//import './sass/main.scss';
import './sass/main.scss';
import NewsApiService from './js/apiService.js';
import LoadMoreBtn from './js/btnLoadMore.js';
//import imageSearchFormTemplate from './js/templates/imagesearch.hbs';
import imagesTpl from './js/templates/images.hbs';
//import imageCardTemplate from './js/templates/gallery.hbs';
import refs from './js/getRefs';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
//npm install material-design-icons
import icons from 'material-design-icons';
import * as basicLightbox from 'basiclightbox';

const newsApiService = new NewsApiService();
refs.searchForm.addEventListener('submit', searchImages);
//refs.btnNextPage.style.display = 'none';
//loadMoreBtn.refs.button.addEventListener('click', loadMoreOption);

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

function searchImages(event) {
  event.preventDefault();
  clearGallery();
  newsApiService.resetPage();
  newsApiService.query = event.currentTarget.elements.query.value;
  if (newsApiService.query === '') {
    defaultModules.set(PNotifyMobile, {});
    refs.btnNextPage.style.display = 'none';
    return alert({
      text: 'not found',
      delay: 1000,
    });
  }
  if (!RegExp(/^\p{L}/, 'u').test(newsApiService.query)) {
    return alert({ text: ' undefined ', delay: 1000 });
  }

  //refs.btnNextPage.style.display = 'block';
  addButtonUp();

  newsApiService
    .fetchImages()
    .then(imagesResult)
    .catch(error => {
      console.log(error);
      defaultModules.set(PNotifyMobile, {});
      return alert({
        text: 'not found',
        delay: 1000,
      });
    });
}

function imagesResult(images) {
  if (images.length < 12) {
    loadMoreBtn.hide();
  } else {
     loadMoreBtn.show();
  }
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item"> ${imagesTpl(images)}</li>`,
  );
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}

loadMoreBtn.refs.button.addEventListener('click', loadMore);

function loadMore() {
  newsApiService.fetchImages().then(images => {
    imagesResult(images);
  });
  window.scrollIntoView({
    
    behavior: 'smooth',
    block: 'end',
  });
}

refs.gallery.addEventListener('click', zoomCard);

function zoomCard(e) {
  if (e.target.hasAttribute('data-action')) {
    const basicLightbox = require('basiclightbox');
    const instance = basicLightbox.create(`
  <img src=${e.target.name} width="1000" height="800">
`);
    instance.show();
  }
}

function addButtonUp() {
  refs.buttonUp.classList.remove('hidden');
  refs.buttonUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

