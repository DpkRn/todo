let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const addBtn = document.getElementById("newTask");

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  renderList();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  renderList();
};

const toggle = (index) => {
  tasks[index].completed = !tasks[index].completed;
  console.log(tasks);

  renderList();
};

const celebrate = () => {
    console.log("hello")
    const end = Date.now()+1 * 1000;

    // go Buckeyes!
    const colors = ["#bb0000", "#ffffff"];
    
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
    
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
    
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
};


const updateStats = () => {
  const numbers = document.getElementById("numbers");
  const progress = document.getElementById("progress");

  const counts = tasks.reduce((acc, ele) => acc + (ele.completed ? 1 : 0), 0);
  numbers.innerText = `${counts}/${tasks.length}`;

  progress.style.width = `${(counts / tasks.length) * 100}%`;
  if(counts===tasks.length){
    celebrate();
  }

 
};

const renderList = () => {
  const taskContainer = document.getElementById("task-list");
  taskContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" id="checkbox" ${
                      task.completed ? "checked" : ""
                    } onChange="toggle(${index})"/>
                    <p id="taskText">${task.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" alt="" onclick=editTask(${index})>
                    <img src="delete.png" alt="" onclick=deleteTask(${index})>
                </div>
            </div>
            `;

    taskContainer.append(taskItem);
  });
  updateStats();
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = (e) => {
  e.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
  }
  taskInput.value = "";
  renderList();
};

addBtn.addEventListener("click", addTask);



document.addEventListener('DOMContentLoaded',()=>{
    let running=false;
    let id;
    renderList();
    id=setInterval(()=>{
        running=true;
        celebrate()
    },1*1000)

    const animBtn=document.querySelector('.animBtn')
    animBtn.addEventListener('click',()=>{
        if(running){
            clearInterval(id)
            animBtn.innerText="on anim"
            running=false;
        }else{
            id=setInterval(()=>{
                running=true;
                animBtn.innerText='off anim'
                celebrate()
            },1*1000)
        }

        
    })
    
})