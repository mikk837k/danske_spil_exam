"use strict";

window.addEventListener("DOMContentLoaded", init);
const gameContainer = document.querySelector("#game_container");
const schoolOfFish = document.querySelector("#school_of_fish");
let elementIsToRight = true;
let containerXpos = gameContainer.getBoundingClientRect().x;

function init() {
  console.log("init");
  randomStartPos();
}

function randomStartPos() {
  console.log("randomStartPos");
  let yPos = calculateYPos(gameContainer, schoolOfFish).toString();
  let xPos = calculateEndPosRight(gameContainer, schoolOfFish).toString();
  schoolOfFish.style.transform = `translate(${xPos}px, ${yPos}px)`;

  console.log(yPos, xPos);

  chooseDirection(yPos);
}

function randomYPos(yPos, xPos) {
  let newYpos = calculateYPos(gameContainer, schoolOfFish).toString();

  schoolOfFish.style.transform = `translate(${newYpos}px, ${yPos}px)`;

  chooseDirection(newYpos, xPos);
}

function chooseDirection(yPos, xPos) {
  //   console.log("generateNewYPos", yPos);

  schoolOfFish.style.transitionDuration = "0";

  if (elementIsToRight === true) {
    // console.log(yPos);
    schoolOfFish.style.transitionDuration = "200ms";
    schoolOfFish.style.transform = `translate(${xPos}px, ${yPos}px) scaleX(1)`;
    setTimeout(() => {
      animateLeft(yPos);
    }, 1000);
  } else {
    schoolOfFish.style.transitionDuration = "200ms";
    schoolOfFish.style.transform = `translate(${xPos}px, ${yPos}px) scaleX(-1)`;
    setTimeout(() => {
      animateRight(yPos);
    }, 1000);
  }
}

// Animate school of fish

function animateLeft(yPos) {
  let xPos = calculateEndPosLeft(containerXpos, schoolOfFish).toString();
  //   console.log("animateLeft", xPos, yPos);

  schoolOfFish.style.transform = `translate(${xPos}px, ${yPos}px) scaleX(1)`;
  schoolOfFish.style.transitionDuration = "5s";
  schoolOfFish.style.transitionTimingFunction = "linear";

  elementIsToRight = false;

  setTimeout(() => {
    randomYPos(yPos, xPos);
  }, 10000);
}

function animateRight(yPos) {
  let xPos = calculateEndPosRight(gameContainer, schoolOfFish).toString();

  //   console.log("animateRight", xPos, yPos);
  schoolOfFish.style.transitionDuration = "5s";
  schoolOfFish.style.transitionTimingFunction = "linear";
  schoolOfFish.style.transform = `translate(${xPos}px, ${yPos}px) scaleX(-1)`;

  elementIsToRight = true;

  setTimeout(() => {
    randomYPos(yPos, xPos);
  }, 10000);
}

// Position calculations

function calculateYPos(container, elem) {
  return Math.floor(
    Math.random() * (container.clientHeight - elem.clientWidth)
  );
}
function calculateEndPosLeft(container, elem) {
  return container - elem.clientWidth;
}

function calculateEndPosRight(container, elem) {
  return container.clientWidth + elem.clientWidth;
}
