// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Formspree contact form submission
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form && status) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.hidden = true;
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        status.textContent = 'Thank you for your message! I will get back to you soon.';
        status.classList.add('form-status--success');
        form.reset();
      } else {
        const data = await response.json();
        status.textContent = data.error || 'Something went wrong. Please try again or email me directly.';
        status.classList.add('form-status--error');
      }
    } catch {
      status.textContent = 'Unable to send your message. Please try again or email me directly.';
      status.classList.add('form-status--error');
    } finally {
      status.hidden = false;
      submitBtn.disabled = false;
    }
  });
}
