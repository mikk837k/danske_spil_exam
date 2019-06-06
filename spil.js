"use strict";

window.addEventListener("DOMContentLoaded", init);

import myJsonImport from "/static/garbage.json";

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
  // Eventlistener som lytter på alle mousedown events på body
  document.querySelector("body").addEventListener("mousedown", windowClicked);
  buildGame();
}

function buildGame() {
  //Sætter status for antal skrald det er muligt at samle til at være lig antal elementer i JSON filen
  const scoreStatus = document.querySelector("#score h1");
  scoreStatus.textContent = "0/" + myJsonImport.length;

  //Skaber et html element udfra hvert element tilstede i JSON filen
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
  // Holder øje med om der er klikket på et element med datasettet "action" og ud fra datasettets værdi kørers en eller flere tilhørende funktioner
  action = e.target.dataset.action;

  if (action === "remove") {
    removeElement(e);
    trashCollected();
  }
  if (action === "start") {
    showRules();
  }

  if (!isGameWon && action === "mobil_start") {
    console.log(action);
    console.log("jeg er i den første if statement");
    console.log("isgamewon er", isGameWon);
    mobilFormat();
    showRules();
  }

  if (isGameWon == true && action === "mobil_start") {
    console.log(action);
    console.log("jeg er i den anden if statement");
    console.log("isgamewon er", isGameWon);
    mobilFormat();
    showSignUp();
  }

  if (action === "luk_spil") {
    lukMobilFormat();
  }

  if (action === "genstart") {
    resetGame();
    setTimeout(showRules, 300);
  }
  console.log(action);
}

function placeElements() {
  // Finder samtlige elementer med datasettet "trash" og placere elementerne på x og y aksen
  const elementArray = document.querySelectorAll("[data-status=trash]");
  for (let counter = 0; counter < elementArray.length; counter++) {
    let xPos = getCoordinateWithinBox(
      gameContainer,
      elementArray[counter]
    ).toString();

    elementArray[counter].style.transform = `translate(${xPos}px, -200px)`;
  }
}

function getCoordinateWithinBox(container, elem) {
  //Udregner en tilfældig værdi med udgangspunkt i forældre containerens bredde, elementets bredde som ganges med et tilfældigt tal.
  //Resultatet sendes retur og er udgangspunktet for placering af elementet på X aksen.
  return Math.floor(Math.random() * (container.clientWidth - elem.clientWidth));
}

function mobilFormat() {
  container.style.height = "auto";
  activateElement(container);
  document.querySelector("body").style.overflow = "hidden";
  deactivateElement(startknap_mobil);
}
function lukMobilFormat() {
  deactivateElement(container);
  document.querySelector("body").style.overflow = "initial";
  activateElement(startknap_mobil);
  deactivateElement(genstart_knap);

  resetGame();
}
function showRules() {
  //Funktion som viser regelsiden
  console.log("showrules kørt");
  const spilForside = document.querySelector(".spil_forside");
  const startKnap = document.querySelector(".start");

  deactivateElement(spilForside);
  deactivateElement(startKnap);

  setTimeout(startGame, 4000);
}

function showSignUp() {
  // Viser signup siden
  const spilForside = document.querySelector(".spil_forside");
  const gameOver = document.querySelector(".gameover");
  const reglerLag = document.querySelector(".regler");

  deactivateElement(gameContainer);
  deactivateElement(reglerLag);
  deactivateElement(spilForside);
  deactivateElement(gameOver);
}

function startGame() {
  //Starter spillet
  const reglerLag = document.querySelector(".regler");
  deactivateElement(reglerLag);

  playerHealthStatus();
  getTrashElements();
  ambientSoundEffect();
}

function getTrashElements() {
  //Finder alle elementerne med datasettet "trash" og sender et element afsted ad gangen med en forsinkelse vha. settimeout.
  const elementArray = document.querySelectorAll("[data-status=trash]");
  for (let counter = 0; counter < elementArray.length; counter++) {
    setTimeout(() => {
      //checkHealth(elementArray[counter], counter);
      addAnimationToElement(elementArray[counter], counter);
    }, 1000 * counter);
  }
}
function checkHealth() {
  //Holder styr på spillerens liv og status på spillet
  if (!isGameOver && playerHealth === 0) {
    isGameOver = true;
    gameOver();
  }
}

function addAnimationToElement(element, counter) {
  //Tilføjer animation til elementet som er sendt afsted fra getTrashElements().
  //Derudover holdes der øje med counteren og ud fra dennes værdi tilføjes forskellige klasser til elementet.
  //Klasserne definerer hastigheden for det nedfaldne skrald
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
  if (counter >= 16 && counter <= 25) {
    element.style.transform = `translate(${Xpos - gameContainerXpos}px, 580px)`;
    element.classList.add("float_speed_4");
  }
}

function playerHealthStatus() {
  //Lytter på elementer med datasettet "trash", om deres transition er slut og hvis den er så falder spillerens liv
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
  //Finder alle elementer med datasettet "no-damage".
  //Spillerens liv (et nummer) bruges til at finde index nummeret på det hjerte element som skal have ændret opacity.
  const heart = document.querySelectorAll(
    "[data-health=no-damage] svg .heart_cls-1"
  );

  heart[playerHealth].style.opacity = "0.2";
}

function gameWon() {
  //Skjuler spillet når det er gennemført
  document.querySelector("#game_container").style.transitionDuration = "1s";

  deactivateElement(gameContainer);

  isGameWon = true;
  ambientSoundEffect();
}

function gameOver() {
  //Finder alle elementer med datasettet "trash" og ændre deres dataset værdi til "clean"

  console.log("gameover kørt");
  const elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(element => {
    element.dataset.status = "clean";
  });

  ambientSoundEffect();

  const gameoverLag = document.querySelector(".gameover");
  const genstartKnap = document.querySelector(".genstart");

  activateElement(gameoverLag);
  activateElement(genstartKnap);
}

function resetGame() {
  //Nulstiller spillet og gør det klar til at kunne spilles igen
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

  buildGame();
}

function removeElement(e) {
  //Udskifter baggrundsbilledet for elementet, ændre datasettet til "clean", ændre positionen for elementet
  e.target.dataset.status = "clean";
  e.target.style.backgroundImage = 'url("bubbles.png")';
  bubbleSoundEffect();
  let elemXpos = e.target.getBoundingClientRect().x;
  let gameContainerXpos = gameContainer.getBoundingClientRect().x;
  e.target.style.transform = `translate(${elemXpos -
    gameContainerXpos}px, -200px)`;

  gameStatus();
}

function impactSoundEffect() {
  //afspiller lyd
  var impact = document.getElementById("audio_2");
  impact.play();
}
function bubbleSoundEffect() {
  //afspiller lyd
  var bubbles = document.getElementById("audio_1");
  bubbles.volume = 0.5;
  bubbles.play();
}
function ambientSoundEffect() {
  //afspiller lyd
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
  //Holder styr på elementernes status og checker om spillet er vundet
  const trashArray = document.querySelectorAll("[data-status=trash]");
  if (trashArray.length === 0 && !isGameOver) {
    gameWon();
  }
}

function trashCollected() {
  //Holder styr på samlet affald og skiver det ud
  collectedTrash++;
  const scoreStatus = document.querySelector("#score h1");
  scoreStatus.textContent = "";
  scoreStatus.textContent = collectedTrash + "/" + myJsonImport.length;
}

const deactivateElement = function(myElement) {
  //Ændre style på det medtaget element
  myElement.style.opacity = "0";
  myElement.style.pointerEvents = "none";
};

const activateElement = function(myElement) {
  //Ændre style på det medtaget element
  myElement.style.opacity = "1";
  myElement.style.pointerEvents = "all";
};
