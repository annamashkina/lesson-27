document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    let slides = document.querySelectorAll('.slide');
    let indicators = document.querySelectorAll('.indicator');
    let slideInterval = setInterval(nextSlide, 2000);
    let isPaused = false;

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function togglePause() {
        if (isPaused) {
            slideInterval = setInterval(nextSlide, 2000);
            document.querySelector('.pause').textContent = 'Pause';
        } else {
            clearInterval(slideInterval);
            document.querySelector('.pause').textContent = 'Play';
        }
        isPaused = !isPaused;
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    }

    let touchStartX = 0;
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        if (touchStartX - e.touches[0].clientX > 50) nextSlide();
        if (touchStartX - e.touches[0].clientX < -50) prevSlide();
    }

    let mouseStartX = 0;
    function handleMouseDown(e) {
        mouseStartX = e.clientX;
    }

    function handleMouseUp(e) {
        if (mouseStartX - e.clientX > 50) nextSlide();
        if (mouseStartX - e.clientX < -50) prevSlide();
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.pause').addEventListener('click', togglePause);
    document.addEventListener('keydown', handleKeyDown);
    document.querySelector('.slides').addEventListener('touchstart', handleTouchStart, false);
    document.querySelector('.slides').addEventListener('touchmove', handleTouchMove, false);
    document.querySelector('.slides').addEventListener('mousedown', handleMouseDown, false);
    document.querySelector('.slides').addEventListener('mouseup', handleMouseUp, false);

    goToSlide(currentSlide);
});
