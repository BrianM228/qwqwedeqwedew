const products = document.getElementById('favorites-list');
let productsLocal = JSON.parse(localStorage.getItem('favorites')) || [];

function renderFavorites() {
  products.innerHTML = productsLocal.map((product, index) => `
    <div class="product-item" data-index="${index}">
      <img src="${product.image}" alt="${product.title}" class="image-local" />
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">Цена: ${product.price} ₽</p>
      <button class="delete-btn" data-index="${index}">Удалить</button>
    </div>
  `).join('');

  const deleteButtons = products.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      productsLocal.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(productsLocal));
      renderFavorites(); 
    });
  });
}

renderFavorites();
