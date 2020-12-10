/*Handle Logout function*/
const logout = async (event) => {
  const response = await axios.get("/users/logout");
  if (response.data.success) {
    alert("Logout successfull!!!");
    // Delete Cookie
    document.cookie = "x_auth=;";
    // Return to mainPage
    location.href = "/";
  } else {
    alert(response.data.error);
  }
};

export { logout };
