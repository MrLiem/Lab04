import { logout } from "../../utils/logout.js";

/*---- Set logout function*/
const logoutNav = document.querySelector("#logout-nav");
if (logoutNav) {
  logoutNav.addEventListener("click", logout);
}

/*--------------------------*/

/*---------Go to details item page----------*/
const detailButtons = document.querySelectorAll("#detailButton");
console.log(detailButtons);
for (let i = 0; i < detailButtons.length; i++) {
  detailButtons[i].addEventListener("click", function () {
    const parentDivOfDetailButton = detailButtons[i].parentElement;
    const tableRow = parentDivOfDetailButton.parentElement;
    const itemId = tableRow.querySelector(".itemId").innerHTML;
    location.href = `/detailItemPage/${itemId}`;
  });
}
/*--------------------------*/
