//import './sass/main.scss';
import fetchCountry from './js/fetchCountries';
import refs from './js/getRefs';
import countryCard from './js/templates/countryAll.hbs';
import countriesList from './js/templates/country-list.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
// const debounce = require('lodash.debounce');
