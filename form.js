"use strict";

const form = document.querySelector("form");

const inputFields = document.querySelectorAll("input");

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

form.addEventListener("submit", e => {
  console.log("submitted");
  e.preventDefault();
  const payload = {
    navn: form.elements.navn.value,
    email: form.elements.email.value,
    terms: form.elements.terms.checked
  };
  post(payload);
  form.reset();
  visMeddelelse();
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
  });
}

function visMeddelelse() {
  console.log("visMeddelelse");

  document.querySelector(".meddelelse").style.opacity = "1";

  setTimeout(goToFrontPage, 2500);
}

function goToFrontPage() {
  console.log("goToFrontPage");

  window.location =
    "https://danskespil.dk/spillehjoernet?intcmp=top_menu_spillehjoernet_brand";
}
