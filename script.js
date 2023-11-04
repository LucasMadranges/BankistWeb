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

btnScrollTo.addEventListener("click", (btn) => {
    const s1coords = section1.getBoundingClientRect();

    // Smooth scrolling
    /* window.scrollTo({
        left: s1coords.left + window.scrollX,
        top: s1coords.top + window.scrollY,
        behavior: "smooth",
    }) */

    section1.scrollIntoView({
        behavior: "smooth",
    })
})