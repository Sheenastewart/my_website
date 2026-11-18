// In-page anchors: use native scrolling so html scroll-padding-top
// (sticky navbar offset) is respected. Only intercept when a target exists.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history.replaceState) {
      history.replaceState(null, '', href);
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
