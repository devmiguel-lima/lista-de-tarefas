document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${task}</span>

        <div>
          <button class="edit-btn" onclick="editTask(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </button>

          <button class="delete-btn" onclick="deleteTask(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      `;

      taskList.appendChild(li);
    });

    saveTasks();
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Responsável por adicionar tarefa
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText) {
      tasks.push(taskText);
      taskInput.value = "";
      renderTasks();
    }
  });

  // Responsável por editar as tarefas
  window.editTask = (index) => {
    const newTask = prompt("Editar tarefa:", tasks[index]);

    if (newTask !== null && newTask.trim()) {
      tasks[index] = newTask.trim();
      renderTasks();
    }
  };

  // Responsável por excluir as tarefas
  window.deleteTask = (index) => {
    if (confirm("Tem certeza que deseja excluir essa tarefa?")) {
      tasks.splice(index, 1);
      renderTasks();
    }
  };

  renderTasks();
});
