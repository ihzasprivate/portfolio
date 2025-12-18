let currentSlide = 0;
let autoplayInterval;

// --- Modal Control ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  updateSlider(modal);
  startAutoplay(modal); // aktifkan kalau mau autoplay di dalam modal

  // --- Pause on hover ---
  const slider = modal.querySelector('.slider');
  if (slider) {
    slider.parentElement.addEventListener('mouseenter', stopAutoplay);
    slider.parentElement.addEventListener('mouseleave', () => {
      startAutoplay(modal);
    });
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  stopAutoplay();
  resetVideo(modal);
}

// --- Slider Control ---
function slideModal(modalId, direction) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const slider = modal.querySelector('.slider');
  if (!slider) return;

  const totalSlides = slider.children.length;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateSlider(modal);
}


function updateSlider(modal) {
  const slider = modal.querySelector('.slider');
  if (!slider || slider.children.length === 0) return;
  const slideWidth = slider.children[0].offsetWidth;
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// --- Autoplay Control ---
function startAutoplay(modal) {
  autoplayInterval = setInterval(() => {
    slideModal(modal.id, 1);
  }, 2000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// --- Reset Video ---
function resetVideo(modal) {
  const video = modal.querySelector("video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

// --- Backdrop Close ---
document.addEventListener("click", (e) => {
  const modal = e.target.closest("[id^='andmodal']");
  // jika yang diklik adalah backdrop (bukan konten di dalamnya)
  if (modal && e.target === modal) {
    closeModal(modal.id);
  }
});
