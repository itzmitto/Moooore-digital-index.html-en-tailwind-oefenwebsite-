document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".image-slider");

  sliders.forEach((slider) => {
    if (slider.dataset.initialized === "true") return;

    const sliderContainer = slider.querySelector("#slider");
    if (!sliderContainer) return;

    const slideItems = sliderContainer.querySelectorAll("img");
    if (slideItems.length === 0) return;

    // --- arror buttons ---
    const prevBtn = slider.querySelector("#prevBtn");
    const nextBtn = slider.querySelector("#nextBtn");

    if (!prevBtn || !nextBtn) return;

    // --- de dots ---
    const dotsContainer = slider.querySelector("#dots");
    if (!dotsContainer) return;

    const dots = [];

    for (let i = 0; i < slideItems.length; i++) {
      const dot = document.createElement("button");

      dot.className =
        "image-slider__dot w-3 h-3 rounded-full bg-sky-200 transition-colors duration-300";

      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    let currentIndex = 0;
    const total = slideItems.length;

    const updateSlider = () => {
      sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const updateDots = () => {
      dots.forEach((dot, i) => {
        const active = i === currentIndex;

        dot.classList.toggle("bg-sky-500", active);
        dot.classList.toggle("bg-sky-200", !active);

        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    };

    const goToSlide = (index) => {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;

      currentIndex = index;

      updateSlider();
      updateDots();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goToSlide(i));
    });

    // --- keyboard keys left en right ---
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    });

    // --- touch keys ---
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;

      const swipeDistance = touchStartX - touchEndX;

      if (swipeDistance > 50) {
        nextSlide();
      }

      if (swipeDistance < -50) {
        prevSlide();
      }
    });

    slider.dataset.initialized = "true";
    goToSlide(0);
  });
});
