"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  loadSVG();
}

function loadSVG() {
  console.log("load the svg");

  fetch("forgrund.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#forgrund")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
  fetch("baggrund.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#baggrund")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
  fetch("school_of_fish.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#school_of_fish")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
  // fetch("heart.svg")
  //   .then(response => response.text())
  //   .then(mySVG => {
  //     const heartElement = document.querySelectorAll(".heart");
  //     heartElement.forEach(element => {
  //       element.insertAdjacentHTML("afterbegin", mySVG);
  //     });
  //   });
}
