const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1499, emoji: "🎧", description: "Comfortable everyday audio" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 2199, emoji: "⌚", description: "A simple style upgrade" },
  { id: 3, name: "Everyday Backpack", category: "Fashion", price: 899, emoji: "🎒", description: "Room for your essentials" },
  { id: 4, name: "Classic Sneakers", category: "Fashion", price: 1799, emoji: "👟", description: "Made for daily comfort" },
  { id: 5, name: "Desk Lamp", category: "Home", price: 649, emoji: "💡", description: "Brighten your study desk" },
  { id: 6, name: "Coffee Mug", category: "Home", price: 249, emoji: "☕", description: "Your everyday favourite" },
  { id: 7, name: "Learning Java", category: "Books", price: 499, emoji: "📘", description: "A beginner-friendly guide" },
  { id: 8, name: "Notebook Set", category: "Books", price: 199, emoji: "📚", description: "Ideas start on a page" }
];

let cart = JSON.parse(localStorage.getItem("shopeasy_cart") || "[]");
let orders = JSON.parse(localStorage.getItem("shopeasy_orders") || "[]");

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartSection = document.getElementById("cartSection");

function money(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}

function saveState() {
  localStorage.setItem("shopeasy_cart", JSON.stringify(cart));
  localStorage.setItem("shopeasy_orders", JSON.stringify(orders));
}

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const filtered = products.filter(product =>
    (product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)) &&
    (category === "All" || product.category === category)
  );

  document.getElementById("resultMessage").textContent =
    `${filtered.length} product${filtered.length === 1 ? "" : "s"} found`;

  productGrid.innerHTML = filtered.length ? filtered.map(product => `
    <article class="product-card">
      <div class="product-visual" aria-label="${product.name}">${product.emoji}</div>
      <p class="product-category">${product.category}</p>
      <h3>${product.name}</h3>
      <p class="product-category">${product.description}</p>
      <div class="product-bottom">
        <span class="price">${money(product.price)}</span>
        <button class="add-button" type="button" data-add="${product.id}">Add to cart</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No products found. Try another search.</div>`;
}

function cartTotal() {
  return cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function updateCartCount() {
  document.getElementById("cartCount").textContent =
    cart.reduce((total, item) => total + item.quantity, 0);
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cart.length) {
    cartItems.innerHTML = `<div class="empty-state">Your cart is empty. Add a product to get started.</div>`;
  } else {
    cartItems.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return "";
      return `<div class="cart-row">
        <div class="cart-product"><span class="cart-emoji">${product.emoji}</span><div><strong>${product.name}</strong><p class="product-category">${money(product.price)} each</p></div></div>
        <strong>${money(product.price * item.quantity)}</strong>
        <div class="quantity-controls">
          <button type="button" data-minus="${product.id}" aria-label="Decrease ${product.name} quantity">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-plus="${product.id}" aria-label="Increase ${product.name} quantity">+</button>
        </div>
        <button type="button" class="remove-button" data-remove="${product.id}">Remove</button>
      </div>`;
    }).join("");
  }
  document.getElementById("cartTotal").textContent = money(cartTotal());
  updateCartCount();
  saveState();
}

function renderOrders() {
  const history = document.getElementById("orderHistory");
  if (!orders.length) {
    history.innerHTML = `<div class="empty-state">No orders yet. Your completed demo orders will appear here.</div>`;
    return;
  }
  history.innerHTML = orders.map(order => `
    <article class="order-card">
      <h3>Order ${order.id}</h3>
      <p>${order.date}</p>
      <p>${order.items.map(item => `${item.name} × ${item.quantity}`).join(", ")}</p>
      <p><strong>Total: ${money(order.total)}</strong></p>
      <p>Status: ${order.status}</p>
    </article>
  `).join("");
}

function addToCart(id) {
  const item = cart.find(row => row.id === id);
  if (item) item.quantity += 1;
  else cart.push({ id, quantity: 1 });
  renderCart();
  cartSection.classList.add("visible");
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(Number(button.dataset.add));
});

document.getElementById("cartItems").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.plus) {
    const item = cart.find(row => row.id === Number(button.dataset.plus));
    if (item) item.quantity += 1;
  } else if (button.dataset.minus) {
    const id = Number(button.dataset.minus);
    const item = cart.find(row => row.id === id);
    if (item) item.quantity -= 1;
    cart = cart.filter(row => row.quantity > 0);
  } else if (button.dataset.remove) {
    cart = cart.filter(row => row.id !== Number(button.dataset.remove));
  }
  renderCart();
});

document.getElementById("cartToggle").addEventListener("click", () => {
  cartSection.classList.toggle("visible");
  if (cartSection.classList.contains("visible")) cartSection.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("closeCart").addEventListener("click", () => cartSection.classList.remove("visible"));
document.getElementById("searchButton").addEventListener("click", renderProducts);
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty. Add a product before checkout.");
    return;
  }
  const customerName = prompt("Enter your name for this demo order:");
  if (!customerName || !customerName.trim()) {
    alert("Checkout cancelled. Please enter a name.");
    return;
  }
  const itemDetails = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { name: product.name, quantity: item.quantity, price: product.price };
  });
  const order = {
    id: "SE" + Date.now().toString().slice(-7),
    customer: customerName.trim(),
    date: new Date().toLocaleString("en-IN"),
    items: itemDetails,
    total: cartTotal(),
    status: "Demo order placed"
  };
  orders.unshift(order);
  cart = [];
  saveState();
  renderCart();
  renderOrders();
  alert(`Demo order placed successfully! Order ID: ${order.id}\\nNo payment was collected.`);
});

document.getElementById("clearOrders").addEventListener("click", () => {
  if (orders.length && confirm("Clear all demo order history from this browser?")) {
    orders = [];
    saveState();
    renderOrders();
  }
});

renderProducts();
renderCart();
renderOrders();
