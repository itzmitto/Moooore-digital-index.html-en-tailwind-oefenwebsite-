const slider = document.getElementById("slider");
const slides = document.querySelectorAll("#slider > div");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dotsContainer = document.getElementById("dots");
let currentSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "w-3 h-3 rounded-full bg-blue-200 transition";
  dot.addEventListener("click", () => {
    currentSlide = index;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => {
    dot.className =
      index === currentSlide
        ? "w-3 h-3 rounded-full bg-blue-500 transition"
        : "w-3 h-3 rounded-full bg-blue-200 transition";
  });
}

next.addEventListener("click", () => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  updateSlider();
});

prev.addEventListener("click", () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  updateSlider();
});

updateSlider();
