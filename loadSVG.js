"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  loadSVG();
}

function loadSVG() {
  console.log("load the svg");

  fetch("img/forgrund.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#forgrund")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
  fetch("img/baggrund.svg")
    .then(response => response.text())
    .then(mySVG => {
      document
        .querySelector("#baggrund")
        .insertAdjacentHTML("afterbegin", mySVG);
    });
}
