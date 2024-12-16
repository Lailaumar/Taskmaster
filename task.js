// script.js

// Get DOM elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskPriorityInput = document.getElementById('task-priority');
const taskDeadlineInput = document.getElementById('task-deadline');
const taskList = document.getElementById('task-list');

// Task array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear task list
    tasks
        .sort((a, b) => {
            const priorityOrder = { low: 1, medium: 2, high: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
        .forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) taskItem.classList.add('completed');

            taskItem.innerHTML = `
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p class="priority">Priority: ${task.priority}</p>
                    <p class="deadline">Deadline: ${task.deadline}</p>
                </div>
                <div>
                    <button class="complete-btn">Complete</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            // Complete button event
            taskItem.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks();
            });

            // Edit button event
            taskItem.querySelector('.edit-btn').addEventListener('click', () => {
                taskTitleInput.value = task.title;
                taskDescriptionInput.value = task.description;
                taskPriorityInput.value = task.priority;
                taskDeadlineInput.value = task.deadline;
                tasks = tasks.filter(t => t.id !== task.id); // Remove from tasks array for editing
                renderTasks();
            });

            // Delete button event
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                renderTasks();
            });

            taskList.appendChild(taskItem);
        });
}

// Function to add a new task
function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const priority = taskPriorityInput.value;
    const deadline = taskDeadlineInput.value;

    if (title === '') {
        alert('Please enter a task title');
        return;
    }

    const newTask = {
        id: Date.now(),
        title,
        description,
        priority,
        deadline,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();

    // Clear inputs
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    taskPriorityInput.value = 'medium';
    taskDeadlineInput.value = '';
}

// Event listener for Add Task button
addTaskBtn.addEventListener('click', addTask);

// Initial render of tasks (empty at first)
renderTasks();
