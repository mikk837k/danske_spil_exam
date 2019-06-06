const destination = document.querySelector("#destination");
get();

function get() {
  console.log("get");

  fetch("https://friends-a7f9.restdb.io/rest/danske-spil", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ceca0cac6621685acbada",
      "cache-control": "no-cache"
    }
  })
    // kalder en funktion, som så kalder en anden funktion for each
    //   .then(e => e.json())
    //   .then(e => {
    //     showData(e);
    //   });

    // istedet for at kalde en funktion, der så for each kalder en anden, så kan man bruge for each med det samme:
    .then(res => res.json())
    .then(data => {
      console.table(data);
      data.forEach(displayDeltager);
    });
}

function displayDeltager(deltager) {
  console.log("displayDeltager");

  const clone = document.querySelector("template").cloneNode(true).content;

  clone.querySelector("[data-field=navn]").textContent =
    "Navn: " + deltager.navn;
  clone.querySelector("[data-field=email]").textContent =
    "E-mail: " + deltager.email;

  destination.insertBefore(clone, destination.childNodes[0]);
}
