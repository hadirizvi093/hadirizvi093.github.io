// Simple client-side form validation & feedback

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const formMessage = document.getElementById('formMessage');

  if (!name || !email || !message) {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Please fill out all fields.';
    return;
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  // In real agency site, here you would send form data to backend or email API.
  // For now, just show success message and reset form.

  formMessage.style.color = 'green';
  formMessage.textContent = 'Thank you! We will get back to you soon.';
  this.reset();
});
