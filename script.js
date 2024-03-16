function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    var subjectInput = document.getElementById("subjectInput").value;
    var dueDateInput = document.getElementById("dueDateInput").value;
    
    if (taskInput === "" || subjectInput === "" || dueDateInput === "") {
        alert("Please enter both a subject, a task, and a due date!");
        return;
    }

    var ul = document.getElementById("taskList");
    var li = document.createElement("li");
    
    // Extracting date and time from the due date input
    var dueDateTime = new Date(dueDateInput);
    var dueDate = dueDateTime.toLocaleDateString('en-US');
    var dueTime = dueDateTime.toLocaleTimeString('en-US');

    li.innerHTML = `<span>Subject: ${subjectInput}</span><span>Task: ${taskInput}</span><span>Due: ${dueDate} ${dueTime}</span><button onclick="removeTask(this)">Done</button>`;
    
    var now = new Date();
    
    if (dueDateTime < now) {
        li.classList.add("overdue");
    }

    ul.appendChild(li);
    document.getElementById("taskInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("dueDateInput").value = "";
}

function removeTask(button) {
    var li = button.parentElement;
    li.style.opacity = "0"; // Fade out animation
    setTimeout(() => {
        li.remove(); // Remove the task from the list
    }, 300); // Delay to match the duration of the animation
}
// Function to continuously check and update task colors based on due dates
function updateTaskColors() {
    var tasks = document.querySelectorAll("#taskList li");
    var now = new Date();

    tasks.forEach(function(task) {
        var dueDate = new Date(task.dataset.dueDate);
        if (dueDate < now) {
            task.classList.add("overdue");
        } else {
            task.classList.remove("overdue");
        }
    });
}

// Call the function initially to set colors based on current time
updateTaskColors();

// Update task colors every minute (adjust as needed)
setInterval(updateTaskColors, 60000); // 60000 milliseconds = 1 minute
