import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const listing = new ShoppingCart("so-cart", ".product-list");

loadHeaderFooter();

listing.renderCartContents();
