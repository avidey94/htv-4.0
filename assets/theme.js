// Custom Cursor
if (document.querySelector('.custom-cursor')) {
  const cursor = document.querySelector('.custom-cursor');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .product-card');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// Initialize 3D Models if enabled
if (window.Shopify.settings.enable_3d_models) {
  // Load model-viewer component
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
  document.head.appendChild(script);
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));
  }
});

// Add to Cart Animation
document.addEventListener('click', (e) => {
  if (e.target.matches('.add-to-cart')) {
    const button = e.target;
    const originalText = button.textContent;
    
    button.textContent = 'Adding...';
    button.disabled = true;
    
    // Simulate add to cart delay
    setTimeout(() => {
      button.textContent = 'Added!';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1000);
    }, 500);
  }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', 
      mobileMenu.classList.contains('active'));
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}); 