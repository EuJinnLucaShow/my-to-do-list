// Create a "close" button and append it to each list item
const myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to remove the current list item
const close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    const div = this.parentElement;
    div.remove();
  };
}

// Add a "checked" symbol when clicking on a list item
const list = document.getElementById("myUL");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", function () {
  const inputValue = document.getElementById("myInput").value;
  if (!inputValue.trim()) {
    alert("You must write something!");
    return;
  }
  const li = document.createElement("li");
  const t = document.createTextNode(inputValue);
  li.className = "todo-list";
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      const div = this.parentElement;
      div.remove();
    };
  }
});
