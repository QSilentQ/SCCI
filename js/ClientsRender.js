let ClientsLoad = JSON.parse(localStorage.getItem("clients")) || [];

export function Render(object) {
  let table = document.querySelector("tbody");
  let row = document.createElement("tr");
  row.innerHTML = `
                <td class="id">${object.id}</td>
                <td class="fio">${object.fio}</td>
                <td class="data">
                  <div class="date">
                    <p class="sData">${object.data}</p>
                    <p class="gText">${object.time}</p>
                  </div>
                </td>
                <td class="lastEdit">
                  <div class="date">
                    <p class="sData">${object.dataLast}</p>
                    <p class="gText">${object.timeLast}</p>
                  </div>
                </td>
                <td class="contacts">
                  
                </td>
                <td class="applications">
                  <div class="buttons_app">
                    <div class="edit"><img class="btn_t" src="./img/edit.svg" alt=""><p>Изменить</p></div>
                    <div class="delete"><img class="btn_t" src="./img/cancel.svg" alt=""><p>Удалить</p></div>
                  </div>
                </td>
    `;

  let contactsDiv = row.querySelector(".contacts");

  let getIcons = () => {
    for (let contact of object.contacts) {
      contactsDiv.innerHTML += `<img class="btn_t" src="./img/${contact.type}.svg" alt="">`;
    }
  };
  getIcons();
  table.append(row);
}

let tdBody = document.querySelector("tbody");
tdBody.innerHTML = "";

for (let i = 0; i < ClientsLoad.length; i++) {
  Render(ClientsLoad[i]);
}
