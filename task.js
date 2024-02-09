document.addEventListener("DOMContentLoaded", function () {
  const inputTask = document.querySelector(".input-task");
  const addTask = document.querySelector(".add-task");
  const tasks = document.querySelector(".task");

  const createList = () => {
    const li = document.createElement("li");
    return li;
  };

  inputTask.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      if (!inputTask.value) return;
      makeTask(inputTask.value,  date() );
      date();
      clearInput();
    }
  });

  const clearInput = () => {
    inputTask.value = "";
    inputTask.focus();
  };

  const createClearButton = (li) => {
    li.innerText += " ";
    const clearButton = document.createElement("button");
    clearButton.innerText = "Delete";
    clearButton.setAttribute("class", "delete");
    clearButton.setAttribute("title", "Delete This Task");
    li.appendChild(clearButton);
  };

  const date = () => {
    const data = new Date();
    let day = data.getDate();
    let month = data.getMonth() + 1;
    let year = data.getFullYear();
    const dateFormat = `0${day}/0${month}/${year}`;
    return dateFormat
  
  };
  const makeTask = (task,date) => {
    const li = createList();
    li.innerText = task+ " "+ " " + date
    tasks.appendChild(li);
    clearInput();
    createClearButton(li);
    saveTasks();
  };

  addTask.addEventListener("click", (e) => {
    if (!inputTask.value) return;
    makeTask(inputTask.value,  date() );
    clearInput();
  });

  document.addEventListener("click", function (e) {
    const el = e.target;
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
      saveTasks();
    }
  });

  const saveTasks = () => {
    const liTasks = tasks.querySelectorAll("li");
    const listOfTasks = [];
    for (let task of liTasks) {
      let taskText = task.innerText;
      taskText = taskText.replace("Delete", " ").trim();
      listOfTasks.push(taskText);
      console.log(listOfTasks);
    }

    const taskJSON = JSON.stringify(listOfTasks);
    localStorage.setItem("tasks", taskJSON); //only can save strings
  };

  const addSaveTasks = () => {
    const tasks = localStorage.getItem("tasks");
    const listOfTasks = JSON.parse(tasks);

    for (let task of listOfTasks) {
      makeTask(task, date());
    }
  };
  addSaveTasks();
});
