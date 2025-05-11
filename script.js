document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.textContent = taskText;

    // Toggle completed state
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents event bubbling
        taskList.removeChild(li);
        saveTasks();
        toggleEmptyMessage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
    toggleEmptyMessage();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasks();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            taskList.removeChild(li);
            saveTasks();
            toggleEmptyMessage();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    toggleEmptyMessage();
}

// Function to show/hide "No tasks available" message
function toggleEmptyMessage() {
    let taskList = document.getElementById("taskList");
    let emptyMessage = document.getElementById("emptyMessage");
    emptyMessage.style.display = taskList.children.length === 0 ? "block" : "none";
}
