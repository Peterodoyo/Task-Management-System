let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
let isEdit = false;
let editIndex;

// Function to display tasks
function displayTasks() {
    // Clear existing task display
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    taskList.forEach((task, index) => {
        let taskRow = `
            <tr>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.dueDate}</td>
                <td>${task.status}</td>
                <td>
                    <button class="btn btn-primary" onclick="editTask(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
                </td>
            </tr>
        `;
        taskListElement.innerHTML += taskRow;
    });
}

// Function to add or update a task
function saveTask(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let status = document.getElementById('status').value;

    if (!isEdit) {
        // Add new task
        let newTask = {
            title: title,
            description: description,
            dueDate: dueDate,
            status: status
        };
        taskList.push(newTask);
    } else {
        // Update existing task
        taskList[editIndex].title = title;
        taskList[editIndex].description = description;
        taskList[editIndex].dueDate = dueDate;
        taskList[editIndex].status = status;
        isEdit = false;
    }

    // Save to local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Clear form
    event.target.reset();

    // Display tasks
    displayTasks();
}

// Function to edit a task
function editTask(index) {
    isEdit = true;
    editIndex = index;

    // Fill form fields with task data
    let task = taskList[index];
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('status').value = task.status;

    // Change button text
    document.querySelector('#taskModal h5.modal-title').textContent = 'Edit Task';

    // Show modal for editing
    $('#taskModal').modal('show');
}

// Function to delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskList.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        displayTasks();
    }
}

// Event listeners
document.getElementById('taskForm').addEventListener('submit', saveTask);

// Initial display
displayTasks();
