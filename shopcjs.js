// Load cart from localStorage or initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render products (used on product page)
const result = document.querySelector(".result");
if (result) {
  const productsHTML = products.map(
    (product) => `<div class="product-card">
        <h2 class="product-name">${product.name}</h2>
        <strong>RM ${product.price.toFixed(2)}</strong>
        <button class="product-btn" id=${product.id}>Add to Cart</button>
    </div>`
  );
  result.innerHTML = productsHTML.join("");

  // Add event listeners for buttons
  document.querySelectorAll(".product-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      addToCart(products, parseInt(e.target.id));
    });
  });
}

function addToCart(products, id) {
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => product.id === id);
  if (cartProduct) {
    incrItem(id);
  } else {
    cart.unshift({ ...product });
  }
  updateCart();
  getTotal(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  const cartItems = document.querySelector(".cart-items");
  if (!cartItems) return;

  const cartHTML = cart.map(
    (item) => `<div class="cart-item">
        <h3>${item.name}</h3>
        <div class="cart-detail">
            <div class="mid">
                <button onclick="decrItem(${item.id})">-</button>
                <p>${item.quantity}</p>
                <button onclick="incrItem(${item.id})">+</button>
            </div>
            <p>RM ${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="deleteItem(${item.id})" class="cart-product" id=${item.id}>D</button>
        </div>
    </div>`
  );
  cartItems.innerHTML = cartHTML.join("");
}

function getTotal(cart) {
  let { totalItem, cartTotal } = cart.reduce(
    (total, cartItem) => {
      total.cartTotal += cartItem.price * cartItem.quantity;
      total.totalItem += cartItem.quantity;
      return total;
    },
    { totalItem: 0, cartTotal: 0 }
  );
  const totalItemsHTML = document.querySelector(".noOfItems");
  if (totalItemsHTML) totalItemsHTML.innerHTML = `${totalItem} items`;
  const totalAmountHTML = document.querySelector(".total");
  if (totalAmountHTML) totalAmountHTML.innerHTML = `RM ${cartTotal.toFixed(2)}`;
}

function incrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && cart[i].id == id) {
      cart[i].quantity += 1;
    }
  }
  updateCart();
  getTotal(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function decrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id && cart[i].quantity > 1) {
      cart[i].quantity -= 1;
    }
  }
  updateCart();
  getTotal(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = 1;
      cart.splice(i, 1);
    }
  }
  updateCart();
  getTotal(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Reload cart UI on page load
window.onload = function () {
  updateCart();
  getTotal(cart);
};
