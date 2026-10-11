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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll-in animations
const fadeElements = document.querySelectorAll(
  '.service-card, .review-card, .gallery-item, .about-card, .service-area-content, .quote-form'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// Seamless infinite slider
const sliderTrack = document.getElementById('sliderTrack');
if (sliderTrack) {
  // Clone all images for seamless loop
  const images = sliderTrack.innerHTML;
  sliderTrack.innerHTML = images + images;

  let scrollPos = 0;
  const speed = 0.5; // pixels per frame

  function scrollSlider() {
    scrollPos += speed;
    // Reset when first set has fully scrolled off
    if (scrollPos >= sliderTrack.scrollWidth / 2) {
      scrollPos = 0;
    }
    sliderTrack.style.transform = `translateX(-${scrollPos}px)`;
    requestAnimationFrame(scrollSlider);
  }
  requestAnimationFrame(scrollSlider);
}

// Reviews carousel
const reviewsTrack = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('reviewPrev');
const nextBtn = document.getElementById('reviewNext');

if (reviewsTrack && prevBtn && nextBtn) {
  let reviewIndex = 0;
  const cards = reviewsTrack.querySelectorAll('.review-card');
  const getCardsPerView = () => window.innerWidth <= 768 ? 1 : 3;

  function updateReviewCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = cards.length - cardsPerView;
    if (reviewIndex > maxIndex) reviewIndex = maxIndex;
    if (reviewIndex < 0) reviewIndex = 0;
    const viewport = reviewsTrack.parentElement.offsetWidth;
    const gap = 24;
    const cardWidth = (viewport - gap * (cardsPerView - 1)) / cardsPerView;
    reviewsTrack.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
  }

  prevBtn.addEventListener('click', () => {
    reviewIndex--;
    if (reviewIndex < 0) reviewIndex = cards.length - getCardsPerView();
    updateReviewCarousel();
  });

  nextBtn.addEventListener('click', () => {
    const maxIndex = cards.length - getCardsPerView();
    reviewIndex++;
    if (reviewIndex > maxIndex) reviewIndex = 0;
    updateReviewCarousel();
  });

  window.addEventListener('resize', updateReviewCarousel);
}

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
