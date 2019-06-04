"use strict";

import { CountUp } from "CountUp.js";

window.addEventListener("load", init);

const myElement = document.querySelector(".donation_text2");
let hasItRun = "no";
const count_container = document.querySelector(".big");

function init() {
  console.log("init");

  checkElement();

  window.addEventListener("scroll", checkElement, true);
}

function checkElement() {
  console.log("checkElement");

  if (isInViewport(myElement) && hasItRun === "no") {
    console.log("it is in viewport");
    let countUp = new CountUp(count_container, 3375);
    countUp.start();
    hasItRun = "yes";
    window.removeEventListener("scroll", checkElement, true);
  }
}

const isInViewport = function(myElement) {
  const elementBounding = myElement.getBoundingClientRect();
  return (
    elementBounding.top >= 0 &&
    elementBounding.left >= 0 &&
    elementBounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    elementBounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
