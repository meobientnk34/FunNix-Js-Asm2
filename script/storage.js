"use strict";

//Selecting element
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
// ..Click sidebar
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

//..luu data vao LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//..lay data tu LocalStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//..Không có trường nào bị nhập thiếu dữ liệu
const fullData = function (data) {
  for (let key in data) {
    if (data[key] === null || data[key] === undefined || data[key] === "") {
      return false;
      break;
    }
  }
  return true;
};

//..Giá trị ID không được trùng với các thú cưng còn lại.
const checkId = function (id, petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (id === petArr[i].id) {
      return false; // ID bị trùng
      break;
    }
  }
  return true; // ID không bị trùng
};

//..Clear input form (home)
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.selectedIndex = 0;
  breedInput.selectedIndex = 0;
  lengthInput.value = "";
  weightInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//..Xử lý hiện thị ngày tháng năm
function formatTime(timeString) {
  const date = new Date(timeString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear() % 100;
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

//Render breed Input
const renderBreed = (arr) => {
  breedInput.innerHTML = "<option>Select Breed</option>";
  arr.forEach((value, index) => {
    const option = document.createElement("option");
    option.innerHTML = `
  ${value.name}
  `;
    breedInput.appendChild(option);
  });
};
