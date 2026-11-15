let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');

// 1. Automatically generate the dots based on how many slides you have
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => currentSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// 2. Core function to display the correct slide and update dots
function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0; // Loop back to the first slide
    } else if (index < 0) {
        slideIndex = slides.length - 1; // Loop to the last slide
    } else {
        slideIndex = index;
    }

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to the current slide and dot
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// Function called by dots
function currentSlide(index) {
    showSlide(index);
}

// 3. Touch Swipe Support for mobile and touchscreens
const slideshowContainer = document.querySelector('.slideshow-container');
let touchStartX = 0;
let touchEndX = 0;

slideshowContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slideshowContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Minimum pixel distance to count as a swipe
    if (touchEndX < touchStartX - threshold) {
        // Swiped Left -> Go to next slide
        showSlide(slideIndex + 1);
    }
    else if (touchEndX > touchStartX + threshold) {
        // Swiped Right -> Go to previous slide
        showSlide(slideIndex - 1);
    }
}