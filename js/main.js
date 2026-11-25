document.addEventListener('DOMContentLoaded', () => {
  // Search input handler
  const searchInput = document.querySelector('.nav-search input');
  const searchBtn = document.querySelector('.search-btn');

  const executeSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      console.log('Searching for:', query);
      const productCards = document.querySelectorAll('.product-card');
      productCards.forEach(card => {
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        if (name.includes(query.toLowerCase())) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    } else {
      document.querySelectorAll('.product-card').forEach(card => card.style.display = 'flex');
    }
  };

  searchBtn.addEventListener('click', executeSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  });

  // Cart click counter
  const cartBtn = document.querySelector('.cart-btn');
  const cartCount = document.querySelector('.cart-count');
  let count = 0;

  // Add to cart on product click
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on link
      if (e.target.tagName.toLowerCase() === 'a') return;
      count++;
      cartCount.textContent = count;
      cartCount.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
      }, 200);
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
