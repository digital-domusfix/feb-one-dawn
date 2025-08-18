(function () {
  const STORAGE_KEY = 'shopify-wishlist';

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function inWishlist(id) {
    return getWishlist().some((item) => item.id === id);
  }

  function updateButton(button, active) {
    const heart = button.querySelector('.wishlist-heart');
    if (active) {
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
      if (heart) heart.setAttribute('fill', 'currentColor');
    } else {
      button.classList.remove('is-active');
      button.setAttribute('aria-pressed', 'false');
      if (heart) heart.setAttribute('fill', 'none');
    }
  }

  function toggleWishlist(product) {
    const items = getWishlist();
    const index = items.findIndex((p) => p.id === product.id);
    if (index > -1) {
      items.splice(index, 1);
      saveWishlist(items);
      return false;
    }
    items.push(product);
    saveWishlist(items);
    return true;
  }

  function initButtons() {
    document.querySelectorAll('.wishlist-toggle').forEach((button) => {
      const product = {
        id: button.dataset.productId,
        handle: button.dataset.productHandle,
        title: button.dataset.productTitle,
        image: button.dataset.productImage,
      };
      updateButton(button, inWishlist(product.id));
      button.addEventListener('click', () => {
        const active = toggleWishlist(product);
        updateButton(button, active);
        renderWishlist();
      });
    });
  }

  function renderWishlist() {
    const container = document.getElementById('wishlist-container');
    if (!container) return;
    const items = getWishlist();
    container.innerHTML = '';
    if (!items.length) {
      container.innerHTML = '<p>Your wishlist is empty.</p>';
      return;
    }
    const list = document.createElement('div');
    list.className = 'wishlist-items';
    items.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'wishlist-item';
      div.innerHTML = `
        <a href="/products/${item.handle}">
          <img src="${item.image}" alt="${item.title}">
          <span>${item.title}</span>
        </a>`;
      list.appendChild(div);
    });
    container.appendChild(list);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initButtons();
    renderWishlist();
  });
})();
