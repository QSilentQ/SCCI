const closeBtn = document.querySelector(".close");
const cancelBtn = document.querySelector(".cancel");
const addBtn = document.querySelector(".add");
const modal_addClient = document.querySelector(".modal_addClient");
const plusBtn = document.querySelector(".plusBtn");
const block_addContact = document.querySelector(".dop_info");

const saveBtn = document.querySelector(".saveBtn");
let fullName = document.querySelector("fio");
let uSurname = document.querySelector(".surname");
let uName = document.querySelector(".name");
let patronymic = document.querySelector(".patronymic");
const requireSurname = document.querySelector(".requireSurname");
const requireName = document.querySelector(".requireName");

//! Для иконок
const icon_vk = document.querySelector(".vk");
const icon_fb = document.querySelector(".fb");
const icon_phone = document.querySelector(".phone");
const icon_mail = document.querySelector(".mail");
const icon_people = document.querySelector(".people");

//* Для ограничения на контакты
let i = 0;

let massId = [];
let massClients = [];

let getId = () => {
  let randomId = Math.floor(Math.random() * 900000 + 100000);
  for (let id = 0; id < massId.length; id++) {
    if (randomId == massId[id]) {
      randomId = Math.floor(Math.random() * 900000 + 100000);
      id = 0;
    }
  }
  massId.push(randomId);
  return randomId;
};

let getData = () => {
  let data = new Date().toLocaleDateString();
  return data;
};

let getTime = () => {
  let time = new Date().toLocaleTimeString();
  time = time.slice(0, 5);
  return time;
};

plusBtn.addEventListener("click", (e) => {
  e.preventDefault();
  i++;
  const div_grid = document.querySelector(".div_grid");

  //* DIV  для трёх элементов (Списка, инпута и кнопки удаления)

  //* Сам DIV
  const divContact = document.createElement("div");
  divContact.classList.add("div_dop_info");

  //*Сам инпут
  const inputContact = document.createElement("input");
  inputContact.classList.add("sqrInp");
  inputContact.setAttribute("placeholder", "Введите данные контакта");

  //* Кнопка удаления сожержимого
  const deleteDiv = document.createElement("div");
  const deleteBtn = document.createElement("img");
  deleteBtn.setAttribute("src", "./img/delete.svg");
  deleteDiv.classList.add("deleteDiv");
  deleteBtn.classList.add("deleteBtn");
  deleteDiv.append(deleteBtn);

  //* Сам Список
  const select = document.createElement("select");
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  const option3 = document.createElement("option");
  const option4 = document.createElement("option");
  const option5 = document.createElement("option");

  option1.innerHTML = "Телефон";
  option2.innerHTML = "Доп.Телефон";
  option3.innerHTML = "Email";
  option4.innerHTML = "Vk";
  option5.innerHTML = "Facebook";

  //* Отрисовка
  select.append(option1);
  select.append(option2);
  select.append(option3);
  select.append(option4);
  select.append(option5);
  divContact.append(select);
  divContact.append(inputContact);
  divContact.append(deleteDiv);
  div_grid.append(divContact);

  //* Ограничение
  if (i == 10) {
    block_addContact.style.display = "none";
  }

  deleteDiv.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.closest(".div_dop_info").remove();
    i--;
    block_addContact.style.display = "flex";
  });
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal_addClient.style.display = "flex";
});

modal_addClient.addEventListener("click", (e) => {
  if (e.target.closest(".modal_add")) return;
  const isModal = e.target.closest(".modal_addClient");
  if (isModal) {
    modal_addClient.style.display = "none";
  }
});

cancelBtn.addEventListener("click", (e) => {
  requireName.style.display = "none";
  requireSurname.style.display = "none";
  const div_grig = document.querySelector(".div_grid");
  e.preventDefault();
  modal_addClient.style.display = "none";
  div_grig.innerHTML = "";
  uSurname.value = "";
  uName.value = "";
  patronymic.value = "";
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal_addClient.style.display = "none";
});

saveBtn.addEventListener("click", () => {
  massClients = JSON.parse(localStorage.getItem("clients")) || [];
  if (!uSurname.value) {
    requireSurname.style.display = "flex";
  }

  if (!uName.value) {
    requireName.style.display = "flex";
  }

  if (uSurname.value) {
    requireSurname.style.display = "none";
    uSurname.value = uSurname.value.trim();
  }

  if (uName.value) {
    requireName.style.display = "none";
    uName.value = uName.value.trim();
  }

  if (uSurname.value && uName.value) {
    const table = document.querySelector("table");

    patronymic.value = patronymic.value.trim();
    fullName = uSurname.value + " " + uName.value + " " + patronymic.value;
    uSurname.value = "";
    uName.value = "";
    patronymic.value = "";

    let getContact = () => {
      let contacts = document.querySelectorAll(".div_dop_info");
      let contactsArr = [];

      for (let contact of contacts) {
        let type = contact.querySelector("select").value;
        let value = contact.querySelector(".sqrInp").value;
        let obj = { type, value };
        contactsArr.push(obj);
      }
      return contactsArr;
    };

    let obj = {
      id: getId(),
      fio: fullName,
      data: getData(),
      time: getTime(),
      dataLast: getData(),
      timeLast: getTime(),
      contacts: getContact(),
      date: new Date(),
      dateLast: new Date(),
    };
    massClients.push(obj);
    localStorage.setItem("clients", JSON.stringify(massClients));
    console.log(obj);

    let row = document.createElement("tr");
    row.innerHTML = `
                <td class="id">${obj.id}</td>
                <td class="fio">${obj.fio}</td>
                <td class="data">
                  <div class="date">
                    <p class="sData">${obj.data}</p>
                    <p class="gText">${obj.time}</p>
                  </div>
                </td>
                <td class="lastEdit">
                  <div class="date">
                    <p class="sData">${obj.dataLast}</p>
                    <p class="gText">${obj.timeLast}</p>
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
      for (let contact of obj.contacts) {
        contactsDiv.innerHTML += `<img class="btn_t" src="./img/${contact.type}.svg">`;
      }
    };
    getIcons();

    table.append(row);
    modal_addClient.style.display = "none";
  }
});
