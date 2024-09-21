const input = document.getElementById("input");
const add = document.getElementById("add");
const table = document.getElementById("table");
const alert = document.getElementById("alert");
let count = 0;
let tasks = [];
let tasksData = localStorage.getItem("tasks");
if (tasksData) {
  tasks = JSON.parse(tasksData);
  count = tasks.length;
  display();
} else {
  tasks = [];
}

add.addEventListener("click", () => {
  if (input.value) {
    tasks.push({
      id: count,
      task: input.value,
      status: false,
    });
    count++;
    display();
    input.value = "";
  }
});

function display() {
  table.innerHTML = "";
  tasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${task.id}</th>
    <td>${task.task}</td>
    <td><input type="checkbox" ${task.status ? "checked" : ""} onclick="updateStatus(${task.id})"></td>
    <td><button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button></td>
    `;
    table.appendChild(row);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStatus(id) {
  tasks.forEach((task) => {
    if (task.id === id) {
      task.status = !task.status;
    }
  });
  display();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  display();
}






