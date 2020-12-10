import { logout } from "../../utils/logout.js";

// logout function
const logoutNav = document.querySelector("#logout-nav");
logoutNav.addEventListener("click", logout);

/*---- Go to Detail Item Page with itemId----*/
const detailButtons = document.querySelectorAll("#detailButton");
for (let i = 0; i < detailButtons.length; i++) {
  detailButtons[i].addEventListener("click", function () {
    const parentDivOfDetailButton = detailButtons[i].parentElement;
    const tableRow = parentDivOfDetailButton.parentElement;
    const itemId = tableRow.querySelector(".itemId").innerHTML;
    location.href = `/detailItemPage/${itemId}`;
  });
}
/*--------------------------------------------*/

/*---------Go to Update Item Page-------------*/
const editButtons = document.querySelectorAll("#editButton");
for (let i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener("click", function () {
    const parentDivOfEditButton = editButtons[i].parentElement;
    const tableRow = parentDivOfEditButton.parentElement;
    const itemId = tableRow.querySelector(".itemId").innerHTML;
    localStorage.setItem("itemId", JSON.stringify(itemId));
    location.href = `/updateItemPage/${itemId}`;
  });
}
/*---------------------------------------------*/

/*--------------Delete Item--------------------*/
const deleteButtons = document.querySelectorAll("#deleteButton");
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", () => {
    const operateDiv = deleteButtons[i].parentElement;
    const tableRow = operateDiv.parentElement;
    const itemId = tableRow.querySelector(".itemId").innerHTML;
    const deleteItem = async () => {
      const response = await axios.delete(
        `/items/deleteItem/${itemId}`,
        { itemId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        alert("Delete Ok");
        location.reload();
      } else {
        alert(response.data.message);
      }
    };
    deleteItem();
  });
}

/*---------------------------------------------*/
