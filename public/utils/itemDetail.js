const detailButton = document.querySelector("#detailButton");

detailButton.addEventListener("click", function (event) {
  event.preventDefault();

  const parentDivOfDetailButton = detailButton.parentElement;
  console.log(parentDivOfDetailButton);
});
