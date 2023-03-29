// Create a "close" button and append it to each list item
const myNodelist = document.getElementsByTagName("li");
for (let i = 0; i < myNodelist.length; i++) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
const close = document.querySelectorAll(".close");
for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", function () {
    const div = this.parentElement;
    div.style.display = "none";
  });
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector("ul");
list.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
});

// Create a new list item when clicking on the "Add" button
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", function () {
  const inputValue = document.getElementById("myInput").value;
  if (!inputValue) {
    alert("You must write something!");
    return;
  }
  const li = document.createElement("li");
  li.textContent = inputValue;
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  list.appendChild(li);
  document.getElementById("myInput").value = "";
});
