import { getTotalNumberItems } from "./ShoppingCart.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  const inStorage = getLocalStorage(key);
  const dataArray = inStorage === null ? [] : inStorage;
  let duplicateArray = [];
  const duplicateTent = dataArray.map((tent) => {
    if (data.Id == tent.Id) {
      tent.FinalPrice += tent.ListPrice;
      duplicateArray.push(tent);
    } else {
      duplicateArray.push(tent);
    }
  });
  const checkTentExist = duplicateArray.find((exist) => exist.Id === data.Id);
  if (!checkTentExist) {
    duplicateArray.push(data);
  }

  localStorage.setItem(key, JSON.stringify(duplicateArray));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const renderedList = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, renderedList.join(""));
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export const loadTemplate = async (path) => {
  const res = await fetch(path);
  const template = await res.text();
  return template;
};

export const loadHeaderFooter = async () => {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

// Check to see if the header/footer elements exist. If so, it clears and loads them, else it just loads them. 
// This allows us to dynamically update the cart superscript when adding an item.
  if (headerElement) {
    headerElement.innerHTML = "";
    renderWithTemplate(headerTemplate, headerElement);
  }
  else {
    renderWithTemplate(headerTemplate, headerElement);
  }

  if (footerElement) {
    footerElement.innerHTML = "";
    renderWithTemplate(footerTemplate, footerElement);
  }
  else {
    renderWithTemplate(footerTemplate, footerElement);
  }

// Display the number of items in the cart as a superscript above the cart icon.
  document.querySelector("#cart-count").innerHTML = `${getTotalNumberItems()}`;
};

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function getDiscount(product) {
  if (product.SuggestedRetailPrice > product.ListPrice) {
    return `$${product.SuggestedRetailPrice}`;
  }
}

export function getDiscountPercentage(product) {
  let price = product.SuggestedRetailPrice;
  let priceDiscounted = product.ListPrice;
  if ( price > priceDiscounted) {
    return Math.round((100 * (price - priceDiscounted)) / price);
  } 
}