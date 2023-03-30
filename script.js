import { save, load } from "./localstorage.js";
window.addEventListener("DOMContentLoaded", fillTaskList);

const STORAGE_KEY = "tasks";
let currentId = 0;

// Create a "close" button and append it to each list item
const myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Add a "checked" symbol when clicking on a list item
const list = document.getElementById("myUL");
list.addEventListener(
  "click",
  function (ev) {
    const currentState = load(STORAGE_KEY);
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      const taskIndex = currentState.findIndex(
        (task) => Number(task.id) === Number(ev.target.dataset.id)
      );
      currentState[taskIndex].isDone = !currentState[taskIndex].isDone;
      save(STORAGE_KEY, currentState);
    } else if (ev.target.tagName === "SPAN") {
      const li = ev.target.parentNode;
      li.remove();
      const taskIndex = currentState.findIndex(
        (task) => Number(task.id) === Number(li.dataset.id)
      );
      currentState.splice(taskIndex, 1);
      save(STORAGE_KEY, currentState); // оновити масив в локальному сховищі
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener(
  "click",
  function (text, isDone = false, id = currentId) {
    const inputValue = document.getElementById("myInput").value;
    if (!inputValue.trim()) {
      alert("You must write something!");
      return;
    }
    addTaskToStorage(inputValue);
    const li = document.createElement("li");
    const t = document.createTextNode(inputValue);
    li.className = "todo-list";
    li.dataset.id = id;
    if (isDone) li.classList.add("checked");
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  }
);

// localStorage

function createTaskObj(text, isDone) {
  return {
    text,
    isDone,
    id: currentId,
  };
}

function addTaskToStorage(text, isDone = false) {
  const currentState = load(STORAGE_KEY);
  if (currentState === undefined) {
    const arr = [createTaskObj(text, isDone)];
    save(STORAGE_KEY, arr);
  } else {
    currentState.push(createTaskObj(text, isDone));
    save(STORAGE_KEY, currentState);
  }
  currentId += 1;
}

function createLi(text, isDone, id) {
  const li = document.createElement("li");
  const t = document.createTextNode(text);
  li.className = "todo-list";
  li.dataset.id = id;
  if (isDone) li.classList.add("checked");
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
}

// Fill task list with data from local storage
function fillTaskList() {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined) {
    currentState.forEach(({ text, isDone, id }) => {
      createLi(text, isDone, id);
      currentId = id + 1;
    });
  }
}
