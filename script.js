const carouselInner = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let scrollPosition = 0;
const scrollAmount = 210; // Adjust based on image width + gap

prevBtn.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= scrollAmount;
        carouselInner.style.transform = `translateX(-${scrollPosition}px)`;
    }
});

nextBtn.addEventListener('click', () => {
    if (scrollPosition < (carouselInner.scrollWidth - carouselInner.clientWidth)) {
        scrollPosition += scrollAmount;
        carouselInner.style.transform = `translateX(-${scrollPosition}px)`;
    }
});
