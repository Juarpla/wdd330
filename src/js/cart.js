import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0 && Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is currently empty. Have a look around and see if you can find anything you like!</p>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

function getTotal() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const prices = [];
    cartItems.map((item) => addToArray(item, prices));

    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
      sum += prices[i];
    }

    document.querySelector(".cart-total").textContent = `Total: $${sum}`;
  } else {
    document.querySelector(".cart-footer").style.display = "none";
  }
}

function addToArray(item, array) {
  array.push(item.FinalPrice);
}

getTotal();
