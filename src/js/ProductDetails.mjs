import { loadHeaderFooter, setLocalStorage, alertMessage, getDiscount, getDiscountPercentage } from "./utils.mjs";
import { animateCartIcon } from "./animations";

const productDetailsTemplate = (product) => `
    <section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}"/>
        <p class="discount-flag discount-details">-${getDiscountPercentage(product)}%</p>
        <p class="product-card__price">$${product.FinalPrice} | <span class="discount-price">${getDiscount(product)}</span></p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>
  `;

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage("so-cart", this.product);
    animateCartIcon();
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);

// Reload the header/footer to dynamically update the cart superscript.
    loadHeaderFooter();
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );
  }
}
