/*
 * Custom JavaScript for Samson Eniolorunda's portfolio website.
 *
 * This script handles theme toggling, mobile navigation, typewriter
 * animation, contact form validation and portfolio filtering.  It
 * relies on simple DOM manipulation and does not require any
 * external libraries.
 */

// Initialise theme and interactive behaviours when the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenuToggle();
  initContactForm();
  initPortfolioFilters();
  typeEffect();
});

/* -------------------------------------------------------------
   Theme Toggle
   Reads the preferred theme from localStorage and updates the
   document accordingly.  Clicking the theme button toggles between
   light and dark modes and persists the choice.
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const toggleBtn = document.getElementById('themeToggle');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (toggleBtn) toggleBtn.textContent = '☀';
  } else {
    body.classList.remove('dark-theme');
    if (toggleBtn) toggleBtn.textContent = '☾';
  }
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggleBtn.textContent = isDark ? '☀' : '☾';
    });
  }
}

/* -------------------------------------------------------------
   Mobile Navigation Toggle
   When the hamburger button is clicked on small screens, toggle
   the `.open` class on the nav element to reveal or hide the
   collapsed menu.
 */
function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    // Close the menu when a nav link is clicked (useful on mobile)
    const navLinks = mainNav.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }
}

/* -------------------------------------------------------------
   Contact Form Validation
   Validates fields on submission.  Shows inline error messages
   and displays a success message when the form is valid.  Fields
   are cleared after a successful submission.
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    let valid = true;
    // Clear errors
    form.querySelectorAll('.error').forEach(el => el.textContent = '');
    // Validate name
    if (!nameField.value.trim()) {
      showError(nameField, 'Name is required');
      valid = false;
    }
    // Validate email
    if (!emailField.value.trim()) {
      showError(emailField, 'Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      showError(emailField, 'Enter a valid email');
      valid = false;
    }
    // Validate subject
    if (!subjectField.value.trim()) {
      showError(subjectField, 'Subject is required');
      valid = false;
    }
    // Validate message
    if (!messageField.value.trim()) {
      showError(messageField, 'Message is required');
      valid = false;
    }
    if (valid) {
      const success = document.getElementById('form-success') || document.getElementById('form-success-message');
      // Show success message
      const successMessage = document.getElementById('form-success');
      if (successMessage) {
        successMessage.style.display = 'block';
      }
      // Clear fields
      nameField.value = '';
      emailField.value = '';
      subjectField.value = '';
      messageField.value = '';
    }
  });
}

function showError(inputElement, message) {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement) {
    errorElement.textContent = message;
  }
}

/* -------------------------------------------------------------
   Typewriter Effect
   Cycles through an array of strings, typing each character
   sequentially.  When a word is finished, it pauses briefly
   before proceeding to the next word.  Adjust the `typedStrings`
   array to customise the titles shown.
 */
const typedStrings = [
  'Front‑End Developer',
  'Creative Problem Solver',
  'Tech Enthusiast',
  'Team Collaborator'
];
let typedIndex = 0;
let charIndex = 0;
function typeEffect() {
  const typedElement = document.getElementById('typed');
  if (!typedElement) return;
  if (typedIndex >= typedStrings.length) typedIndex = 0;
  const currentText = typedStrings[typedIndex];
  typedElement.textContent = currentText.substring(0, charIndex++);
  if (charIndex > currentText.length) {
    charIndex = 0;
    typedIndex++;
    setTimeout(typeEffect, 1000);
  } else {
    setTimeout(typeEffect, 120);
  }
}

/* -------------------------------------------------------------
   Portfolio Filtering
   Filters project cards based on the selected category.  When a
   filter button is clicked, it becomes active and the grid
   updates to show only matching projects.  If no projects exist
   for a category, a message is displayed.
 */
function initPortfolioFilters() {
  const filterContainer = document.querySelector('.filter-buttons');
  const projects = document.querySelectorAll('.project-card');
  const noProjects = document.getElementById('noProjects');
  if (!filterContainer || projects.length === 0) return;
  filterContainer.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    // Update active state
    filterContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    let hasVisible = false;
    projects.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        hasVisible = true;
      } else {
        card.style.display = 'none';
      }
    });
    // Show or hide 'coming soon' message
    if (filter === 'app' && !hasVisible && noProjects) {
      noProjects.style.display = 'block';
    } else if (noProjects) {
      noProjects.style.display = 'none';
    }
  });
}