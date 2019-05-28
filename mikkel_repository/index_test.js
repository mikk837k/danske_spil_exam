"use strict";

window.addEventListener("DOMContentLoaded", init);

let action = "";
let myJSON;
let playerHealth = 3;
let collectedTrash = 0;
const gameContainer = document.querySelector("#game_container");

function init() {
  console.log("init kørt");
  document
    .querySelector("#game_container")
    .addEventListener("click", windowClicked);
  getJSON();
}

function getJSON() {
  fetch("garbage.json")
    .then(jsonData => jsonData.json())
    .then(jsonData => {
      myJSON = jsonData;
      createElements();
    });
}

function createElements() {
  myJSON.forEach(element => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("element");
    newDiv.dataset.status = "trash";
    newDiv.dataset.action = "remove";
    newDiv.style.backgroundImage = `url("img/${element}.svg")`;
    // newDiv.style.backgroundColor = "red";
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
    startGame();
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

function startGame() {
  console.log("startGame kørt");
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
  console.log(playerHealth);
  if (playerHealth === 0) {
    gameOver();
  } else {
    addAnimation(element, counter);
  }
}

function addAnimation(element, counter) {
  console.log(element);
  let Xpos = element.getBoundingClientRect().x;

  if (counter <= 5) {
    // element.classList.add("floatDown");
    element.style.transform = `translate(${Xpos}px, 85vh)`;
    element.classList.add("float_speed_1");
  }
  if (counter > 5 && counter <= 10) {
    element.style.transform = `translate(${Xpos}px, 85vh)`;
    element.classList.add("float_speed_2");
  }
  if (counter >= 11 && counter <= 15) {
    element.style.transform = `translate(${Xpos}px, 85vh)`;
    element.classList.add("float_speed_3");
  }
  if (counter >= 16 && counter <= 31) {
    element.style.transform = `translate(${Xpos}px, 85vh)`;
    element.classList.add("float_speed_4");
  }
}

function playerHealthStatus() {
  console.log("playerHealthStatus");
  const elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(element => {
    element.addEventListener("transitionend", () => {
      element.style.pointerEvents = "none";
      if (element.dataset.status === "trash") {
        playerHealth--;
        console.log(playerHealth);
      }
    });
  });
}

function gameOver() {
  console.log("gameover");
}

function removeElement(e) {
  console.log(e);
  console.log("removeElement kørt");
  // add if statement that defines that if the element is too far down on the page then it can't be clicked
  e.target.dataset.status = "clean";
  e.target.style.backgroundColor = "initial";
  e.target.style.backgroundImage = 'url("img/bubbles.png")';
  // reset placement to be the original one
  let posX = e.target.getBoundingClientRect().x;
  e.target.style.transform = `translate(${posX}px, -200px)`;
}

function incrementCounter() {
  collectedTrash++;
  document.querySelector("#score h1").textContent = collectedTrash;
  // Add counter to field in HTML to show amount of pieces collected
  console.log(collectedTrash);
}
