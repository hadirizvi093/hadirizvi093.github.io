// Dark/Light mode toggle using localStorage
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Set initial theme
if (localStorage.getItem('theme') === 'light') {
  html.classList.remove('dark');
} else {
  html.classList.add('dark');
}

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Scroll-triggered animations using IntersectionObserver
const fadeElems = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
});

fadeElems.forEach(el => observer.observe(el));

// Smooth scrolling for anchor links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
