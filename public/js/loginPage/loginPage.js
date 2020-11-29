import { validateEmail } from "../../utils/validateEmail.js";
import { setHeader } from "../../utils/setHeader.js";
setHeader();

const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();
  let email = document.querySelector("#loginEmail").value;
  let password = document.querySelector("#loginPass").value;

  if (!email || !password) {
    return alert("Please type all the field!!!");
  }

  if (!validateEmail(email)) {
    return alert("You have entered an invalid email address!");
  }

  const response = await axios.post(
    "/api/users/login",
    { email, password },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (response.data.loginSuccess) {
    alert("Login successfull!");
    await localStorage.setItem("x_auth", JSON.stringify(response.data.x_auth));
    location.href = "/";
  } else {
    alert(response.data.message);
  }
});
