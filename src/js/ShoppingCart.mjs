import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <button type="button" class="remove"><span data-id="${item.Id}">X</span></button>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.FinalPrice / item.ListPrice}</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
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
      document.querySelector(".cart-total").textContent = `Total: $${getTotal().toFixed(2)}`;      
    } else {
      document.querySelector(".cart-footer").style.display = "none";
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

export function getTotal() {
  const cartItems = getLocalStorage("so-cart");
    let total = 0;
    cartItems.map((item) => total += item.FinalPrice);
    return total;
}

export function getTotalNumberItems() {
  const cartItems = getLocalStorage("so-cart");
  let numberItems = 0;
  for (let item of cartItems) {
    numberItems += item.FinalPrice / item.ListPrice;
  }
  return numberItems;
}