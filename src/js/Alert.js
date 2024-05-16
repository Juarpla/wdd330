import alerts from "../public/json/alerts.json";

class Alert {
  render() {
    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    alerts.forEach((alert) => {
      const alertMessage = document.createElement("p");
      alertMessage.textContent = alert.message;
      alertMessage.style.backgroundColor = alert.background;
      alertMessage.style.color = alert.color;
      alertMessage.style.padding = "0.5rem";
      alertMessage.style.fontSize = "2rem";
      alertMessage.style.textAlign = "center";
      alertList.appendChild(alertMessage);
    });

    const mainElement = document.querySelector("main");
    mainElement.prepend(alertList);
  }
}

export default Alert;
