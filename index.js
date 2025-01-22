document.querySelectorAll('.carousel').forEach((carousel) => {
    const carouselContainer = carousel.querySelector('.carousel-container');
    const cards = carousel.querySelectorAll('.carousel-card');

    let currentIndex = 0; 
    const totalCards = cards.length;
    const cardsToShow = getCardsToShow();

    function getCardsToShow() {
        if (window.innerWidth <= 480) {
            return 1; 
        } else if (window.innerWidth <= 768) {
            return 2; 
        }
        return 3;
    }
    

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gapWidth = parseInt(getComputedStyle(carouselContainer).gap || 0);
        const totalCardWidth = cardWidth + gapWidth;
        const offset = -currentIndex * totalCardWidth;
        carouselContainer.style.transform = `translateX(${offset}px)`; // Slide
    }

    function moveNext() {
        currentIndex++;
        if (currentIndex > totalCards - cardsToShow) {
            currentIndex = 0; // Loop back to the first card
        }
        updateCarousel();
    }

    function movePrev() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalCards - cardsToShow; // Loop to the last visible set
        }
        updateCarousel();
    }

    // Automatically move to the next card every 2 seconds
    const intervalId = setInterval(() => {
        moveNext();
    }, 2000);

    // Add event listeners for manual navigation
    document.querySelector('.prev').addEventListener('click', () => {
        movePrev();
    });

    document.querySelector('.next').addEventListener('click', () => {
        moveNext();
    });
    
    // Update cardsToShow on resize
    window.addEventListener('resize', () => {
        clearInterval(intervalId); // Clear the interval
        currentIndex = 0; // Reset index to avoid out-of-bounds errors
        updateCarousel(); // Adjust carousel view
    });

    // Initial update
    updateCarousel();
});
