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

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
const newsApiService = new NewsApiService();
refs.searchForm.addEventListener('submit', searchImages);
refs.btnNextPage.style.display = 'none';
//loadMoreBtn.refs.button.addEventListener('click', loadMoreOption);

function searchImages(event) {
  event.preventDefault();
  clearGallery();
  newsApiService.resetPage();
  refs.btnNextPage.style.display = 'block';
  newsApiService.query = event.currentTarget.elements.query.value;
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
function imagesResult(images) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item"> ${imagesTpl(images)}</li>`,
  );
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
function updateImgsMarkup(images) {
  const markup = imagesTpl(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
refs.btnNextPage.addEventListener('click', async () => {
  const hits = await newsApiService.fetchImages('hits');
  updateImgsMarkup(hits);
  window.scrollTo({
    top: window.pageYOffset + documentHeight,
    behavior: 'smooth'
  });
});
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

// refs.loadMoreBtn.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// } )

// scrollPage();

// function scrollPage(){
//   window.scrollTo({
//     top: window.pageYOffset + documentHeight,
//     width: 0,
//     behavior: "smooth",
//   });
// }

// function loadMoreOption(event) {
//   // newsApiService.fetchImages().then(imagesResult);
//   //   if (images.length >= 12) {
//   //   loadMoreBtn.show();
//   // } else {
//   //   loadMoreBtn.hide();
//   // // }
//   // function loadMoreOption(event) {
//   //event.preventDefault();
//   newsApiService.incrementPage();
//   searchImages(refs.searchForm.firstElementChild.value);
//   setTimeout(() => {
//     refs.gallery.lastChild.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   }, 1000);
// }

// imageSearchList.addEventListener('click', imageSearchShowFull);

// function imageSearchShowFull(e) {
//   e.preventDefault();
//   if (e.target.nodeName !== 'IMG') return;
//   basicLightbox.create(e.originalTarget.outerHTML).show();
// }
// if (!RegExp(/^\p{L}/, 'u').test(newsApiService.query)) {
//   return alert({
//     text: 'Error',
//     delay: 1000,
//   }
//   function buttonNoDisplay(element) {
//   element.classList.remove('button_display');
//   element.classList.add('button_nodisplay');
// }

// function buttonDisplay(element) {
//   element.classList.remove('button_nodisplay');
//   element.classList.add('button_display');}
// refs.btnNextPage.style.display = 'none';
