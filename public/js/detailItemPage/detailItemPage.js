import { logout } from "../../utils/logout.js";

// logout function
const logoutNav = document.querySelector("#logout-nav");
if (logoutNav) {
  logoutNav.addEventListener("click", logout);
}

let itemId = document.location.pathname.split("/")[2];
let seenItems = [];
let oldSeenItems = sessionStorage.getItem("seenItems");

if (!oldSeenItems) {
  seenItems.push(itemId);
} else {
  seenItems = oldSeenItems;
  seenItems.push(itemId);
}
sessionStorage.setItem("seenItems", seenItems);
