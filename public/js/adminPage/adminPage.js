import { setHeader } from "../../utils/setHeader.js";
import { logout } from "../../utils/logout.js";

//set headers
setHeader();

// logout function
const logoutNav = document.querySelector("#logout-nav");
logoutNav.addEventListener("click", logout);

//detail button handle
const detailButton = document.querySelector("#detailButton");
detailButton.addEventListener("click", async function (event) {
  event.preventDefault();

  const parentDivOfDetailButton = detailButton.parentElement;
  const tableRow = parentDivOfDetailButton.parentElement;
  const itemId = tableRow.querySelector(".itemId").innerHTML;

  const response = await axios.get(`/getDetailItem/${itemId}`);
  if (response.data.success) {
    alert("adminPage", response.data.success);
  } else {
    alert("adminPage", response.data.message);
  }
});
