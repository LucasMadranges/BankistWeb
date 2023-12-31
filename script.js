'use strict';

///////////////////////////////////////
// Element

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const navBar = document.querySelector('.nav');

const header = document.querySelector('.header');

const imgTargets = document.querySelectorAll('img[data-src]');

const slidesImg = document.querySelectorAll('.slide-img');

const btnLeftImg = document.querySelector('.slider__btn--left--img');
const btnRightImg = document.querySelector('.slider__btn--right--img');

const dotsContainerImg = document.querySelector('.dots-img');

///////////////////////////////////////
// Modal window

const openModal = function (event) {
    event.preventDefault(); // Delete the # movement
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnOpenModal.forEach((btn) => {
    btn.addEventListener("click", openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

///////////////////////////////////////
// Smooth scrolling

// For the button
btnScrollTo.addEventListener("click", () => {
    /* 
    const section-coords = section1.getBoundingClientRect();

    window.scrollTo({
        left: section-coords.left + window.scrollX,
        top: section-coords.top + window.scrollY,
        behavior: "smooth",
    }) */

    section1.scrollIntoView({
        behavior: "smooth",
    })
})

// For the navigation

/* If we have 3, 4 or 5 elements, we attach event click on each elements
document.querySelectorAll('.nav__link').forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        const id = btn.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
        })
    })
})
 */

// If we have 100, 1000 or 10000 elements for exemple, we attach event click on the entire container
document.querySelector('.nav__links').addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.classList.contains('nav__link')) {
        const id = event.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
        })
    }
})

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener("click", (event) => {
    const clicked = event.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return

    // Active tab
    tabs.forEach((element) => element.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active');

    // Activate content area
    tabsContent.forEach((element) => element.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

///////////////////////////////////////
// Menu fade animation

function handleHover(event) {
    if (event.target.classList.contains('nav__link')) {
        const link = event.target;
        const sibling = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        sibling.forEach(element => {
            if (element !== link) element.style.opacity = this;
        })
        logo.style.opacity = this;
    }
}

navBar.addEventListener("mouseover", handleHover.bind('0.5'));

navBar.addEventListener("mouseout", handleHover.bind('1'));

///////////////////////////////////////
// Sticky navigation
/* Simple version
const initialCoords = section1.getBoundingClientRect()
window.addEventListener('scroll', () => {
    if (window.scrollY > initialCoords.top) navBar.classList.add('sticky');
    else navBar.classList.remove('sticky');
})
*/

// Version ++
const headerObs = new IntersectionObserver((entries) => {
    const [entry] = entries;
    !entry.isIntersecting ? navBar.classList.add('sticky') : navBar.classList.remove('sticky');
}, {
    root: null,
    threshold: 0,
    rootMargin: `-${navBar.getBoundingClientRect().height}px` // '-90px' because height navbar is 90
});

headerObs.observe(header);

///////////////////////////////////////
// Smooth animation for revealing section

const allSections = document.querySelectorAll('.section');

const sectionObs = new IntersectionObserver((entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}, {
    root: null,
    threshold: 0.15,
})

allSections.forEach((section) => {
    sectionObs.observe(section)
    section.classList.add('section--hidden');
})

///////////////////////////////////////
// Lazy loading images

const imgObs = new IntersectionObserver((entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", () => {
        entry.target.classList.remove('lazy-img');
    })

    observer.unobserve(entry.target);
}, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})

imgTargets.forEach(img => imgObs.observe(img))

///////////////////////////////////////
// Testimonials slider
/*
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currSlide = 0;
const maxSlide = slides.length;

function goToSlide(s) {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - s)}%)`;
    })
}

goToSlide(0);

// Next slide
btnRight.addEventListener("click", () => {
    if (currSlide === maxSlide - 1) {
        currSlide = 0;
    } else {
        currSlide++;
    }

    goToSlide(currSlide);
})

// Left slide
btnLeft.addEventListener("click", () => {
    if (currSlide === 0) {
        currSlide = maxSlide - 1;
    } else {
        currSlide--;
    }

    goToSlide(currSlide);
})
 */

///////////////////////////////////////
// Images slider

let currSlideImg = 0;
const maxSlideImg = slidesImg.length;

function createDots() {
    slidesImg.forEach((_, index) => {
        dotsContainerImg.insertAdjacentHTML('beforeend',
            `<button class="dots__dot-img" data-slide="${index}"></button>`);
    })
}

function activateDotImg(slide) {
    document.querySelectorAll('.dots__dot-img').forEach((dot) => {
        dot.classList.remove('dots__dot-img--active')
    })

    document.querySelector(`.dots__dot-img[data-slide="${slide}"]`).classList.add('dots__dot-img--active')
}

function goToSlideImg(s) {
    slidesImg.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - s)}%)`;
    })
}

initHandlers()

function nextSlideImg() {
    if (currSlideImg >= maxSlideImg - 1) {
        currSlideImg = 0;
    } else {
        currSlideImg++;
    }

    goToSlideImg(currSlideImg);
    activateDotImg(currSlideImg);
}

function prevSlideImg() {
    if (currSlideImg <= 0) {
        currSlideImg = maxSlideImg - 1;
    } else {
        currSlideImg--;
    }

    goToSlideImg(currSlideImg);
    activateDotImg(currSlideImg);
}

// Next slide
btnRightImg.addEventListener("click", nextSlideImg)

// Left slide
btnLeftImg.addEventListener("click", prevSlideImg)

document.addEventListener("keydown", (event) => {
    if (event.key === 'ArrowLeft') prevSlideImg();
    if (event.key === 'ArrowRight') nextSlideImg();
})

dotsContainerImg.addEventListener("click", (event) => {
    if (event.target.classList.contains('dots__dot-img')) {
        currSlideImg = event.target.dataset.slide;
        goToSlideImg(currSlideImg);
        activateDotImg(currSlideImg);
    }
})

function initHandlers() {
    goToSlideImg(0);
    createDots();
    activateDotImg(0);
}

///////////////////////////////////////
// Window event
/*
window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
    event.returnValue = '';
})
 */