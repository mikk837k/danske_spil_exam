"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  loadSVG();
}

function loadSVG() {
  console.log("load the svg");

  fetch("../img/forgrund.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#forgrund")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
  fetch("../img/baggrund.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#baggrund")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
  fetch("../img/school_of_fish.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#school_of_fish")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
  fetch("../img/hearth.svg")
    .then(response => response.text())
    .then(mySVG => {
      const heartElement = document.querySelectorAll(".heart");
      heartElement.forEach(element => {
        element.insertAdjacentHTML("afterbegin", mySVG);
      });
    });
}
