"use strict";

window.addEventListener("DOMContentLoaded", init);

let action = "";
let myJSON;
let counter;
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
    newDiv.dataset.type = "trash";
    newDiv.dataset.action = "remove";
    // newDiv.style.backgroundImage = `url("${element}.png")`;
    newDiv.style.backgroundColor = "red";
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
  const elementArray = document.querySelectorAll("[data-type=trash]");

  console.log(gameContainer.clientWidth);

  // place elements randomly on X axis using transform translate
  for (counter = 0; counter < elementArray.length; counter++) {
    console.log(elementArray[counter]);

    let stringifyNumb = getCoordinateWithinBox(
      gameContainer,
      elementArray[counter]
    ).toString();

    console.log(stringifyNumb);

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
  const elementArray = document.querySelectorAll("[data-type=trash]");
  for (let counter = 0; counter < elementArray.length; counter++) {
    setTimeout(() => {
      addAnimation(elementArray[counter], counter);
    }, 500 * counter);
  }
}

function addAnimation(element, counter) {
  console.log("addanimation kørt");
  console.log(element);

  let Xpos = element.getBoundingClientRect().x;

  if (counter <= 5) {
    // element.classList.add("floatDown");
    element.style.transform = `translate(${Xpos}px, 80vh)`;
    element.classList.add("float_speed_1");
  }
  if (counter > 5 && counter < 10) {
    element.style.transform = `translate(${Xpos}px, 80vh)`;
    element.classList.add("float_speed_2");
  }
  if (counter > 10 && counter < 15) {
    element.style.transform = `translate(${Xpos}px, 80vh)`;
    element.classList.add("float_speed_3");
  }
  if (counter > 15 && counter < 28) {
    element.style.transform = `translate(${Xpos}px, 80vh)`;
    element.classList.add("float_speed_4");
  }
}

function removeElement(e) {
  console.log(e);
  console.log("removeElement kørt");
  // add if statement that defines that if the element is too far down on the page then it can't be clicked
  // reset placement to be the original one
  e.target.style.display = "none";
}

function incrementCounter() {
  counter++;
  // Add counter to field in HTML to show amount of pieces collected
  console.log(counter);
}
