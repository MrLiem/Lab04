import { validateEmail } from "../../utils/validateEmail.js";

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
    "/users/register",
    { email, password },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (response.data.success) {
    alert("Register success full!");
    location.href = "/loginPage";
  } else {
    alert(response.data.message);
  }
});
