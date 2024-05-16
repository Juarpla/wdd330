import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").innerHTML = this.category;
    const sortSelect = document.getElementById("sort-select");

     sortSelect.addEventListener("change", (event) =>
      this.handleSortChange(event, list)
    );
  }

  handleSortChange(event, list) {
    const sortOption = event.target.value;
    if (sortOption === "name") {
      list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortOption === "price") {
      list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}
