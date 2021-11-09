//import './sass/main.scss';
import './sass/main.scss';
import SearchImageAPI from './js/apiService.js';
//import BtnLoadMore from './js/btnLoadMore.js';
//import imageSearchFormTemplate from './js/templates/imagesearch.hbs';
import imagesListTemplate from './js/templates/images.hbs';
import imageCardTemplate from './js/templates/gallery.hbs';
//import refs from './js/getRefs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
//npm install material-design-icons
import icons from 'material-design-icons';
// const debounce = require('lodash.debounce');
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';

// refs.searchForm.addEventListener('submit', onSearch);
// btnLoadMore.refs.button.addEventListener('click', onLoadMore);
// // Обработка формы запроса

import * as basicLightbox from 'basiclightbox';
const imageSearchInput = document.querySelector('#search-form');
const imageSearchList = document.querySelector('.gallery');
const imageSearchMoreButton = document.querySelector('#search-more');
const imageSearchAPI = new SearchImageAPI ();
//const imageSearchCard = document.querySelector('.photo-card');
imageSearchInput.addEventListener('submit', imageSearch);
imageSearchMoreButton.addEventListener('click', imageSearchMore);
imageSearchList.addEventListener('click', imageSearchShowFull);

function imageSearch(event) {
  event.preventDefault();
  imageSearchListClear();
  imageSearchAPI.resetPage();
  buttonNoDisplay(imageSearchMoreButton);
  imageSearchGetData(imageSearchInput.firstElementChild.value);
  buttonDisplay(imageSearchMoreButton);
}

function imageSearchGetData(query) {
  imageSearchAPI.query = query;
  imageSearchAPI
    .fetchImages()
    .then(images => {
      if (images.length !== 0) {
        imageSearchListMake(images);
      } else {
        alert({
          text: 'Not found',
          delay: 1000,
        });
      }
    })
    .catch(() => {
      alert({
        text: 'please try again ...',
        delay: 1000,
      });
    });
}

function imageSearchListMake(images) {
  imageSearchList.insertAdjacentHTML(
    'beforeend',
    images.map(imageCardTemplate).map(imagesListTemplate).join(' '),
  );
  if (imageSearchAPI.page > 1) {
    imageSearchList.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
}
function imageSearchMore(event) {
  event.preventDefault();
  imageSearchAPI.incrementPage();
  imageSearchGetData(imageSearchInput.firstElementChild.value);
}

function imageSearchListClear() {
  imageSearchList.innerHTML = '';
}

function imageSearchShowFull(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  basicLightbox.create(event.originalTarget.outerHTML).show();
}

function buttonNoDisplay(element) {
  element.classList.remove('button_display');
  element.classList.add('button_nodisplay');
}

function buttonDisplay(element) {
  element.classList.remove('button_nodisplay');
  element.classList.add('button_display');
}
