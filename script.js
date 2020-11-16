// Cargar tareas
const tareas = {
  yesterday: [
    {
      task: "Limpiar tu cuarto",
      category: "Limpieza",
      points: 50,
      icon: "cleaning.svg",
      completed: 1,
    },
    {
      task: "Lavar la ropa",
      category: "Limpieza",
      points: 50,
      icon: "cleaning.svg",
      completed: 1,
    },
    {
      task: "Darle de comer al perro",
      category: "Mascotas",
      points: 20,
      icon: "pet.svg",
      completed: 1,
    },
  ],
  today: [
    {
      task: "Limpiar tu cuarto",
      category: "Limpieza",
      points: 50,
      icon: "cleaning.svg",
      completed: 1,
    },
    {
      task: "Sacar la basura",
      category: "Limpieza",
      points: 20,
      icon: "cleaning.svg",
      completed: 1,
    },
    {
      task: "Darle de comer al perro",
      category: "Mascotas",
      points: 20,
      icon: "pet.svg",
      completed: 0,
    },
  ],
  tomorrow: [
    {
      task: "Cambiar las sábanas",
      category: "Limpieza",
      points: 40,
      icon: "cleaning.svg",
      completed: 0,
    },
    {
      task: "Ir a comprar pan",
      category: "Compras",
      points: 40,
      icon: "shopping.svg",
      completed: 0,
    },
    {
      task: "Bañar al perro",
      category: "Mascotas",
      points: 80,
      icon: "pet.svg",
      completed: 0,
    },
  ],
};

// Listar tareas

const listTasks = async (day, link) => {
  const markup = tareas[day]
    .map(
      (tarea) => `
      <a class="task flex ${
        tarea.completed == 1 ? "completed" : ""
      }" onclick="checkTask(this)" data-points="${tarea.points}">
              <div class="task-icon">
                <img src="./icons/${tarea.icon}"/>
              </div>
              <div class="description">
                <h3>${tarea.task}</h3>
                <span>${tarea.category}</span>
              </div>
              <div class="checkbox">
                <img class="check-completed" src="./icons/checkbox.svg"/> 
                <img class="check-outline" src="./icons/checkbox-outline.svg"/>
              </div>
            </a>
            `
    )
    .join("");

  const content = document.getElementById("tasks");
  content.innerHTML = markup;

  // Actualizar pestaña activa

  document
    .querySelectorAll(".todo-nav a")
    .forEach((link) => link.classList.remove("active"));
  link.classList.add("active");

  refreshTotal();
};

// Marcar tarea como completada o pendiente

const checkTask = async (task) => {
  task.classList.contains("completed")
    ? task.classList.remove("completed")
    : task.classList.add("completed");

  refreshTotal();
};

// Actualizar THIS WEEK ALLOWANCE

const refreshTotal = async () => {
  let tareas = document.querySelectorAll(".task.completed");
  var total = 0;
  tareas.forEach(
    (tarea) => (total += parseInt(tarea.getAttribute("data-points")))
  );
  document.querySelector(".totals .allowance .price").innerHTML = "$" + total;
  console.log(total);
};

// Cargar app con la pestaña Today por defecto

listTasks("today", document.querySelector(".todo-nav li:nth-child(2) a"));
refreshTotal();
