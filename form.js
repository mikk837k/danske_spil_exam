"use strict";

const form = document.querySelector("form");

window.addEventListener("load", init);

function init() {
  console.log("form init");
  const floatContainers = document.querySelectorAll(".float_container");

  floatContainers.forEach(inputElement => {
    getTarget(inputElement);
  });
}

function getTarget(inputElement) {
  console.log("getTarget");
  const inputTarget = inputElement.querySelector("input");

  inputTarget.addEventListener("focus", inputFocus);
  inputTarget.addEventListener("blur", inputBlur);
}

function inputFocus(e) {
  console.log("inputFocus");
  e.target.parentNode.classList.add("active");

  const placeholderData = e.target.getAttribute("data-placeholder");
  e.target.setAttribute("placeholder", placeholderData);
}

function inputBlur(e) {
  console.log("inputBlur");

  if (!e.target.value) {
    e.target.parentNode.classList.remove("active");

    e.target.removeAttribute("placeholder");
  }
}

form.addEventListener(".submit", e => {
  console.log("submitted");
  e.preventDefault();
  const payload = {
    navn: form.elements.navn.value,
    email: form.elements.email.value,
    terms: form.elements.checked
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
