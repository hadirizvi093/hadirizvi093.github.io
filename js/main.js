// Theme toggle and scroll animation logic

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
  } else if (!savedTheme && userPrefersDark) {
    document.documentElement.classList.remove('light');
  }

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    if (document.documentElement.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });

  // Scroll-triggered fade-in animation
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(fade => {
    observer.observe(fade);
  });
});
