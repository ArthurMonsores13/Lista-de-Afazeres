function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim() !== "") {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        
        taskItem.innerHTML = `
            <div class="task-content">
                <span class="task-name">${taskInput.value}</span>
                <input type="time" onchange="setTaskTime(this)" class="time-input" />
                <span class="task-time"></span>
            </div>
            <button onclick="removeTask(this)">Remover</button>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = "";
    }
}

function setTaskTime(input) {
    const taskItem = input.closest(".task-item");
    const time = input.value;
    const timeDisplay = taskItem.querySelector(".task-time");
    timeDisplay.innerText = time ? ` - ${time}` : "";

    sortTasksByTime();
}

function removeTask(button) {
    button.closest(".task-item").remove();
}

function sortTasksByTime() {
    const taskList = document.getElementById("task-list");
    const tasks = Array.from(taskList.getElementsByClassName("task-item"));

    tasks.sort((a, b) => {
        const timeA = a.querySelector(".time-input").value || "24:00";
        const timeB = b.querySelector(".time-input").value || "24:00";
        return timeA.localeCompare(timeB);
    });

    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
}