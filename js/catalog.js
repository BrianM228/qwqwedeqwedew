document.addEventListener('DOMContentLoaded', () => {
  function searchProducts() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const title = card.querySelector('.titles').textContent.toLowerCase();
      const description = card.querySelector('.price').textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  const searchInput = document.querySelector('.search-bar input');
  searchInput.addEventListener('input', searchProducts);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchProducts();
  });

  const initImageHover = (container = document) => {
    const cards = container.querySelectorAll('.card');

    cards.forEach(card => {
      const primaryImg = card.querySelector('.primary-img');
      const secondaryImg = card.querySelector('.secondary-img');

      if (!primaryImg || !secondaryImg) return;

      const preload = new Image();
      preload.src = secondaryImg.src;

      card.addEventListener('mouseenter', () => {
        primaryImg.style.opacity = "0";
        secondaryImg.style.opacity = "1";
        secondaryImg.style.transition = "opacity 0.5s cubic-bezier(.4,0,.2,1)";
      });

      card.addEventListener('mouseleave', () => {
        primaryImg.style.opacity = "1";
        secondaryImg.style.opacity = "0";
      });
    });
  };

  initImageHover();

  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenItems = document.getElementById('hiddenItems');

  if (showMoreBtn && hiddenItems) {
    if (hiddenItems.children.length === 0) {
      showMoreBtn.classList.add('hidden'); 
    }

    showMoreBtn.addEventListener('click', () => {
      hiddenItems.classList.remove('hidden');
      showMoreBtn.classList.add('hidden');

      initImageHover(hiddenItems);

      hiddenItems.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Работа с избранным:
  const favButtons = document.querySelectorAll('.fav-btn');



  favButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      if (!card) return;

      const productTitle = card.querySelector('.titles').textContent.trim();
      const productPrice = card.querySelector('.price').textContent.trim();
      const primaryImg = card.querySelector('.primary-img').src;

      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      const isExist = favorites.some(item => item.title === productTitle);

      if (!isExist) {
        favorites.push({
          title: productTitle,
          price: productPrice,
          image: primaryImg
        });

        localStorage.setItem('favorites', JSON.stringify(favorites));
        btn.textContent = '★ favorite';
        btn.disabled = true;
        alert('Товар добавлен в избранное!');
      } else {
        alert('Этот товар уже в избранном.');
      }
    });
  });
});
