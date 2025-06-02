// js/main.js

// Theme toggle
const toggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  toggle.textContent = '☀️';
}

// Toggle between light and dark
toggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  toggle.textContent = isLight ? '☀️' : '🌙';
});

// AOS animation init
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
});

// Simple contact form alert
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('✅ Thank you! We will get back to you shortly.');
  this.reset();
});
