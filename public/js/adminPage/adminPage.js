import { setHeader } from "../../utils/setHeader.js";
import { logout } from "../../utils/logout.js";

//set headers
setHeader();

// logout function
const logoutNav = document.querySelector("#logout-nav");
logoutNav.addEventListener("click", logout);

// go to details item page
const detailButton = document.querySelector("#detailButton");
detailButton.addEventListener("click", function (event) {
  const parentDivOfDetailButton = detailButton.parentElement;
  const tableRow = parentDivOfDetailButton.parentElement;
  const itemId = tableRow.querySelector(".itemId").innerHTML;
  location.href = `/detailItemPage/${itemId}`;
});
