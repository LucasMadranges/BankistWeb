'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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