import { setHeader } from "../../utils/setHeader.js";
import { logout } from "../../utils/logout.js";

//set headers
setHeader();

// logout function
const logoutNav = document.querySelector("#logout-nav");
logoutNav.addEventListener("click", logout);
