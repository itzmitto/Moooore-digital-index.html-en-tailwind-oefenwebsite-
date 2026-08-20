const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

let currentIndex = 0;

const slides = slider.querySelectorAll("img");
const totalSlides = slides.length;

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("button");
  dot.className =
    "w-3 h-3 rounded-full bg-sky-200 transition-colors duration-300";
  dot.addEventListener("click", () => {
    currentIndex = i;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll("button");

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, i) => {
    if (i === currentIndex) {
      dot.classList.remove("bg-sky-200");
      dot.classList.add("bg-sky-500");
    } else {
      dot.classList.remove("bg-sky-500");
      dot.classList.add("bg-sky-200");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  updateSlider();
});

updateSlider();
