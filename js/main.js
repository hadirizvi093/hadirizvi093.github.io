// main.js

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in all required fields.';
    formMessage.style.color = 'red';
    return;
  }

  formMessage.textContent = 'Thank you for contacting us! We will get back to you shortly.';
  formMessage.style.color = 'green';

  // Reset the form (simulate submission)
  this.reset();
});
