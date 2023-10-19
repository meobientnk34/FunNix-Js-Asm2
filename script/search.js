"use strict";
//Selecting element
const tableBodyEl = document.getElementById("tbody");
const editContainer = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");

//Lấy dữ liệu petArr
let petArr = JSON.parse(getFromStorage("petArrString"));
let petArrSearch = [];
//Render all breed (input)
let breedArr = JSON.parse(getFromStorage("breedArrString"));
renderBreed(breedArr);

//Search by Id
const searchPetById = (data) => {
  petArrSearch = petArr.filter(
    (item) => item.id.includes(data.id) && item.name.includes(data.name)
  );
  if (data.type !== "Select Type") {
    petArrSearch = petArrSearch.filter((item) => item.type === data.type);
  }
  if (data.breed !== "Select Breed") {
    petArrSearch = petArrSearch.filter((item) => item.breed === data.breed);
  }
  if (data.vaccinated) {
    petArrSearch = petArrSearch.filter((item) => item.vaccinated === true);
  }
  if (data.dewormed) {
    petArrSearch = petArrSearch.filter((item) => item.dewormed === true);
  }
  if (data.sterilized) {
    petArrSearch = petArrSearch.filter((item) => item.sterilized === true);
  }
  console.log("petArr filterId: ", petArrSearch);
};
const renderTableData = function (petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope='row'>${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
    <td><i class= "${
      petArr[i].vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }" </i></td>
    <td><i class= "${
      petArr[i].dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }" </i></td>
    <td><i class= "${
      petArr[i].sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }" </i></td>
    
    <td>${formatTime(petArr[i].date)}</td>
 
    `;
    tableBodyEl.appendChild(row);
  }
};
//Click Find
findBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  console.log("Find succeed!");
  searchPetById(data);
  renderTableData(petArrSearch);
});
