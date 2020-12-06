const logout = async (event) => {
  console.log("go to logout");
  event.preventDefault();
  const token = JSON.parse(localStorage.getItem("x_auth"));
  const response = await axios.get("api/users/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  if (response.data.success) {
    alert("Logout successfull!!!");
    localStorage.removeItem("x_auth");
    location.href = "/";
  } else {
    alert(response.data.error);
  }
};

export { logout };
