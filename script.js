// Seletores
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");

let tasks = [];

// Adicionar tarefa
addTask.addEventListener("click", () => {
  if(taskInput.value.trim() !== ""){
    let task = {
      text: taskInput.value,
      completed: false
    };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
    updateProgress();
  }
});

// Renderizar tarefas
function renderTasks(){
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    if(task.completed){
      li.classList.add("done");
    }
    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
      updateProgress();
    });
    taskList.appendChild(li);
  });
}

// Atualizar progresso
function updateProgress(){
  if(tasks.length === 0){
    progressFill.style.width = "0%";
    progressFill.textContent = "0%";
    return;
  }
  let done = tasks.filter(t => t.completed).length;
  let percent = Math.round((done / tasks.length) * 100);
  progressFill.style.width = percent + "%";
  progressFill.textContent = percent + "%";
}

// Mostrar dia e hora atual
function updateDateTime() {
  const date = new Date();
  
  // Data formatada (ex: 1 de Outubro de 2025)
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const currentDate = date.toLocaleDateString("pt-BR", options);
  
  // Hora formatada
  const currentTime = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  
  document.getElementById("currentDate").textContent = currentDate;
  document.getElementById("currentTime").textContent = currentTime;
}

// Atualiza a cada segundo
setInterval(updateDateTime, 1000);
updateDateTime();

