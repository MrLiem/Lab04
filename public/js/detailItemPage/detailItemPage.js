import { logout } from "../../utils/logout.js";

// logout function
const logoutNav = document.querySelector("#logout-nav");
if (logoutNav) {
  logoutNav.addEventListener("click", logout);
}

// Save to sessionStorage seen itemId if someone not authenticated gets detailItemPage
let itemId = document.location.pathname.split("/")[2];
let oldSeenItems = JSON.parse(sessionStorage.getItem("seenItems"));
let newSeenItems = [];

if (!oldSeenItems) {
  newSeenItems = [itemId];
} else if (oldSeenItems.includes(itemId)) {
  newSeenItems = oldSeenItems;
} else {
  newSeenItems = [...oldSeenItems, itemId];
}

sessionStorage.setItem("seenItems", JSON.stringify(newSeenItems));
