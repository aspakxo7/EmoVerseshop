// JavaScript for the top dynamic display panel
// This is a simplified example. For a full-fledged slider/carousel,
// you would typically use a dedicated library (e.g., Swiper.js, Slick Carousel)
// or write more complex logic.

document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');

    if (!sliderWrapper || slides.length === 0) {
        console.warn("Slider elements not found. Skipping slider functionality.");
        return;
    }

    let currentIndex = 0;
    const slidesPerView = 4; // Number of slides visible at once in the main view
    const slideWidth = slides[0].offsetWidth + 20; // slide width + gap (from CSS)

    function updateSliderPosition() {
        // Calculate the translation needed
        // We want to show a group of slides, not just one at a time.
        // For a more complex slider, this logic would involve cloning slides
        // or using a proper library.
        const offset = -currentIndex * slideWidth; // Simple left shift
        sliderWrapper.style.transform = `translateX(${offset}px)`;

        // Basic loop for continuous effect (very simple, not a true infinite loop)
        if (currentIndex >= slides.length - slidesPerView) {
            // If we are near the end, reset to a "start" position to give a loop illusion
            // In a real slider, you'd clone elements or use a more robust approach.
            // For now, we'll just stop or reset.
            nextButton.disabled = true; // Simple stop at end for this example
        } else {
             nextButton.disabled = false;
        }

        if (currentIndex === 0) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    nextButton.addEventListener('click', () => {
        // Adjust for how many slides are visible vs total slides
        if (currentIndex < slides.length - slidesPerView) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Initial update
    updateSliderPosition();

    // Optional: Auto-slide functionality (uncomment to enable)
    // setInterval(() => {
    //     if (currentIndex < slides.length - slidesPerView) {
    //         currentIndex++;
    //     } else {
    //         currentIndex = 0; // Loop back to start
    //     }
    //     updateSliderPosition();
    // }, 3000); // Change slide every 3 seconds

    // Add basic functionality for nav arrows in product sections (if any)
    const productNavArrows = document.querySelectorAll('.product-section .nav-arrow');
    productNavArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            alert('This arrow would navigate to more products in this category!');
            // In a real scenario, this would load more products or go to a category page.
        });
    });
});
