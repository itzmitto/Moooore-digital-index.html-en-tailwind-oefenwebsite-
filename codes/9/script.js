document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".faq-accordion");

  accordions.forEach((accordion) => {
    if (accordion.dataset.initialized === "true") return;

    const questions = accordion.querySelectorAll(".faq-question");

    if (questions.length === 0) return;

    const closeAnswers = () => {
      questions.forEach((question) => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector("i");

        if (!answer) return;

        answer.classList.add("hidden");

        if (icon) {
          icon.classList.remove("rotate-180");
        }
      });
    };

    const toggleAnswer = (question) => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector("i");

      if (!answer) return;

      const isOpen = !answer.classList.contains("hidden");

      closeAnswers();

      if (!isOpen) {
        answer.classList.remove("hidden");

        if (icon) {
          icon.classList.add("rotate-180");
        }
      }
    };

    questions.forEach((question) => {
      question.addEventListener("click", () => {
        toggleAnswer(question);
      });
    });

    accordion.dataset.initialized = "true";
  });
});
