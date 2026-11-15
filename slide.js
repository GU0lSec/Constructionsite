document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dotsContainer'); //[span_4](start_span)[span_4](end_span)

    // 1. Automatically generate the navigation dots based on your slide count
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => currentSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    // 2. Core function to display slides and update active states
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

    function currentSlide(index) {
        showSlide(index);
    }

    // 3. Pointer Events for smooth swiping on mobile & touchscreen laptops (.slideshow-container)[span_5](start_span)[span_5](end_span)
    const slideshowContainer = document.querySelector('.slideshow-container'); //[span_6](start_span)[span_6](end_span)
    let pointerStartX = 0;
    let pointerEndX = 0;

    slideshowContainer.addEventListener('pointerdown', (e) => {
        pointerStartX = e.clientX;
    });

    slideshowContainer.addEventListener('pointerup', (e) => {
        pointerEndX = e.clientX;
        handlePointerSwipe();
    });

    function handlePointerSwipe() {
        const threshold = 50; // Minimum pixel distance required to register a swipe

        if (pointerEndX < pointerStartX - threshold) {
            // Swiped Left -> Go to next slide
            showSlide(slideIndex + 1);
        } 
        else if (pointerEndX > pointerStartX + threshold) {
            // Swiped Right -> Go to previous slide
            showSlide(slideIndex - 1);
        }
    }
});
