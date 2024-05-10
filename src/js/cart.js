import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const listing = new ShoppingCart("so-cart", ".product-list");

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

loadHeaderFooter();

listing.renderCartContents();

getTotal();
