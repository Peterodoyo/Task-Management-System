document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');

    // Function to fetch tasks from backend and display them
    function fetchAndDisplayTasks() {
        // Fetch tasks from backend API (Replace URL with actual API endpoint)
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(tasks => {
                // Clear existing task list
                taskList.innerHTML = '';

                // Iterate through tasks and append to task list
                tasks.forEach(task => {
                    const row = `
                        <tr>
                            <td>${task.title}</td>
                            <td>${task.description}</td>
                            <td>${task.dueDate}</td>
                            <td>${task.status}</td>
                            <td>
                                <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal" data-task-id="${task.id}">Edit</button>
                                <button class="btn btn-sm btn-danger" data-task-id="${task.id}">Delete</button>
                            </td>
                        </tr>
                    `;
                    taskList.innerHTML += row;
                });
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Fetch and display tasks on page load
    fetchAndDisplayTasks();

    // Event listener for form submission to add/edit task
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Extract form data
        const formData = new FormData(taskForm);
        const taskData = Object.fromEntries(formData.entries());

        // Send task data to backend API for processing
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })
        .then(response => response.json())
        .then(() => {
            // Refresh task list after adding/editing task
            fetchAndDisplayTasks();
            // Close modal after form submission
            const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
            modal.hide();
            // Reset form fields
            taskForm.reset();
        })
        .catch(error => console.error('Error adding/editing task:', error));
    });

    // Event listener for editing a task
    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-primary')) {
            const taskId = event.target.dataset.taskId;
            // Fetch task details by ID (Replace URL with actual API endpoint)
            fetch(`http://localhost:3000/tasks/${taskId}`)
                .then(response => response.json())
                .then(task => {
                    // Populate form fields with task details
                    taskForm.elements['title'].value = task.title;
                    taskForm.elements['description'].value = task.description;
                    taskForm.elements['dueDate'].value = task.dueDate;
                    taskForm.elements['status'].value = task.status;
                    // Modify form submit button text to indicate editing
                    taskForm.querySelector('.btn-primary').innerText = 'Update Task';
                })
                .catch(error => console.error('Error fetching task details:', error));
        }
    });

    // Event listener for deleting a task
    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains
