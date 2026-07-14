// Project demo modal
const demoModal = document.getElementById('demo-modal');
const demoFrame = document.getElementById('demo-frame');
const demoClose = document.getElementById('demo-close');

function closeDemoModal() {
  if (!demoModal) return;
  demoModal.hidden = true;
  if (demoFrame) demoFrame.src = '';
  document.body.style.overflow = '';
}

if (demoModal && demoFrame && demoClose) {
  document.querySelectorAll('.demo-open').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('data-demo') || link.getAttribute('href');
      demoFrame.src = url;
      demoModal.hidden = false;
      document.body.style.overflow = 'hidden';
      demoClose.focus();
    });
  });

  demoClose.addEventListener('click', closeDemoModal);

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) closeDemoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !demoModal.hidden) closeDemoModal();
  });
}

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
