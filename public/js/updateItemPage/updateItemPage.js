import { logout } from "../../utils/logout.js";
// logout function
const logoutNav = document.querySelector("#logout-nav");
logoutNav.addEventListener("click", logout);

// DOM to input elements
let title = document.querySelector("#title");
let brand = document.querySelector("#brand");
let summary = document.querySelector("#summary");
let price = document.querySelector("#price");
let number = document.querySelector("#number");

const saveItemButton = document.querySelector("#saveItemButton");
saveItemButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Handle user can not click multiple times
  const addItemButton = document.querySelector("#addItem");
  saveItemButton.classList.add("disabled");

  // Get ItemId and userId from localStorage and Cookie
  const itemId = JSON.parse(localStorage.getItem("itemId"));
  let updatedItem = {
    id: itemId,
    title: title.value,
    brand: brand.value,
    summary: summary.value,
    price: price.value,
    number: number.value,
  };

  const saveUpdatedItem = async () => {
    if (!title || !summary || !price || !number || !brand) {
      return alert("Please type all the field!!!");
    }
    const response = await axios.put("/items/saveUpdatedItem", updatedItem);
    if (response.data.success) {
      // Send image after successfully send json data
      let formData = new FormData();
      let images = document.querySelector("#images");
      formData.append("image", images.files[0]);
      const response2 = await axios.put("/items/uploadUpdatedImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response2.data.success) {
        alert("upload image Ok");
      } else {
        alert(response2.data.message);
      }
      saveItemButton.classList.remove("disabled");
      location.href = "/adminPage";
    } else {
      alert(response.data.message);
      saveItemButton.classList.remove("disabled");
    }
  };

  saveUpdatedItem();
});
