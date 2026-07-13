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

// Basic form submission feedback (non-Formspree fallback)
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function (e) {
    // Optional: skip if Formspree is being used and works fine
    // e.preventDefault();
    // alert('Thank you for your message! I will get back to you soon.');
  });
}