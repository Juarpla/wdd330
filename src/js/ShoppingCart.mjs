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
  <section class="buttonBox" data-id="${item.Id}">
    <button type="button" class="remove"><span>X</span></button>
    <button type="button" class="more-less"><span>-</span></button>
    <button type="button" class="more-less"><span>+</span></button>
  </section>
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
      assignItemButtons(cartItems);
      document.querySelector(".cart-total").textContent = `Total: $${getTotal().toFixed(2)}`;      
    } else {
      document.querySelector(".cart-footer").style.display = "none";
      document.querySelector(this.parentSelector).innerHTML =
        "<p>Your cart is currently empty. Have a look around and see if you can find anything you like!</p>";
    }
  }
}

function assignItemButtons(cartItems) {
  let boxes = document.getElementsByClassName("buttonBox");
  for (const buttons of boxes) {
    let product_id = buttons.getAttribute("data-id");

    // Remove items function
    buttons.children[0].addEventListener("click", function () {
      if (cartItems != null) {
        const filtered = cartItems.filter((item) => item.Id !== product_id);
        localStorage.setItem("so-cart", JSON.stringify(filtered));
        location.reload();
      } else {
        console.log("empty");
      }
    });

    // Decrease quantity by 1
    buttons.children[1].addEventListener("click", function () {
      if (cartItems != null) {
        let item = cartItems.find((item) => item.Id === product_id);
        if (item.FinalPrice > item.ListPrice) {
          item.FinalPrice -= item.ListPrice;
          localStorage.setItem("so-cart", JSON.stringify(cartItems));
          location.reload();
        } 
      } else {
        console.log("empty");
      }
    });

    // Increase quantity by 1 
    buttons.children[2].addEventListener("click", function () {
      if (cartItems != null) {
        let item = cartItems.find((item) => item.Id === product_id);
        item.FinalPrice += item.ListPrice;
        localStorage.setItem("so-cart", JSON.stringify(cartItems));
        location.reload();
      } else {
        console.log("empty");
      }
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
  if (cartItems != null) {
    let numberItems = 0;
    for (let item of cartItems) {
      numberItems += item.FinalPrice / item.ListPrice;
    }
    return numberItems;
  } else {
    return 0;
  }
}