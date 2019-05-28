"use strict";

import { CountUp } from "countup.js";

const count_container = document.querySelector(".big");

window.addEventListener("load", () => {
  console.log("test");
  let countUp = new CountUp(count_container, 3375);
  countUp.start();
});

const form = document.querySelector("form");

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
    /* ved direkte at kalde displayfriend af det nye objekt, der er tilføjet, opdateres arrayet bare
  - altså indlæser den ikke hele arrayet igen. Derfor bliver det overflødigt at "nulstille" destinationen
  og kalde get igen */
    .then(res => res.json())
    .then(data => {
      // form.elements.submit.disabled = false;

      // document
      //   .querySelector(".message")
      //   .classList.add("message_animation");

      form.reset();

      // document
      //   .querySelector(".message")
      //   .addEventListener("animationend", () => {
      //     document
      //       .querySelector(".message")
      //       .classList.remove("message_animation");
      //   });
    });
}
