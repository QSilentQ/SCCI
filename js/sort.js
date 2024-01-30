import { Render } from "./ClientsRender.js";

let th = document.querySelectorAll(".arrow");
let mass = JSON.parse(localStorage.getItem("clients")) || [];

for (let thKa of th) {
  thKa.addEventListener("click", (e) => {
    prop = e.target.id;
    dir = !dir;
    console.log(dir, prop);
    let a = sortClients(mass, prop, dir);
    localStorage.setItem("clients", JSON.stringify(a));
    console.log(a);
    let tdBody = document.querySelector("tbody");
    tdBody.innerHTML = "";
    for (let i = 0; i < a.length; i++) {
      Render(a[i]);
    }
  });
}

let prop = "fio";
let dir = false;

function sortClients(arr, prop, dir) {
  console.log(dir);
  let arrClientCopy = [...arr];
  return arrClientCopy.sort(function (clientA, clientB) {
    if (dir ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop]) {
      return -1;
    }
  });
}
