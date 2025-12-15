document.addEventListener("DOMContentLoaded", () => {

  const target =
    document.querySelector(".article-content") ||
    document.querySelector("article") ||
    document.querySelector("main");

  if (!target) return;

  setTimeout(() => {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 300);

});