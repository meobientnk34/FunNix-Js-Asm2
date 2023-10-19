"use strict";

const submitBtn = document.getElementById("submit-btn");
const showHealthyPetBtn = document.getElementById("healthy-btn");
const calculateBMIBtn = document.getElementById("bmi-btn");
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
const tableBodyEl = document.getElementById("tbody");

//Khai báo dữ liệu danh sách thú cưng
let petArr = JSON.parse(getFromStorage("petArrString"))
  ? JSON.parse(getFromStorage("petArrString"))
  : [];

let healthyPet = [];

//LIST FUNCTION
//..1.Điều kiện tổng hợp
const validateData = function (data) {
  if (!fullData(data)) {
    alert("Please enter full data!");
  } else if (!checkId(data.id, petArr)) {
    alert("ID must be unique!");
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
//..2.Render petArr
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
    <td class="calcBMI${petArr[i].id}">?</td>
    <td>${formatTime(petArr[i].date)}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  }
};
renderTableData(petArr);
//..3.Delete pet
const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    console.log("petArr: ", petArr);
    petArr = petArr.filter((item) => item.id !== petId);
    localStorage.setItem("petArrString", JSON.stringify(petArr));
    renderTableData(petArr);
  }
};
//..4.Tính BMI theo pet (Dog or Cat)
const calculateBMIById = function (pet) {
  return pet.type === "Dog"
    ? (pet.weight * 703) / pet.length ** 2
    : (pet.weight * 886) / pet.length ** 2;
};

//DANH SÁCH CÁC EVENT CLICK
//..1.Click Submit
submitBtn.addEventListener("click", function () {
  //get data input
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
  //....Xử lý khi thỏa điều kiện
  const validate = validateData(data);
  if (validate) {
    petArr.push(data); //thêm thú cưng vào danh sách
    saveToStorage("petArrString", JSON.stringify(petArr)); //Lưu dữ liệu vào localStorage
    clearInput(); //gọi xóa dữ liệu input
    renderTableData(petArr); //Gọi hàm render danh sách thú cưng
  }
});

//..2.Click show healthy pet, show all
let healthyCheck = true;
//....click show healthypet
showHealthyPetBtn.addEventListener("click", function () {
  if (healthyCheck) {
    healthyPet = petArr.filter(
      (item) => item.vaccinated && item.dewormed && item.sterilized
    );
    renderTableData(healthyPet);
    showHealthyPetBtn.textContent = "Show All Pet";
    healthyCheck = false;
  }
  //....click show all pet
  else {
    renderTableData(petArr);
    showHealthyPetBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

//..3.Click calculate BMI
calculateBMIBtn.addEventListener("click", function () {
  if (healthyCheck) {
    for (let i = 0; i < petArr.length; i++) {
      document.querySelector(`.calcBMI${petArr[i].id}`).textContent =
        calculateBMIById(petArr[i]).toFixed(2);
    }
  } else {
    for (let i = 0; i < healthyPet.length; i++) {
      document.querySelector(`.calcBMI${healthyPet[i].id}`).textContent =
        calculateBMIById(healthyPet[i]).toFixed(2);
    }
  }
});

//HIỂN THỊ BREED
let breedArr = JSON.parse(getFromStorage("breedArrString"));
renderBreed(breedArr);
//event onchange type
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
