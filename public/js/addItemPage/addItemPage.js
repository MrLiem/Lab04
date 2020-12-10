import { logout } from "../../utils/logout.js";

// logout function
const logoutNav = document.querySelector("#logout-nav");
logoutNav.addEventListener("click", logout);

const createItemButton = document.querySelector("#addItem");
createItemButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Handle user can not click multiple times
  const addItemButton = document.querySelector("#addItem");
  addItemButton.classList.add("disabled");

  let id = document.querySelector("#id").value;
  let title = document.querySelector("#title").value;
  let summary = document.querySelector("#summary").value;
  let price = document.querySelector("#price").value;
  let number = document.querySelector("#number").value;
  let brand = document.querySelector("#brand").value;

  let item = {
    id,
    title,
    brand,
    summary,
    price,
    number,
  };

  const addItem = async () => {
    if (!id || !title || !summary || !price || !number || !brand) {
      return alert("Please type all the field!!!");
    }
    if (price < 0 || price > 10000000) {
      return alert("Please type price between 0  and 10000000!!!");
    }

    const response = await axios.post("/items/addItem", item);
    if (response.data.success) {
      // send image
      let formData = new FormData();
      let images = document.querySelector("#images");
      if (images.files[0] === undefined) {
        return alert("Please add an image!!!");
      }
      formData.append("image", images.files[0]);
      const response2 = await axios.post("/items/uploadNewImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response2.data.success) {
        alert("upload image Ok");
      } else {
        alert(response2.data.message);
      }
      addItemButton.classList.remove("disabled");
      location.href = "/adminPage";
    } else {
      alert(response.data.message);
      addItemButton.classList.remove("disabled");
    }
  };

  addItem();
});
