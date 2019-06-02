"use strict";

import { CountUp } from "CountUp.js";

window.addEventListener("load", init);

const myElement = document.querySelector(".donation_text2");
let hasItRun = "no";
const count_container = document.querySelector(".big");
const form = document.querySelector("form");

function init() {
  console.log("init");

  checkElement();
  window.addEventListener("scroll", checkElement);
}

function checkElement() {
  console.log("checkElement");

  if (isInViewport(myElement) && hasItRun === "no") {
    console.log("it is in viewport");
    let countUp = new CountUp(count_container, 3375);
    countUp.start();
    hasItRun = "yes";
  }
}

const isInViewport = function(myElement) {
  const elementBounding = myElement.getBoundingClientRect();
  console.log(elementBounding);
  return (
    elementBounding.top >= 0 &&
    elementBounding.left >= 0 &&
    elementBounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    elementBounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

form.addEventListener("submit", e => {
  console.log("submitted");
  e.preventDefault();
  const payload = {
    navn: form.elements.navn.value,
    email: form.elements.email.value
  };
  post(payload);
});

function post(newSubmit) {
  console.log("post");

  const postData = JSON.stringify(newSubmit);
  fetch("https://friends-a7f9.restdb.io/rest/danske-spil", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ceca0cac6621685acbada",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      form.reset();
    });
}
