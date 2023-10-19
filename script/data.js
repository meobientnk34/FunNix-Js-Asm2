"use strict";
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const inputFileEl = document.getElementById("input-file");

function exportpetArr() {
  //  let petArrJson = JSON.stringify(getFromStorage("petArrString"), null, 2);
  let petArrJson = getFromStorage("petArrString");
  let blob = new Blob([petArrJson], {
    type: "application/json",
  });
  saveAs(blob, "petArrJson.json");
}

let fileImport = "";

function handleChange(event) {
  let myFile = event.target.files[0];
  let reader = new FileReader();
  reader.addEventListener("load", function (e) {
    fileImport = e.target.result;
  });
  reader.readAsBinaryString(myFile);
}

function handleClick() {
  let importArr = JSON.parse(fileImport);
  saveToStorage("petArrString", JSON.stringify(importArr));
  alert("import succeed!");
  console.log("petArr: ", importArr);
}
inputFileEl.addEventListener("change", handleChange);
importBtn.addEventListener("click", handleClick);

//Click export
exportBtn.addEventListener("click", exportpetArr);
