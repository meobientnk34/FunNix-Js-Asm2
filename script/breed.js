"use strict";
const nameInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

//lay du lieu tu localStorage
let breedArr = JSON.parse(getFromStorage("breedArrString"))
  ? JSON.parse(getFromStorage("breedArrString"))
  : [];

//Render breedArr (table)
const renderBreedTable = function () {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((value, index) => {
    const option = document.createElement("tr");
    option.innerHTML = `
<td>${index + 1}</td>
<td>${value.name}</td>
<td>${value.type}</td>
<td><button type="button" class="btn btn-danger" onclick="deleteBreed('${index}')">Delete</button></td>
  `;
    tableBodyEl.appendChild(option);
  });
};
renderBreedTable(breedArr);

//Clear input Breed
const clearInputBreed = function () {
  nameInput.value = "";
  typeInput.selectedIndex = 0;
};

//Delete breed
const deleteBreed = (indexBreed) => {
  if (confirm("Are you sure?")) {
    breedArr = breedArr.filter((item, index) => index != indexBreed);
    saveToStorage("breedArrString", JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }
};

//EVENT CLICK SUBMIT
submitBtn.addEventListener("click", function () {
  const data = {
    name: nameInput.value.trim(),
    type: typeInput.value,
  };
  //....Xử lý khi thỏa điều kiện
  if (data.name === "") {
    alert("Please enter name Breed!");
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
  } else {
    breedArr.push(data);
    localStorage.setItem("breedArrString", JSON.stringify(breedArr)); //Lưu dữ liệu vào localStorage
    renderBreedTable(breedArr);
    clearInputBreed();
  }
});
