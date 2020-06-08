import '../scss/main.scss';
import './sandwich';
import scrollOnTop from './scroll-on-top';
import initSmoothScrolling from './scroller';
import { createSlider } from './slider';

window.addEventListener('DOMContentLoaded', () => {
  initSmoothScrolling();
  createSlider();
});

window.addEventListener('scroll', scrollOnTop);
