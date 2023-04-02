import { save, load } from "./localstorage.js";

const STORAGE_KEY = "tasks";
let currentId = 0;

const taskList = document.getElementById("myUL");

// Add a "checked" symbol when clicking on a list item
taskList.addEventListener("click", function (event) {
  const taskId = event.target.dataset.id;
  const currentState = load(STORAGE_KEY);
  
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    const taskIndex = currentState.findIndex(
      (task) => task.id === Number(taskId)
    );
    currentState[taskIndex].isDone = !currentState[taskIndex].isDone;
    save(STORAGE_KEY, currentState);
  } else if (event.target.tagName === "SPAN") {
    const taskIndex = currentState.findIndex(
      (task) => task.id === Number(taskId)
    );
    currentState.splice(taskIndex, 1);
    save(STORAGE_KEY, currentState);
    event.target.parentNode.remove();
  }
});

// Create a new list item when clicking on the "Add" button
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", function (event) {
  const inputValue = document.getElementById("myInput").value.trim();
  if (!inputValue) {
    alert("You must write something!");
    return;
  }
  const task = {
    id: currentId,
    text: inputValue,
    isDone: false,
  };
  addTaskToStorage(task);
  createTaskElement(task);
  currentId++;
  document.getElementById("myInput").value = "";
});

// Add a new task to the storage
function addTaskToStorage(task) {
  const currentState = load(STORAGE_KEY) || [];
  currentState.push(task);
  save(STORAGE_KEY, currentState);
}

// Create a new task element
function createTaskElement(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.className = "todo-list";
  li.appendChild(document.createTextNode(task.text));
  if (task.isDone) {
    li.classList.add("checked");
  }
  taskList.appendChild(li);

  const closeBtn = document.createElement("SPAN");
  closeBtn.className = "close";
  closeBtn.appendChild(document.createTextNode("\u00D7"));
  li.appendChild(closeBtn);
}

// Fill task list with data from local storage
function fillTaskList() {
  const currentState = load(STORAGE_KEY);
  if (currentState) {
    currentState.forEach((task) => {
      createTaskElement(task);
      currentId = Math.max(currentId, task.id + 1);
    });
  }
}

window.addEventListener("DOMContentLoaded", fillTaskList);
