document.addEventListener("DOMContentLoaded", () => {

  const taskInput = document.querySelector("#taskInput");
  const addTaskInput = document.querySelector("#addTask");
  const taskList = document.querySelector(".task-list");
  const emptyImage = document.querySelector(".empty-image");


  let listText=JSON.parse(localStorage.getItem("listText"))|| []
  const toggleEmptyState = () => {
    emptyImage.style.display = taskList.children.length === 0 ? 'block' : "none";
  }

  const addTask = (event) => {
    event.preventDefault();
    if (!listText) {
      return;
    }
     listText.push(taskInput.value.trim()) ;
   localStorage.setItem("listText",JSON.stringify(listText))
    const Li = document.createElement("li");
    Li.innerHTML = `
  <div class="d-flex justify-content-center align-items-center">
    <input type="checkbox" class="check-box me-2">
<span class="list-text">${taskInput.value.trim()}</span>
  </div>

<div class="buttons-container">
   <button id="updateBtn" class="update-btn"><i class="fa-solid fa-pen "></i></button>
  <button id="deleteBtn" class="delete-btn"><i class="fa-solid fa-trash "></i></button>
</div>
  
  
  `
    taskList.appendChild(Li);
    taskInput.value = '';
    toggleEmptyState();
    updateCounter()

  }


  const render=()=>{
     let listContainer="";
    for(let i=0;i<listText.length;i++){
      listContainer+=`
      <li>
            <div class="d-flex justify-content-center align-items-center">
    <input type="checkbox" class="check-box me-2">
<span class="list-text">${listText[i]}</span>
  </div>

<div class="buttons-container">
   <button id="updateBtn" class="update-btn"><i class="fa-solid fa-pen "></i></button>
  <button id="deleteBtn" class="delete-btn"><i class="fa-solid fa-trash "></i></button>
</div>
      
      </li>

      `
    }

      taskList.innerHTML=listContainer;
      updateCounter()
      toggleEmptyState()

   }

  addTaskInput.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  })



  const deleteTask = () => {
    taskList.addEventListener("click", function (e) {
      const deleteBtn = e.target.closest(".delete-btn")
      deleteBtn.closest("li").remove();
      toggleEmptyState();
      updateCounter();

    })
  }

  deleteTask();
  const updateTask = () => {
    taskList.addEventListener("click", function (e) {
      const updateBtn = e.target.closest(".update-btn")
      const li = updateBtn.closest("li");
      const span = li.querySelector(".list-text");
      const input = document.createElement("input");
      input.type = "text";
      input.classList.add("input-update")
      input.value = span.textContent;
      span.replaceWith(input);
      input.focus();
      input.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
          const newSpan = document.createElement("span");
          newSpan.classList.add("list-text");
          newSpan.textContent = input.value;
          input.replaceWith(newSpan);
        }
      })

     
    })
  }

  updateTask();

taskList.addEventListener("click",function(e){   
  if(e.target.closest(".check-box")){
      updateCounter();
  }
})
  const updateCounter=()=>{
    const finishedTasks=document.querySelector(".finished-tasks");
    const totalTasks =document.querySelector(".total-tasks");
    const progressBar=document.querySelector(".progress-bar");
    const tasks=document.querySelectorAll("li");
    const total=tasks.length;
    const finished=document.querySelectorAll(".check-box:checked").length;
    finishedTasks.textContent=finished;
    totalTasks.textContent=total;
    const reminder=total-finished;
    const progressWidth=(finished/total)*100;
    progressBar.style.width=progressWidth +"%";
    if(tasks.length==0){
        progressBar.style.width=0 +"%";
    }

  }

  render()

})