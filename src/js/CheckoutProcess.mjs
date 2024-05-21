import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import { getTotal, getTotalNumberItems } from "./ShoppingCart.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.ListPrice,
      name: item.Name,
      quantity: Math.round(item.FinalPrice / item.ListPrice),
    };
  });
  return simplifiedItems;
}

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

    async checkout() {
      const formElement = document.forms["checkout"];
  
      const json = formDataToJSON(formElement);
      
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      try {
        const res = await services.checkout(json);
        console.log(res);
        localStorage.clear();
        location.assign("/checkout/success.html");
      } catch (err) {
        removeAllAlerts();
        for (let message in err.message) {
          alertMessage(err.message[message]);
        }
        console.log(err);
      }
    }
  }