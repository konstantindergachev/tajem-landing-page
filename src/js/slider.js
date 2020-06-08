'use strict';

export const createSlider = () => {
  const slideShow = document.querySelector('.slider__one-list');
  const slides = [ ...slideShow.querySelectorAll('.slider__one-item') ];
  let slideIdx = 0;

  const nextSlide = () => {
    slides[slideIdx].classList.remove('active');
    slideIdx = (slideIdx + 1) % slides.length;
    slides[slideIdx].classList.add('active');
  };
  const controlRight = document.querySelector('.controls__right');
  controlRight.addEventListener('click', nextSlide);

  const prevSlide = () => {
    slides[slideIdx].classList.remove('active');
    slideIdx = (slideIdx - 1 + slides.length) % slides.length;
    slides[slideIdx].classList.add('active');
  };
  const controlLeft = document.querySelector('.controls__left');
  controlLeft.addEventListener('click', prevSlide);
};
