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
// const debounce = require('lodash.debounce');

// const refs = {
//   searchForm: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
// };

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();
refs.searchForm.addEventListener('submit', searchImages);
loadMoreBtn.refs.button.addEventListener('click', loadMoreOption);

function searchImages(event) {
  event.preventDefault();
  clearGallery();
  newsApiService.resetPage();
  newsApiService.query = event.currentTarget.elements.query.value;

  // if (!RegExp(/^\p{L}/, 'u').test(newsApiService.query)) {
  //   return alert({
  //     text: 'Error',
  //     delay: 1000,
  //   });
  // } if (newsApiService.query === '') {
  //   defaultModules.set(PNotifyMobile, {});
  //   return alert({
  //     text: 'not found',
  //      delay: 1000,
  //   });
  // }
  if (newsApiService.query === '') {
    defaultModules.set(PNotifyMobile, {});
    return alert({
      text: 'not found',
       delay: 1000,
    });
  }


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
function loadMoreOption() {
  newsApiService.fetchImages().then(imagesResult);
  setTimeout(() => {
    refs.gallery.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 1000);
}
function imagesResult(images) {
  if (images.length >= 12) {
    loadMoreBtn.show();
  } else {
    loadMoreBtn.hide();
  }
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item"> ${imagesTpl(images)}</li>`,
  );
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}

// imageSearchList.addEventListener('click', imageSearchShowFull);

// function imageSearchShowFull(e) {
//   e.preventDefault();
//   if (e.target.nodeName !== 'IMG') return;
//   basicLightbox.create(e.originalTarget.outerHTML).show();
// }
  // else {alert({text: 'Not found',delay: 1000, }); }   })
  //   .catch(() => {
  //     alert({
  //       text: 'please try again ...',
  //       delay: 1000,
  //     });
  //   });
