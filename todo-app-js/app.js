
let tasks = []; // Array to hold tasks

// Function to add a task
function add(taskText) {
    tasks.push({ text: taskText, completed: false });
    renderTasks(); // Render the updated task list
}

// Function to render tasks
function renderTasks() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; // Clear the list before rendering

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className = "taskItem";

        const taskContent = document.createElement("div");
        taskContent.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks(); // Re-render the list
        });

        const taskLabel = document.createElement("span");
        taskLabel.textContent = task.text;
        taskLabel.style.textDecoration = task.completed ? "line-through" : "none"; // Strike-through if completed

        const icons = document.createElement("div");
        icons.className = "icons";

        const editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pen-to-square";
        editIcon.addEventListener("click", () => {
            const newTask = prompt("Edit task:", task.text);
            if (newTask !== null) {
                task.text = newTask.trim();
                renderTasks(); // Re-render the list
            }
        });

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash";
        deleteIcon.addEventListener("click", () => {
            tasks.splice(index, 1); // Remove the task from the array
            renderTasks(); // Re-render the list
        });

        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskLabel);
        icons.appendChild(editIcon);
        icons.appendChild(deleteIcon);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(icons);
        todoList.appendChild(taskItem);
    });

    // Update the total items count
    const nums = document.getElementById("nums");
    nums.textContent = `Total Items = ${tasks.length}`;
}

// Prevent form submission and add task
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
        add(taskText); // Add the task
        taskInput.value = ""; // Clear the input field
    }
});
