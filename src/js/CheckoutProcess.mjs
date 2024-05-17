import { getLocalStorage } from "./utils.mjs";
import { getTotal, getTotalNumberItems } from "./ShoppingCart.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const numItems = document.querySelector("#num-items");
      numItems.innerHTML = `${getTotalNumberItems()} items`;

      const cartTotal = document.querySelector("#cartTotal");
      this.itemTotal = getTotal();
      cartTotal.innerHTML = `${this.itemTotal.toFixed(2)} $`;
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them along with the cart total to figure out the order total
      let numberItems = getTotalNumberItems();  
      if (numberItems >= 1){
        this.shipping = 10;
        this.shipping += (numberItems * 2) - 2;
      }

      this.tax = this.itemTotal * 0.06;
      this.orderTotal =  this.itemTotal + this.shipping + this.tax;

      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const shippingEle = document.querySelector("#shipping"); 
      shippingEle.innerHTML = `${this.shipping} $`;
      
      const taxEle = document.querySelector("#tax");
      taxEle.innerHTML = `${this.tax.toFixed(2)} $`;  

      const orderTotalEle = document.querySelector("#orderTotal");
      orderTotalEle.innerHTML = `${this.orderTotal.toFixed(2)} $`;
    }
  }