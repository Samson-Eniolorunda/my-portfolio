/* ==========================================================================
  FILE: script.js
  PROJECT: Samson Eniolorunda Portfolio Website — Frontend Logic
  AUTHOR: Samson Eniolorunda
  LAST UPDATED: December 19, 2025

  PURPOSE:
  - Central JavaScript file used across ALL pages.
  - Adds interactive behavior while keeping HTML/CSS clean and reusable.

  FEATURES (INIT ORDER ON DOMContentLoaded):
  1) Theme Toggle:
    - Switches the website between Light and Dark modes by toggling the dark-theme class on the <body>.
    - Persists the user's choice in localStorage so the theme remains consistent on future visits.
    - Dynamically swaps the button icon between a Moon (for Dark Mode) and a Sun (for Light Mode).
  2) Mobile Menu:
     - Opens/closes the nav drawer on small screens.
     - Auto-closes when a nav link is clicked.
  3) Typewriter Effect (Home page only):
     - Rotates through typedStrings inside the #typed element.
  4) Portfolio Filter (Portfolio page only):
     - Filters .project-card elements by data-category using .filter-btn buttons.
     - Shows/hides #noProjects when nothing matches.
  5) Contact Form (Contact page only):
     - Demo handler: prevents submit, shows alert, resets the form.
  6) Directional Scroll Buttons:
     - Shows Up button when scrolling up (not near top)
     - Shows Down button when scrolling down (not near bottom)
  7) Auto Year:
     - Updates #year in the footer to the current year.

  NOTE:
  - Each init function safely exits if its required DOM elements are not present.
============================================================================= */

// Rotating titles for the typewriter effect (Home page only).
const typedStrings = [
  'Front-End Developer', 
  'Problem Solver', 
  'Web Enthusiast'
];

// Typewriter state: current word index and current character position.
let typedIndex = 0; // Which phrase in typedStrings is active
let charIndex = 0; // Current character position inside the active phrase

/* --- GLOBAL INIT --- */
// Run feature initializers after the DOM is ready (safe for multi-page reuse).
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  typeEffect();
  initPortfolio();
  initContact();
  initDirectionalScroll(); // New Logic
  initYear();              // New Logic
});

/* --- 1. DIRECTIONAL SCROLL UX --- */
// Shows/hides floating scroll buttons based on scroll direction + page position.
function initDirectionalScroll() {
  const btnUp = document.getElementById('btnPageUp');
  const btnDown = document.getElementById('btnPageDown');
  
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Detect Scroll Direction
    if (currentScrollY > lastScrollY) {
      // SCROLLING DOWN
      if (btnUp) btnUp.classList.remove('show'); // Hide Up
      // Show Down only if not at bottom
      if (btnDown && currentScrollY < (maxScroll - 50)) {
        btnDown.classList.add('show');
      } else {
        if(btnDown) btnDown.classList.remove('show');
      }
    } else {
      // SCROLLING UP
      if (btnDown) btnDown.classList.remove('show'); // Hide Down
      // Show Up only if not at top
      if (btnUp && currentScrollY > 50) {
        btnUp.classList.add('show');
      } else {
        if(btnUp) btnUp.classList.remove('show');
      }
    }

    lastScrollY = currentScrollY;
  });

  // Click Events
  if (btnUp) {
    btnUp.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (btnDown) {
    btnDown.addEventListener('click', () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }
}

/* --- 2. AUTO UPDATE YEAR --- */
// Updates the footer year automatically (avoids hardcoding).
function initYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* --- 3. THEME TOGGLE (Session Persistence + System Auto-Detect) --- */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Helper: Apply theme & update icon
  function applyTheme(isDark) {
    if (isDark) {
      body.classList.add('dark-theme');
      if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      body.classList.remove('dark-theme');
      if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  // 1. Check Session Storage first (Maintains choice across pages)
  const sessionPreference = sessionStorage.getItem('theme');

  if (sessionPreference === 'dark') {
    applyTheme(true);
  } else if (sessionPreference === 'light') {
    applyTheme(false);
  } else {
    // No session preference? Default to System Settings
    applyTheme(mediaQuery.matches);
  }

  // 2. Listen for System Changes
  // Only auto-update if the user hasn't manually overridden the session
  mediaQuery.addEventListener('change', (e) => {
    if (!sessionStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  // 3. Manual Toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDarkNow = body.classList.contains('dark-theme');
      const newMode = !isDarkNow; // Flip current state
      
      applyTheme(newMode);
      
      // Save to Session Storage (Locks choice until browser closes)
      sessionStorage.setItem('theme', newMode ? 'dark' : 'light');
    });
  }
}

/* --- 4. MOBILE MENU --- */
// Mobile menu: toggles the nav links list and closes it after clicking a link.
function initMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.innerHTML = navLinks.classList.contains('open')
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

/* --- 5. TYPEWRITER --- */
// Typewriter effect: writes the current phrase into #typed and loops forever.
function typeEffect() {
  const typedElement = document.getElementById('typed');
  if (!typedElement) return;

  if (typedIndex >= typedStrings.length) typedIndex = 0;
  const currentText = typedStrings[typedIndex];
  
  typedElement.textContent = currentText.substring(0, charIndex++);

  if (charIndex > currentText.length) {
    charIndex = 0;
    typedIndex++;
    setTimeout(typeEffect, 1500);
  } else {
    setTimeout(typeEffect, 80); // Slightly faster typing
  }
}

/* --- 6. PORTFOLIO FILTER --- */
// Portfolio filtering: shows/hides project cards using data-category.
function initPortfolio() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const msg = document.getElementById('noProjects');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      let count = 0;
      
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          // Add fade in animation reset
          card.style.opacity = '0';
          setTimeout(() => card.style.opacity = '1', 50);
          count++;
        } else {
          card.style.display = 'none';
        }
      });
      if (msg) msg.style.display = count === 0 ? 'block' : 'none';
    });
  });
}

/* --- 7. CONTACT FORM (Demo) --- */
// Contact form handler: demo-only submit (prevents reload and resets the form).
function initContact() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default browser form submit / page jump
      alert('Message sent successfully! (This is a demo)');
      form.reset();
    });
  }
}
