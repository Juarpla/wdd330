import { alertMessage } from "./utils.mjs";

//const today = Date.now();

let latestVisit = Number(window.localStorage.getItem("latestVisit")) || 0;

if (latestVisit === 0) {
    alertMessage(`Create an account and get entered to win a free backpack!`);
}

localStorage.setItem("latestVisit", 1);