'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // const s1cords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   letf: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// tabs.forEach(el =>
//   el.addEventListener('click', function (e) {
//     console.log(e.target);
//   })
// );

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabContent.forEach(el => el.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  //display content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Navigations

const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav__link');

const hoverHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(e => {
      if (e !== link) e.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', hoverHandler.bind(0.5));

nav.addEventListener('mouseout', hoverHandler.bind(1));

// Sticky Nav

const stickyNav = function (enterise) {
  const [entery] = enterise;
  if (!entery.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const header = document.querySelector('.header');
const headerObserve = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObserve.observe(header);

// section revealing
const sectionReveal = function (enterise, obersver) {
  const [entery] = enterise;
  if (!entery.isIntersecting) return;
  entery.target.classList.remove('section--hidden');

  obersver.unobserve(entery.target);
};

const sectionOberve = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll('.section');
allSections.forEach(section => {
  sectionOberve.observe(section);
  // section.classList.add('section--hidden');
});

// lazy load
const LazyLoad = function (enterise, obersver) {
  const [entery] = enterise;
  if (!entery.isIntersecting) return;
  entery.target.src = entery.target.dataset.src;
  entery.target.addEventListener('load', function () {
    entery.target.classList.remove('lazy-img');
  });
  obersver.unobserve(entery.target);
};
const imgObserve = new IntersectionObserver(LazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

const allImg = document.querySelectorAll('img[data-src]');

allImg.forEach(img => imgObserve.observe(img));

// slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const DotContainer = document.querySelector('.dots');

  const createDot = function () {
    slides.forEach((_, i) => {
      DotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}' ></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(el => el.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  let currSlide = 0;
  const maxSlid = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (currSlide === maxSlid - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activeDot(currSlide);
  };

  const preSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlid - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activeDot(currSlide);
  };

  const init = function () {
    createDot();
    activeDot(0);
    goToSlide(0);
  };
  init();
  //handlers

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', preSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') preSlide();
  });

  DotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();
