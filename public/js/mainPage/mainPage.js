import { setHeader } from "../../utils/setHeader.js";
setHeader();

import { logout } from "../../utils/logout.js";
// logout function
const logoutNav = document.querySelector("#logout-nav");
logoutNav.addEventListener("click", logout);

const detailButton = document.querySelector("#detailButton");

detailButton.addEventListener("click", function (event) {
  event.preventDefault();

  const parentDivOfDetailButton = detailButton.parentElement;
  console.log(parentDivOfDetailButton);
});
