"use strict";

window.addEventListener("DOMContentLoaded", init);

import myJsonImport from "/static/garbage.json";

// ////////console.log(myJsonImport);

let action = "";
let playerHealth = 3;
let collectedTrash = 0;
let isGameOver = false;
let isGameWon = false;
let soundOn = false;
const gameContainer = document.querySelector("#game_container");
const container = document.querySelector(".container");
const startknap_mobil = document.querySelector(".mobil_start");
const genstart_knap = document.querySelector(".genstart");

function init() {
  ////console.log("init kørt");
  // ////console.log(myJsonImport);
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
  ////console.log("windowclicked kørt");
  action = e.target.dataset.action;

  if (action === "remove") {
    ////console.log("if statement kørt");
    removeElement(e);
    trashCollected();
  }
  if (action === "start") {
    showRules();
  }

  if (!isGameWon && action === "mobil_start") {
    mobilFormat();
    showRules();
  }

  if (isGameWon && action === "mobil_start") {
    mobilFormat();
    showSignUp();
  }

  if (action === "luk_spil") {
    lukMobilFormat();
  }

  if (action === "genstart") {
    resetGame();
  }

  ////console.log(action);
}

function placeElements() {
  const elementArray = document.querySelectorAll("[data-status=trash]");

  ////console.log(gameContainer.clientWidth);

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

function mobilFormat() {
  ////console.log("mobilFormat");
  container.style.height = "auto";

  activateElement(container);

  document.querySelector("body").style.overflow = "hidden";
  deactivateElement(startknap_mobil);
}
function lukMobilFormat() {
  ////console.log("lukMobilFormat");

  deactivateElement(container);
  document.querySelector("body").style.overflow = "initial";
  activateElement(startknap_mobil);
  deactivateElement(genstart_knap);

  resetGame();
}
function showRules() {
  ////console.log("showRules");
  document.querySelector(".spil_forside").style.opacity = "0";
  document.querySelector(".spil_forside").style.pointerEvents = "none";

  document.querySelector(".start").style.opacity = "0";
  document.querySelector(".start").style.pointerEvents = "none";

  setTimeout(startGame, 4000);
}

function showSignUp() {
  document.querySelector("#game_container").style.opacity = "0";
  document.querySelector("#game_container").style.pointerEvents = "none";
  document.querySelector(".regler").style.opacity = "0";
  document.querySelector(".regler").style.pointerEvents = "none";
  document.querySelector(".spil_forside").style.opacity = "0";
  document.querySelector(".spil_forside").style.pointerEvents = "none";
  document.querySelector(".gameover").style.opacity = "0";
  document.querySelector(".gameover").style.pointerEvents = "none";
}

function startGame() {
  ////console.log("startGame kørt");
  document.querySelector(".regler").style.opacity = "0";
  document.querySelector(".regler").style.pointerEvents = "none";
  // Can this be done by using forEach? note the delay!
  playerHealthStatus();
  findTrashElements();
  ambientSoundEffect();
}

function findTrashElements() {
  const elementArray = document.querySelectorAll("[data-status=trash]");
  for (let counter = 0; counter < elementArray.length; counter++) {
    setTimeout(() => {
      //checkHealth(elementArray[counter], counter);
      addAnimationToElement(elementArray[counter], counter);
    }, 1000 * counter);
  }
}
function checkHealth() {
  //console.log(isGameOver, playerHealth);
  if (!isGameOver && playerHealth === 0) {
    isGameOver = true;
    gameOver();
  }
}

function addAnimationToElement(element, counter) {
  // ////console.log(element);
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
  //console.log("playerHealthStatus");
  const elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(element => {
    element.addEventListener("transitionend", () => {
      element.style.pointerEvents = "none";
      if (element.dataset.status === "trash") {
        playerHealth--;
        element.dataset.status = "fallentrash";
        impactSoundEffect();
        decreaseHealth();
        checkHealth();
        gameStatus();
      }
    });
  });
}

function decreaseHealth() {
  const heart = document.querySelectorAll(
    "[data-health=no-damage] svg .heart_cls-1"
  );

  heart[playerHealth].style.opacity = "0.2";
}

function gameWon() {
  //console.log("gameWon kørt");
  document.querySelector("#game_container").style.transitionDuration = "1s";
  document.querySelector("#game_container").style.opacity = "0";
  document.querySelector("#game_container").style.pointerEvents = "none";
  isGameWon = true;
  ambientSoundEffect();
}

function gameOver() {
  //
  const elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(element => {
    element.dataset.status = "clean";
  });
  //console.log("gameover");

  ambientSoundEffect();

  document.querySelector(".gameover").style.opacity = "1";
  document.querySelector(".gameover").style.pointerEvents = "all";

  document.querySelector(".genstart").style.opacity = "1";
  document.querySelector(".genstart").style.pointerEvents = "all";
}

function resetGame() {
  ////console.log("restergame kørt");
  const trashArray = document.querySelectorAll(".element");
  const scoreStatus = document.querySelector("#score h1");
  const heart = document.querySelectorAll(
    "[data-health=no-damage] svg .heart_cls-1"
  );

  heart.forEach(heart => {
    heart.style.opacity = "1";
  });

  trashArray.forEach(element => {
    element.parentNode.removeChild(element);
  });
  scoreStatus.textContent = "";
  scoreStatus.textContent = "0/31";
  isGameOver = false;
  playerHealth = 3;
  collectedTrash = 0;
  soundOn = false;

  const gameoverLag = document.querySelector(".gameover");
  const startKnap = document.querySelector(".start");
  const reglerLag = document.querySelector(".regler");

  deactivateElement(gameoverLag);
  deactivateElement(genstart_knap);
  activateElement(startKnap);
  activateElement(reglerLag);

  createElements();
  setTimeout(showRules, 300);
}

function removeElement(e) {
  // ////console.log(e);
  // ////console.log("removeElement kørt");
  // add if statement that defines that if the element is too far down on the page then it can't be clicked
  e.target.dataset.status = "clean";
  e.target.style.backgroundImage = 'url("bubbles.png")';
  bubbleSoundEffect();
  // reset placement to be the original one
  let elemXpos = e.target.getBoundingClientRect().x;
  let gameContainerXpos = gameContainer.getBoundingClientRect().x;
  ////console.log(elemXpos);
  e.target.style.transform = `translate(${elemXpos -
    gameContainerXpos}px, -200px)`;

  gameStatus();
}

function impactSoundEffect() {
  var impact = document.getElementById("audio_2");
  impact.play();
}
function bubbleSoundEffect() {
  var bubbles = document.getElementById("audio_1");
  bubbles.volume = 0.5;
  bubbles.play();
}
function ambientSoundEffect() {
  var ambience = document.getElementById("audio_3");

  ambience.loop = true;
  if (soundOn == false) {
    ambience.play();
  } else {
    ambience.pause();
  }

  soundOn = true;
}

function gameStatus() {
  const trashArray = document.querySelectorAll("[data-status=trash]");

  //console.log(trashArray.length);

  if (trashArray.length === 0 && !isGameOver) {
    gameWon();
  }
}

function trashCollected() {
  //console.log("trashCollected kørt");
  collectedTrash++;
  const scoreStatus = document.querySelector("#score h1");
  scoreStatus.textContent = "";
  scoreStatus.textContent = collectedTrash + "/31";
}

const deactivateElement = function(myElement) {
  myElement.style.opacity = "0";
  myElement.style.pointerEvents = "none";
};

const activateElement = function(myElement) {
  myElement.style.opacity = "1";
  myElement.style.pointerEvents = "all";
};
