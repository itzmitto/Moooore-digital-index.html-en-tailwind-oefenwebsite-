const root = document.documentElement;
const colorModal = document.getElementById("colorModal");
const colorInput = document.getElementById("colorInput");
const colorInputPreview = document.getElementById("colorInputPreview");
const colorHex = document.getElementById("colorHex");
const primaryValue = document.getElementById("primaryValue");
const colorPickerButton = document.getElementById("colorPickerButton");
const heroColorButton = document.getElementById("heroColorButton");
const ctaColorButton = document.getElementById("ctaColorButton");
const modalClose = document.getElementById("modalClose");
const colorModalBackdrop = document.getElementById("colorModalBackdrop");
const resetColor = document.getElementById("resetColor");
const applyColor = document.getElementById("applyColor");
const defaultColor = "#4040F5";
let selectedColor = defaultColor;
function openColorModal() {
  selectedColor =
    getComputedStyle(root).getPropertyValue("--primary").trim() || defaultColor;
  colorInput.value = selectedColor;
  updateColorPreview(selectedColor);
  colorModal.classList.add("is-open");
  colorModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeColorModal() {
  colorModal.classList.remove("is-open");
  colorModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function applyPrimaryColor(color) {
  root.style.setProperty("--primary", color);
  selectedColor = color;
  updateColorPreview(color);
}
function updateColorPreview(color) {
  colorInputPreview.style.background = color;
  colorHex.textContent = color.toUpperCase();
  primaryValue.textContent = color.toUpperCase();
}
function openFromButton() {
  openColorModal();
}
[colorPickerButton, heroColorButton, ctaColorButton].forEach((button) => {
  button.addEventListener("click", openFromButton);
});
colorInput.addEventListener("input", (event) => {
  selectedColor = event.target.value;
  applyPrimaryColor(selectedColor);
});
document.querySelectorAll(".preset-color").forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.dataset.color;
    colorInput.value = color;
    applyPrimaryColor(color);
  });
});
resetColor.addEventListener("click", () => {
  colorInput.value = defaultColor;
  applyPrimaryColor(defaultColor);
});
applyColor.addEventListener("click", closeColorModal);
modalClose.addEventListener("click", closeColorModal);
colorModalBackdrop.addEventListener("click", closeColorModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && colorModal.classList.contains("is-open")) {
    closeColorModal();
  }
});
updateColorPreview(defaultColor);
