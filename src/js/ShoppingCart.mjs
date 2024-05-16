import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <button type="button" class="remove"><span data-id="${item.Id}">X</span></button>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.FinalPrice / item.ListPrice}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (cartItems && cartItems.length > 0 && Array.isArray(cartItems)) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML =
        htmlItems.join("");
      assignRemoveItemButtons(cartItems);
    } else {
      document.querySelector(this.parentSelector).innerHTML =
        "<p>Your cart is currently empty. Have a look around and see if you can find anything you like!</p>";
    }
  }
}

function assignRemoveItemButtons(cartItems) {
  let removeButtons = document.getElementsByClassName("remove");
  for (const element of removeButtons) {
    let button = element;
    let product_id = button.children[0].getAttribute("data-id");

    // Remove items function
    button.addEventListener("click", function () {
      if (cartItems != null) {
        const filtered = cartItems.filter((item) => item.Id !== product_id);
        localStorage.setItem("so-cart", JSON.stringify(filtered));
      } else {
        console.log("empty");
      }
      location.reload();
    });
  }
}
