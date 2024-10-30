const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");


function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}


function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  li.innerText = taskText;

  if (completed) {
    li.style.textDecoration = "line-through";
  }


  const completeButton = document.createElement("button");
  completeButton.innerText = "Complete";
  completeButton.classList.add("complete-btn");
  completeButton.addEventListener("click", function () {
    li.style.textDecoration = "line-through";
    updateTaskInLocalStorage(taskText, true);
  });


  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", function () {
    li.remove();
    deleteTaskFromLocalStorage(taskText);
  });

  li.appendChild(completeButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}


function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function updateTaskInLocalStorage(taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}


function deleteTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}


addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value;
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTaskToLocalStorage(taskText);

  taskInput.value = "";
});

window.onload = loadTasks;