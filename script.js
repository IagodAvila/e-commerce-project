const products = [
  {
    id: 1,
    name: 'Camisa Astronauta',
    brand: 'adidas',
    price: 89.9,
    image: 'img/products/f1.jpg',
    category: 'Camiseta',
    description: 'Uma peça confortável e moderna, perfeita para o dia a dia com um toque urbano e estiloso.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 2,
    name: 'Camisa Tropical',
    brand: 'H&M',
    price: 74.9,
    image: 'img/products/f2.jpg',
    category: 'Camiseta',
    description: 'Estampa vibrante e tecido leve para dias quentes e encontros casuais.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 3,
    name: 'Camisa de Linho',
    brand: 'Zara',
    price: 99.0,
    image: 'img/products/f3.jpg',
    category: 'Camiseta',
    description: 'Modelagem clássica com acabamento premium e sensação sofisticada.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 4,
    name: 'Colete Premium',
    brand: 'Nike',
    price: 129.0,
    image: 'img/products/f4.jpg',
    category: 'Casaco',
    description: 'Leve, versátil e ideal para criar combinações com personalidade.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 5,
    name: 'Jaqueta Casual',
    brand: 'Puma',
    price: 159.0,
    image: 'img/products/f5.jpg',
    category: 'Jaqueta',
    description: 'Estilo casual com estrutura reforçada e excelente conforto.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 6,
    name: 'Camiseta Esporte',
    brand: 'Nike',
    price: 69.9,
    image: 'img/products/f6.jpg',
    category: 'Esporte',
    description: 'Tecido respirável que acompanha seu ritmo e seu estilo diário.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 7,
    name: 'Vestido Clássico',
    brand: 'Gucci',
    price: 189.0,
    image: 'img/products/f7.jpg',
    category: 'Vestido',
    description: 'Elegância clássica para ocasiões especiais e looks sofisticados.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 8,
    name: 'Blazer Minimalista',
    brand: 'H&M',
    price: 149.0,
    image: 'img/products/f8.jpg',
    category: 'Blazer',
    description: 'Refinado, versátil e perfeito para elevar qualquer composição.',
    collection: 'featured',
    rating: 5
  },
  {
    id: 9,
    name: 'Camisa Moderna',
    brand: 'adidas',
    price: 84.9,
    image: 'img/products/n1.jpg',
    category: 'Camiseta',
    description: 'Uma peça atual com acabamento impecável para seu guarda-roupa.',
    collection: 'new',
    rating: 5
  },
  {
    id: 10,
    name: 'Vestido de Verão',
    brand: 'Zara',
    price: 109.0,
    image: 'img/products/n2.jpg',
    category: 'Vestido',
    description: 'Estilo leve e fresco ideal para dias ensolarados e passeios.',
    collection: 'new',
    rating: 5
  },
  {
    id: 11,
    name: 'Camiseta Estampada',
    brand: 'Puma',
    price: 79.0,
    image: 'img/products/n3.jpg',
    category: 'Camiseta',
    description: 'Design marcante com conforto premium para usar todos os dias.',
    collection: 'new',
    rating: 5
  },
  {
    id: 12,
    name: 'Casaco Urbano',
    brand: 'Nike',
    price: 169.0,
    image: 'img/products/n4.jpg',
    category: 'Casaco',
    description: 'Estilo urbano e proteção aconchegante para as temperaturas mais frias.',
    collection: 'new',
    rating: 5
  }
];

const cartStorageKey = 'cara-cart';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(cartStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function showToast(message) {
  const existingToast = document.getElementById('cart-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'cart-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  window.setTimeout(() => {
    toast.remove();
  }, 2200);
}

function updateCartUI() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll('a[href="cart.html"]').forEach((link) => {
    const existingBadge = link.querySelector('.cart-badge');
    if (existingBadge) {
      existingBadge.remove();
    }

    if (count > 0) {
      const badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.textContent = count;
      link.appendChild(badge);
    }
  });
}

function addToCart(productId, quantity = 1) {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return;
  }

  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  updateCartUI();
  showToast(`${product.name} adicionado ao carrinho`);
}

function handleCartRemoval(productId) {
  const nextCart = getCart().filter((item) => item.id !== productId);
  saveCart(nextCart);
  updateCartUI();
  renderCartPage();
}

function handleQuantityChange(productId, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);

  if (!item) {
    return;
  }

  item.quantity = Math.max(1, quantity);
  saveCart(cart);
  updateCartUI();
  renderCartPage();
}

function buildProductCard(product) {
  const card = document.createElement('div');
  card.className = 'pro';
  card.dataset.productId = product.id;
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="des">
      <span>${product.brand}</span>
      <h5>${product.name}</h5>
      <div class="star">
        ${Array.from({ length: product.rating }, () => '<i class="fas fa-star"></i>').join('')}
      </div>
      <h4>${formatCurrency(product.price)}</h4>
    </div>
    <button class="cart" type="button" aria-label="Adicionar ao carrinho">
      <i class="fal fa-shopping-cart"></i>
    </button>
  `;

  return card;
}

function renderProductGrid(containerId, filters = []) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const filteredProducts = filters.length
    ? products.filter((product) => filters.includes(product.collection))
    : products;

  container.innerHTML = '';
  filteredProducts.forEach((product) => container.appendChild(buildProductCard(product)));
}

function renderProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id')) || 1;
  const product = products.find((item) => item.id === productId) || products[0];

  const mainImage = document.getElementById('MainImg');
  const details = document.getElementById('product-details');

  if (mainImage) {
    mainImage.src = product.image;
  }

  if (details) {
    details.innerHTML = `
      <h6>Home / ${product.category}</h6>
      <h4>${product.name}</h4>
      <h2>${formatCurrency(product.price)}</h2>
      <select>
        <option>Selecione o tamanho</option>
        <option>XXG</option>
        <option>XG</option>
        <option>Grande</option>
        <option>Médio</option>
        <option>Pequeno</option>
      </select>
      <div class="product-actions">
        <input type="number" id="product-quantity" value="1" min="1">
        <button class="normal" id="add-to-cart-btn" type="button">Adicionar ao Carrinho</button>
      </div>
      <h4>Detalhes do Produto</h4>
      <span>${product.description}</span>
    `;

    const addButton = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('product-quantity');

    addButton?.addEventListener('click', () => {
      addToCart(product.id, Number(quantityInput?.value || 1));
    });
  }

  renderProductGrid('related-products', ['featured']);
}

function renderCartPage() {
  const cart = getCart();
  const tbody = document.getElementById('cart-items');
  const subtotalCell = document.getElementById('cart-subtotal');
  const totalCell = document.getElementById('cart-total');
  const shippingCell = document.getElementById('cart-shipping');

  if (!tbody) {
    return;
  }

  if (!cart.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">Seu carrinho está vazio. Explore os produtos e adicione alguns itens.</div>
        </td>
      </tr>
    `;
    if (subtotalCell) subtotalCell.textContent = formatCurrency(0);
    if (totalCell) totalCell.innerHTML = '<strong>R$ 0,00</strong>';
    if (shippingCell) shippingCell.textContent = '—';
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  tbody.innerHTML = cart
    .map(
      (item) => `
        <tr>
          <td><button class="remove-item" type="button" data-product-id="${item.id}"><i class="far fa-times-circle"></i></button></td>
          <td><img src="${item.image}" alt="${item.name}"></td>
          <td>${item.name}</td>
          <td>${formatCurrency(item.price)}</td>
          <td><input type="number" class="quantity-input" value="${item.quantity}" min="1" data-product-id="${item.id}"></td>
          <td>${formatCurrency(item.price * item.quantity)}</td>
        </tr>
      `
    )
    .join('');

  tbody.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => handleCartRemoval(Number(button.dataset.productId)));
  });

  tbody.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('change', () => handleQuantityChange(Number(input.dataset.productId), Number(input.value)));
  });

  if (subtotalCell) subtotalCell.textContent = formatCurrency(subtotal);
  if (totalCell) totalCell.innerHTML = `<strong>${formatCurrency(subtotal)}</strong>`;
  if (shippingCell) shippingCell.textContent = subtotal > 0 ? 'Grátis' : '—';
}

function initializeInteractions() {
  const bar = document.getElementById('bar');
  const close = document.getElementById('close');
  const nav = document.getElementById('navbar');
  const mobile = document.getElementById('mobile');

  if (bar) {
    bar.addEventListener('click', () => {
      nav?.classList.add('active');
      bar.style.display = 'none';
      if (mobile) {
        mobile.style.display = 'none';
      }
    });
  }

  if (close) {
    close.addEventListener('click', () => {
      nav?.classList.remove('active');
      bar.style.display = 'block';
      if (mobile) {
        mobile.style.display = 'flex';
      }
    });
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('.pro[data-product-id]');
    if (!card) {
      return;
    }

    if (event.target.closest('.cart')) {
      event.preventDefault();
      event.stopPropagation();
      addToCart(Number(card.dataset.productId));
      return;
    }

    window.location.href = `sproduct.html?id=${card.dataset.productId}`;
  });

  if (document.body.dataset.page === 'home') {
    renderProductGrid('featured-products', ['featured']);
    renderProductGrid('new-products', ['new']);
  }

  if (document.body.dataset.page === 'shop') {
    renderProductGrid('shop-products');
  }

  if (document.body.dataset.page === 'product') {
    renderProductDetails();
  }

  if (document.body.dataset.page === 'cart') {
    renderCartPage();
  }

  updateCartUI();
}

document.addEventListener('DOMContentLoaded', initializeInteractions);