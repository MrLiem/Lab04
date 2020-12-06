const setHeader = () => {
  const adminNav = document.querySelector("#admin-nav");
  const loginNav = document.querySelector("#login-nav");
  const logoutNav = document.querySelector("#logout-nav");
  const registerNav = document.querySelector("#register-nav");

  let x_auth = localStorage.getItem("x_auth");
  if (!x_auth) {
    adminNav.style.display = "none";
    logoutNav.style.display = "none";
    const url = location.pathname;
    if (
      url === "/admin" ||
      url === "/addItemPage" ||
      url === "/updateItemPage"
    ) {
      location.href = "/";
    }
  } else {
    loginNav.style.display = "none";
    registerNav.style.display = "none";
  }
};

export { setHeader };
