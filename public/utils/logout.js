const logout = async (event) => {
  event.preventDefault();
  const token = JSON.parse(localStorage.getItem("x_auth"));
  const response = await axios.post(
    "api/users/logout",
    { token },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (response.data.success) {
    alert("Logout successfull!!!");
    localStorage.removeItem("x_auth");
    location.href = "/";
  } else {
    alert(response.data.error);
  }
};

export { logout };
