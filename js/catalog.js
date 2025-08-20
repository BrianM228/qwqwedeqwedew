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
    if (e.key === 'Enter') {
      searchProducts();
    }
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

  const favBtns = document.querySelectorAll(".fav-btn");
  
  favBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;

      const title = card.querySelector(".titles")?.textContent || "Untitled";
      const price = card.querySelector(".price")?.textContent || "N/A";
      const img = card.querySelector(".primary-img")?.src || "";

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      const exists = favorites.some(item => item.title === title && item.price === price);
      if (!exists) {
        favorites.push({ title, price, img });
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${title} added to favorites!`);
      } else {
        alert(`${title} is already in favorites.`);
      }
    });
  });

});