"use strict";

window.addEventListener("DOMContentLoaded", init);

import myJsonImport from "/static/garbage.json";

// console.log(myJsonImport);

let action = "";
let myJSON;
let playerHealth = 3;
let hueRotation = 0;
let collectedTrash = 0;
let isGameOver = false;
const gameContainer = document.querySelector("#game_container");

function init() {
  console.log("init kørt");
  // console.log(myJsonImport);
  document.querySelector("body").addEventListener("mousedown", windowClicked);

  // HUSK AT SLETTE NEDENSTÅENDE
  // getJSON();
  // createElements();
  createElements();
}

// function getJSON() {
//   fetch("garbage.json")
//     .then(jsonData => jsonData.json())
//     .then(jsonData => {
//       myJSON = jsonData;
//       createElements();
//     });
// }

function createElements() {
  myJsonImport.forEach(element => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("element");
    newDiv.dataset.status = "trash";
    newDiv.dataset.action = "remove";
    newDiv.style.backgroundImage = `url("${element}.svg")`;
    gameContainer.appendChild(newDiv);
  });
  placeElements();
}

function windowClicked(e) {
  console.log("windowclicked kørt");
  action = e.target.dataset.action;

  if (action === "remove") {
    console.log("if statement kørt");
    removeElement(e);
    incrementCounter();
  }
  if (action === "start") {
    showRules();
    // startGame();
    // changeSVGbgColor();
  }

  if (action === "mobil_start") {
    mobilFormat();
    showRules();
  }

  if (action === "luk_spil") {
    lukMobilFormat();
  }

  console.log(action);
}

function placeElements() {
  const elementArray = document.querySelectorAll("[data-status=trash]");

  console.log(gameContainer.clientWidth);

  // place elements randomly on X axis using transform translate
  for (let counter = 0; counter < elementArray.length; counter++) {
    let stringifyNumb = getCoordinateWithinBox(
      gameContainer,
      elementArray[counter]
    ).toString();

    elementArray[
      counter
    ].style.transform = `translate(${stringifyNumb}px, -200px)`;
  }
}

function getCoordinateWithinBox(container, elem) {
  return Math.floor(Math.random() * (container.clientWidth - elem.clientWidth));
}

const container = document.querySelector(".container");
const startknap_mobil = document.querySelector(".mobil_start");
const genstart_knap = document.querySelector(".genstart");

function mobilFormat() {
  console.log("mobilFormat");
  container.style.height = "auto";

  activateElement(container);

  document.querySelector("body").style.overflow = "hidden";
  deactivateElement(startknap_mobil);
}
function lukMobilFormat() {
  console.log("lukMobilFormat");

  deactivateElement(container);
  document.querySelector("body").style.overflow = "initial";
  activateElement(startknap_mobil);
  deactivateElement(genstart_knap);
}
function showRules() {
  console.log("showRules");
  document.querySelector(".spil_forside").style.opacity = "0";
  document.querySelector(".spil_forside").style.pointerEvents = "none";

  document.querySelector(".start").style.opacity = "0";
  document.querySelector(".start").style.pointerEvents = "none";

  setTimeout(startGame, 4000);
}

function startGame() {
  console.log("startGame kørt");
  document.querySelector(".regler").style.opacity = "0";
  document.querySelector(".regler").style.pointerEvents = "none";

  // Can this be done by using forEach? note the delay!
  playerHealthStatus();
  checkValidity();
}

function checkValidity() {
  const elementArray = document.querySelectorAll("[data-status=trash]");
  for (let counter = 0; counter < elementArray.length; counter++) {
    setTimeout(() => {
      checkHealth(elementArray[counter], counter);
    }, 1000 * counter);
  }
}
function checkHealth(element, counter) {
  // console.log(playerHealth);
  if (!isGameOver && playerHealth === 0) {
    isGameOver = true;
    gameOver();
  } else {
    addAnimation(element, counter);
  }
}

function addAnimation(element, counter) {
  // console.log(element);
  let Xpos = element.getBoundingClientRect().x;
  let gameContainerXpos = gameContainer.getBoundingClientRect().x;

  if (counter <= 5) {
    // element.classList.add("floatDown");
    element.style.transform = `translate(${Xpos - gameContainerXpos}px, 580px)`;
    element.classList.add("float_speed_1");
  }
  if (counter > 5 && counter <= 10) {
    element.style.transform = `translate(${Xpos - gameContainerXpos}px, 580px)`;
    element.classList.add("float_speed_2");
  }
  if (counter >= 11 && counter <= 15) {
    element.style.transform = `translate(${Xpos - gameContainerXpos}px, 580px)`;
    element.classList.add("float_speed_3");
  }
  if (counter >= 16 && counter <= 31) {
    element.style.transform = `translate(${Xpos - gameContainerXpos}px, 580px)`;
    element.classList.add("float_speed_4");
  }
}

function playerHealthStatus() {
  console.log("playerHealthStatus");
  const elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(element => {
    element.addEventListener("transitionend", () => {
      element.style.pointerEvents = "none";
      if (!isGameOver && playerHealth > 0) {
        playerHealth--;
        console.log(playerHealth);
      }
      // decreaseHealth();

      if (!isGameOver && playerHealth === 0) {
        isGameOver = true;
        gameOver();
      }
    });
  });
}

function gameOver() {
  //
  const elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(element => {
    element.dataset.status = "clean";
  });
  console.log("gameover");

  document.querySelector(".gameover").style.opacity = "1";
  document.querySelector(".gameover").style.pointerEvents = "all";

  document.querySelector(".genstart").style.opacity = "1";
  document.querySelector(".genstart").style.pointerEvents = "all";
}

function removeElement(e) {
  // console.log(e);
  // console.log("removeElement kørt");
  // add if statement that defines that if the element is too far down on the page then it can't be clicked
  e.target.dataset.status = "clean";
  e.target.style.backgroundColor = "initial";
  e.target.style.backgroundImage = 'url("static/bubbles.png")';
  // reset placement to be the original one
  let posX = e.target.getBoundingClientRect().x;
  e.target.style.transform = `translate(${posX}px, -200px)`;
}

function incrementCounter() {
  collectedTrash++;
  document.querySelector("#score h1").textContent = collectedTrash;
  // Add counter to field in HTML to show amount of pieces collected
  // console.log(collectedTrash);
}

// function changeSVGbgColor() {
//   //When the trash hits the bottom change background colors

//   let childNodesArray = document.querySelector(
//     "#game_container #baggrund svg g"
//   ).children;
//   console.log(document.querySelector("#game_container #baggrund svg g"));

//   console.log(childNodesArray);
//   hueRotation = hueRotation + 30;

//   for (let counter = 0; counter <= childNodesArray.length; counter++) {
//     console.log(hueRotation);

//     childNodesArray[counter].style.filter = `hue-rotate(${hueRotation})`;
//   }
// }

const deactivateElement = function(myElement) {
  myElement.style.opacity = "0";
  myElement.style.pointerEvents = "none";
};

const activateElement = function(myElement) {
  myElement.style.opacity = "1";
  myElement.style.pointerEvents = "all";
};
