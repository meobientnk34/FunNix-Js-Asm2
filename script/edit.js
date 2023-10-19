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

//Lay du lieu pet, breed
let petArr = JSON.parse(localStorage.getItem("petArrString"));
let breedArr = JSON.parse(localStorage.getItem("breedArrString"));

//LIST FUNCTION
//..1.Xét điều kiện input edit
const validateEdit = function (data) {
  if (!fullData(data)) {
    alert("Please enter full data!");
  } else if (!(data.age >= 1 && data.age <= 15)) {
    alert("Age must be between 1 and 15!");
  } else if (!(data.weight >= 1 && data.weight <= 15)) {
    alert("Weight must be between 1 and 15!");
  } else if (!(data.length >= 1 && data.length <= 100)) {
    alert("Length must be between 1 and 15!");
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
  } else {
    return true;
  }
};

//..2.Render table petArr edit
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
    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
      petArr[i].id
    }')">Edit</button></td>
    `;
    tableBodyEl.appendChild(row);
  }
};
renderTableData(petArr);

//..3.Render breed form Edit
renderBreed(breedArr); //render all breed
//..Render by type (dog or cat)
typeInput.onchange = function (e) {
  // console.log("e.target.value: ", e.target.value);
  let breedArrRender;
  if (e.target.value === "Dog") {
    breedArrRender = breedArr.filter((item) => item.type === "Dog");
  }
  if (e.target.value === "Cat") {
    breedArrRender = breedArr.filter((item) => item.type === "Cat");
  }
  renderBreed(breedArrRender);
};

//..4.Save pet edit (click submit)
const savePetEdit = function (data, petId) {
  const index = petArr.findIndex((item) => item.id === petId);
  petArr[index] = data;
  console.log("petArr: ", petArr);
  localStorage.setItem("petArrString", JSON.stringify(petArr));
};

//LIST EVENT CLICK
//..1.click Edit (hiển thị form theo petId)
const startEditPet = function (petId) {
  editContainer.classList.remove("hide");
  const petEdit = petArr.find((item) => item.id === petId);
  idInput.value = petEdit.id;
  nameInput.value = petEdit.name;
  ageInput.value = petEdit.age;
  typeInput.value = petEdit.type;
  breedInput.value = petEdit.breed;
  lengthInput.value = petEdit.length;
  weightInput.value = petEdit.weight;
  vaccinatedInput.checked = petEdit.vaccinated;
  dewormedInput.checked = petEdit.dewormed;
  sterilizedInput.checked = petEdit.sterilized;
};

//..2.Click Submit
submitBtn.addEventListener("click", function () {
  //....2.1.Lấy dữ liệu
  const data = {
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //....2.2.Xử lý khi thỏa điều kiện
  const validate = validateEdit(data);
  if (validate) {
    savePetEdit(data, data.id); //thêm thú cưng vào danh sách
    localStorage.setItem("petArrString", JSON.stringify(petArr)); //Lưu dữ liệu vào localStorage
    renderTableData(petArr); //Gọi hàm render danh sách thú cưng
    alert("Edit succeed!");
    editContainer.classList.add("hide"); //Đóng form edit
  }
});
