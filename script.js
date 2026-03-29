// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(27, 42, 74, 0.98)';
  } else {
    navbar.style.background = 'rgba(27, 42, 74, 0.95)';
  }
});

// Quote form submission via Formspree
const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(quoteForm);

  fetch(quoteForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      quoteForm.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      alert('Oops! Something went wrong. Please try again.');
    }
  }).catch(() => {
    alert('Oops! Something went wrong. Please try again.');
  });
});

// Smooth reveal on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .review-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
