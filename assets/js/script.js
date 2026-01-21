/* ==========================================================================
  FILE: script.js
  PROJECT: Samson Eniolorunda Portfolio Website — Frontend Logic
  AUTHOR: Samson Eniolorunda
  LAST UPDATED: January 2026

  PURPOSE:
  - Central JavaScript file used across ALL pages.
  - Adds interactive behavior while keeping HTML/CSS clean and reusable.

  FEATURES (INIT ORDER ON DOMContentLoaded):
  1) Theme Toggle (session persistence + system sync)
  2) Mobile Menu
  3) Typewriter Effect (Home page only)
  4) Portfolio Filter (Portfolio page only)
  5) Contact Form + Modal Feedback (Contact page only)
  6) Directional Scroll Buttons
  7) Auto Year

  NOTE:
  - Each init function safely exits if its required DOM elements are not present.
============================================================================= */

/* ========== TYPEWRITER DATA (HOME ONLY) ========== */
const typedStrings = [
  "Front-End Developer",
  "Problem Solver",
  "Web Enthusiast",
];

let typedIndex = 0; // Which phrase in typedStrings is active
let charIndex = 0; // Current character position inside the active phrase

/* ========== GLOBAL INIT ========== */
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMenu();
  typeEffect();
  initPortfolio();
  initContact();
  initDirectionalScroll();
  initYear();
});

/* ========== 1) DIRECTIONAL SCROLL UX ========== */
function initDirectionalScroll() {
  const btnUp = document.getElementById("btnPageUp");
  const btnDown = document.getElementById("btnPageDown");

  // If the page doesn't have scroll buttons, exit safely
  if (!btnUp && !btnDown) return;

  let lastScrollY = window.scrollY;

  // Optional: show colored scrollbar only when scrolling (matches CSS body.is-scrolling)
  let scrollTimeout = null;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Add "is-scrolling" class while user is actively scrolling
    document.body.classList.add("is-scrolling");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(
      () => document.body.classList.remove("is-scrolling"),
      500,
    );

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      if (btnUp) btnUp.classList.remove("show");

      if (btnDown && currentScrollY < maxScroll - 50) {
        btnDown.classList.add("show");
      } else if (btnDown) {
        btnDown.classList.remove("show");
      }
    } else {
      // Scrolling up
      if (btnDown) btnDown.classList.remove("show");

      if (btnUp && currentScrollY > 50) {
        btnUp.classList.add("show");
      } else if (btnUp) {
        btnUp.classList.remove("show");
      }
    }

    lastScrollY = currentScrollY;
  });

  if (btnUp) {
    btnUp.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (btnDown) {
    btnDown.addEventListener("click", () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
  }
}

/* ========== 2) AUTO UPDATE YEAR ========== */
function initYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

/* ========== 3) THEME TOGGLE ========== */
function initTheme() {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Helper: apply theme + update icon (if button exists)
  function applyTheme(isDark) {
    if (isDark) {
      body.classList.add("dark-theme");
      if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      body.classList.remove("dark-theme");
      if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  // Initial load: sessionStorage > system preference
  const sessionPreference = sessionStorage.getItem("theme");
  if (sessionPreference === "dark") applyTheme(true);
  else if (sessionPreference === "light") applyTheme(false);
  else applyTheme(mediaQuery.matches);

  // Sync with system theme changes
  mediaQuery.addEventListener("change", (e) => {
    const newIsDark = e.matches;
    applyTheme(newIsDark);
    sessionStorage.setItem("theme", newIsDark ? "dark" : "light");
  });

  // If the toggle button exists, enable manual switching
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isDarkNow = body.classList.contains("dark-theme");
    applyTheme(!isDarkNow);
    sessionStorage.setItem("theme", !isDarkNow ? "dark" : "light");
  });
}

/* ========== 4) MOBILE MENU ========== */
function initMenu() {
  const menuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Exit safely if not on the page
  if (!menuBtn || !navLinks) return;

  const mobileMQ = window.matchMedia("(max-width: 768px)");

  function setMenuState(isOpen) {
    navLinks.classList.toggle("open", isOpen);

    // Button icon swap
    menuBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

    // A11y helpers (no HTML changes required)
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    // Lock background scroll only on mobile
    if (mobileMQ.matches) {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  }

  // Ensure consistent initial state
  setMenuState(false);

  // Toggle the mobile drawer
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevents weird close/open conflicts
    setMenuState(!navLinks.classList.contains("open"));
  });

  // Close menu after clicking a link (mobile UX)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      setMenuState(false);
    }
  });

  // Close if user taps/clicks outside
  function handleOutside(e) {
    if (!navLinks.classList.contains("open")) return;

    const clickedInsideMenu = navLinks.contains(e.target);
    const clickedMenuBtn = menuBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedMenuBtn) {
      setMenuState(false);
    }
  }

  // Desktop click
  document.addEventListener("click", handleOutside, true);

  // Mobile tap
  document.addEventListener("touchstart", handleOutside, { passive: true });

  // If switching to desktop size, close + restore scroll
  const onResize = () => {
    if (!mobileMQ.matches) {
      setMenuState(false);
      document.body.style.overflow = "";
    }
  };

  if (mobileMQ.addEventListener) mobileMQ.addEventListener("change", onResize);
  else mobileMQ.addListener(onResize); // older Safari fallback
}

/* ========== 5) TYPEWRITER (HOME ONLY) ========== */
function typeEffect() {
  const typedElement = document.getElementById("typed");
  if (!typedElement) return; // Not on home page

  if (typedIndex >= typedStrings.length) typedIndex = 0;
  const currentText = typedStrings[typedIndex];

  // Print one more character each tick
  typedElement.textContent = currentText.substring(0, charIndex++);

  // If completed a word, pause, then move to next word
  if (charIndex > currentText.length) {
    charIndex = 0;
    typedIndex++;
    setTimeout(typeEffect, 1500);
  } else {
    setTimeout(typeEffect, 80);
  }
}

/* ========== 6) PORTFOLIO FILTER ========== */
function initPortfolio() {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const msg = document.getElementById("noProjects");

  // Exit safely if not on portfolio page
  if (!btns.length || !cards.length) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button UI
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      let count = 0;

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const match = filter === "all" || category === filter;

        if (match) {
          card.style.display = "flex";

          // Small fade-in for nicer UX
          card.style.opacity = "0";
          setTimeout(() => (card.style.opacity = "1"), 50);

          count++;
        } else {
          card.style.display = "none";
        }
      });

      // Show message if nothing matches
      if (msg) msg.style.display = count === 0 ? "block" : "none";
    });
  });
}

/* ========== 7) CONTACT FORM + MODAL (CONTACT ONLY) ========== */
function initContact() {
  const form = document.getElementById("contactForm");
  if (!form) return; // Not on contact page

  // Optional status element (kept for accessibility)
  const statusEl = document.getElementById("contactStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");

  // Modal elements
  const modal = document.getElementById("contactModal");
  const modalTitle = document.getElementById("contactModalTitle");
  const modalMsg = document.getElementById("contactModalMsg");
  const modalIconWrap = document.getElementById("contactModalIcon");

  const hasModal = !!modal && !!modalTitle && !!modalMsg && !!modalIconWrap;

  /* ---------- Status helper (secondary UX) ---------- */
  function setStatus(message, ok = true) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
    statusEl.style.color = ok ? "var(--text-muted)" : "crimson";
  }

  /* ---------- Modal helpers (primary UX) ---------- */
  function openModal({ title, message, ok }) {
    if (!hasModal) return;

    modalTitle.textContent = title;
    modalMsg.textContent = message;

    // Icon swap (success vs error)
    modalIconWrap.innerHTML = ok
      ? '<i class="fa-solid fa-circle-check"></i>'
      : '<i class="fa-solid fa-triangle-exclamation"></i>';

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // Prevent background scroll while modal is open
    document.body.style.overflow = "hidden";

    // Focus close button for accessibility
    const closeBtn = modal.querySelector(".modal-close-btn");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!hasModal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    // Restore scroll
    document.body.style.overflow = "";
  }

  // Bind modal close triggers (only if modal exists)
  if (hasModal) {
    // Close modal: click any element with [data-modal-close]
    modal.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    // Close modal: ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  /* ---------- Form submit ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("");

    // Honeypot anti-spam: if filled, silently succeed
    const honeypot = form.querySelector('[name="company"]')?.value || "";
    if (honeypot.trim()) {
      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }

      setStatus("Message sent successfully!", true);
      openModal({
        title: "Message Sent",
        message: "✅ Message sent successfully! I’ll get back to you soon.",
        ok: true,
      });
      return;
    }

    // Basic required fields (front-end guard)
    const name = form.querySelector('[name="name"]')?.value.trim() || "";
    const email = form.querySelector('[name="email"]')?.value.trim() || "";
    const message = form.querySelector('[name="message"]')?.value.trim() || "";

    if (!name || !email || !message) {
      setStatus("Please fill in all fields.", false);
      openModal({
        title: "Missing Fields",
        message: "Please fill in your name, email, and message before sending.",
        ok: false,
      });
      return;
    }

    // Button state: Sending...
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    setStatus("Sending...", true);

    const payload = {
      name,
      email,
      message,
      source: "Portfolio Contact Page",
      timestamp: new Date().toISOString(),
    };

    try {
      const r = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await r.text(); // keep raw for debugging

      if (!r.ok) {
        console.error("Form submit failed:", r.status, text);
        setStatus("Failed to send. Please try again.", false);

        openModal({
          title: "Not Sent",
          message:
            "❌ Your message could not be sent. Please try again in a moment.",
          ok: false,
        });
        return;
      }

      // Success
      form.reset();
      setStatus("", true);

      openModal({
        title: "Message Sent",
        message: "✅ Message sent successfully! I’ll get back to you soon.",
        ok: true,
      });
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("Network error. Please try again.", false);

      openModal({
        title: "Network Error",
        message:
          "⚠️ Network error. Please check your connection and try again.",
        ok: false,
      });
    } finally {
      // Restore button no matter what
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    }
  });
}
