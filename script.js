document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Script loaded");

  // ===== LOAD HEADER & FOOTER =====
  Promise.all([
    fetch("header.html")
      .then(res => res.text())
      .then(data => {
        const header = document.getElementById("header");
        if (header) {
          header.innerHTML = data;
          initializeNavigation();
          console.log("✅ header.html loaded");
        }
      }),

    fetch("footer.html")
      .then(res => res.text())
      .then(data => {
        const footer =
          document.getElementById("footer") ||
          document.getElementById("footer-standalone");
        if (footer) {
          footer.innerHTML = data;
          console.log("✅ footer.html loaded");
        }
      })
  ])
    .then(() => {
      initializeSmoothScroll();
      initializeDropdown(); // ✅ important
      console.log("✅ All initialized");
    })
    .catch(err => console.error("❌ Load error:", err));

  // ===== NAVIGATION =====
  function initializeNavigation() {
    const toggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (toggle && navMenu) {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }
  }

  // ===== SMOOTH SCROLL =====
  function initializeSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        document.getElementById("nav-menu")?.classList.remove("active");
        document.getElementById("menu-toggle")?.classList.remove("active");
      }
    });
  }

  // ===== LISTEN NOW DROPDOWN =====
  function initializeDropdown() {
    const dropdowns = document.querySelectorAll(".dropdown");
    if (!dropdowns.length) {
      console.warn("⚠️ No dropdowns found yet, retrying...");
      setTimeout(initializeDropdown, 500); // retry if section loads late
      return;
    }

    dropdowns.forEach(drop => {
      const button = drop.querySelector(".listen-btn");
      const menu = drop.querySelector(".dropdown-content");

      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const isActive = drop.classList.contains("active");
        document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
        if (!isActive) drop.classList.add("active");
      });

      // Close dropdown when clicking a link
      menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          drop.classList.remove("active");
        });
      });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
    });

    console.log("✅ Dropdown initialized");
  }
});

// ===== VIDEO MODAL FUNCTION =====
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".watch-btn");
  if (btn) {
    e.preventDefault();
    const videoSrc = btn.dataset.video;
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("musicVideo");

    if (modal && videoSrc) {
      video.src = videoSrc;
      modal.classList.add("active");
      video.play();
    }
  }

  // Close modal
  if (e.target.classList.contains("close-modal") || e.target.id === "videoModal") {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("musicVideo");
    if (modal && video) {
      modal.classList.remove("active");
      video.pause();
      video.src = "";
    }
  }
});