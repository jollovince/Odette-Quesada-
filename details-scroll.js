document.addEventListener("DOMContentLoaded", () => {

  // target: unang section AFTER hero
  const target = document.querySelector("section.py-16");

  if (!target) return;

  setTimeout(() => {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 300);

});