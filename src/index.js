//import './sass/main.scss';
import './sass/main.scss';
import servise from './js/apiService.js';
//import BtnLoadMore from './js/btnLoadMore.js';
import imagesListTemplate from './js/templates/images.hbs';
import imageCardTemplate from './js/templates/gallery.hbs';
//import refs from './js/getRefs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
// const debounce = require('lodash.debounce');

//import { error } from '@pnotify/core';

// refs.searchForm.addEventListener('submit', onSearch);
// btnLoadMore.refs.button.addEventListener('click', onLoadMore);
// // Обработка формы запроса

//import SearchImageAPI from './apiService';
//import * as basicLightbox from 'basiclightbox';
const imageSearchInput = document.querySelector('#search-form');
const imageSearchList = document.querySelector('.gallery');
//const imageSearchCard = document.querySelector('.photo-card');
const imageSearchMoreButton = document.querySelector('#search-more');
const imageSearchAPI = new servise();

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

function imageSearcMore(event) {
  event.preventDefault();
  imageSearchAPI.incrementPage();
  imageSearchGetData(imageSearchInput.firstElementChild.value);
}

function imageSearchGetData(query) {
  imageSearchAPI.query = query;
  imageSearchAPI
    .fetchImages()
    .then(images => {
      if (images.length !== 0) {
        imageSearchListMake(images);
      } else {
        return {
          text: 'Not found',
        };
      }
    })
    .catch(() => {
      return {
        text: 'please try again ...',
      };
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

function imageSearchListClear() {
  imageSearchList.innerHTML = '';
}

// function imageSearchShowFull(event) {
//   event.preventDefault();
//   if (event.target.nodeName !== 'IMG') return;
//   basicLightbox.create(event.originalTarget.outerHTML).show();
// }

// function buttonNoDisplay(element) {
//   element.classList.remove('button_display');
//   element.classList.add('button_nodisplay');
// }

// function buttonDisplay(element) {
//   element.classList.remove('button_nodisplay');
//   element.classList.add('button_display');
// }
