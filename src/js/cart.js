import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems){
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".products").textContent = "There are no items in the cart.";
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

function getTotal (){
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const prices = [];
      cartItems.map((item) => addToArray(item, prices));
      console.log(prices);
      let sum = 0;
      for (let i = 0; i < prices.length; i++){
        sum  += prices[i];
      }
      console.log(sum);
      document.querySelector(".cart-total").textContent = `Total: $${sum}`;
  } else {
    document.querySelector(".cart-footer").style.display = "none";
    console.log("success");
  }
}

function addToArray(item, array){
    array.push(item.FinalPrice);
}

getTotal();