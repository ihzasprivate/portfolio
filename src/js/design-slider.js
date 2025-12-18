function createSlider({ containerSelector, indicatorId, interval = 3000 }) {
    let currentSlide = 0;
    let dots = [];
    let totalSlides = 0;
    let autoPlay;

    const slider = document.querySelector(containerSelector);
    const wrap = document.getElementById(indicatorId);

    if (!slider || !wrap) return;

    // Update posisi slider
    function update() {
        if (slider.children.length === 0) return;
        const slideWidth = slider.children[0].getBoundingClientRect().width;
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        setActiveDot(currentSlide);
    }

    // Geser slide
    function slide(direction) {
        totalSlides = slider.children.length;
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        update();
    }

    // Render indikator
    function renderIndicators() {
        totalSlides = slider.children.length;
        wrap.innerHTML = '';
        dots = [];

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.className = 'block w-2.5 h-2.5 rounded-full bg-white/50 transition-all';
            dot.addEventListener('click', () => {
                currentSlide = i;
                update();
            });
            wrap.appendChild(dot);
            dots.push(dot);
        }
        setActiveDot(currentSlide);
    }

    // Update dot aktif
    function setActiveDot(index) {
        dots.forEach((dot, i) => {
            dot.setAttribute('aria-current', i === index ? 'true' : 'false');
            if (i === index) {
                dot.classList.add('w-3', 'h-3', 'bg-white', 'ring-2', 'ring-white/40');
                dot.classList.remove('w-2.5', 'h-2.5', 'bg-white/50');
            } else {
                dot.classList.remove('w-3', 'h-3', 'bg-white', 'ring-2', 'ring-white/40');
                dot.classList.add('w-2.5', 'h-2.5', 'bg-white/50');
            }
        });
    }

    // --- Autoplay ---
    function startAutoPlay() {
        autoPlay = setInterval(() => {
            slide(1);
        }, interval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlay);
    }

    // --- Pause on hover ---
    slider.parentElement.addEventListener('mouseenter', stopAutoPlay);
    slider.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Init
    renderIndicators();
    update();
    startAutoPlay();

    return { slide, update, startAutoPlay, stopAutoPlay };

}

document.addEventListener('DOMContentLoaded', () => {
    const waitUntilReady = setInterval(() => {
        const slider = document.querySelector('.slider1');
        const wrap = document.getElementById('design1-indicators');

        if (slider && wrap && slider.children.length > 0) {
            clearInterval(waitUntilReady);
            window.slider1 = createSlider({
                containerSelector: '.slider1',
                indicatorId: 'design1-indicators',
                interval: 4000
            });
        }
    }, 100);

    const waitUntilReady2 = setInterval(() => {
        const slider = document.querySelector('.slider2');
        const wrap = document.getElementById('design2-indicators');

        if (slider && wrap && slider.children.length > 0) {
            clearInterval(waitUntilReady2);
            window.slider2 = createSlider({
                containerSelector: '.slider2',
                indicatorId: 'design2-indicators',
                interval: 3000
            });
        }
    }, 100);

    const waitUntilReady3 = setInterval(() => {
        const slider = document.querySelector('.slider3');
        const wrap = document.getElementById('design3-indicators');

        if (slider && wrap && slider.children.length > 0) {
            clearInterval(waitUntilReady3);
            window.slider3 = createSlider({
                containerSelector: '.slider3',
                indicatorId: 'design3-indicators',
                interval: 3000
            });
        }
    }, 100);
    
});