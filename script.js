const defaultTasks = [
    {
        id: 101,
        title: "Create Login Page",
        assignee: "Rahul",
        status: "In Progress",
        priority: "High",
        tags: ["Frontend", "React"]
    },
    {
        id: 102,
        title: "Create Payment API",
        assignee: "Aman",
        status: "Todo",
        priority: "Medium",
        tags: ["Backend", "API"]
    },
    {
        id: 103,
        title: "Fix Dashboard Bug",
        assignee: "Priya",
        status: "Completed",
        priority: "Low",
        tags: ["Bug", "Frontend"]
    }
];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    const data = localStorage.getItem("tasks");

    if (data === null) {
        return null;
    }

    return JSON.parse(data);
}

const savedTasks = getTasks();

const tasks = savedTasks !== null ? savedTasks : defaultTasks;
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const tagFilter = document.getElementById("tagFilter");

const totalTasks = document.getElementById("totalTasks");
const todoTasks = document.getElementById("todoTasks");
const progressTasks = document.getElementById("progressTasks");
const completedTasks = document.getElementById("completedTasks");

function filterall(status) {
    return tasks.filter(function(task) {
        return task.status === status;
    });
}

function updateDashboard() {

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("todoTasks").textContent = filterall("Todo").length;
    document.getElementById("progressTasks").textContent = filterall("In Progress").length;
    document.getElementById("completedTasks").textContent = filterall("Completed").length;
}

function showTasks(taskArray) {
    taskList.innerHTML = taskArray.map(function(task) {
        return `
            <div class="task">
                <h3>#${task.id} </h3>
                <h3>${task.title}</h3> 
                <p>Assignee: ${task.assignee}</p>
                <p>Status: ${task.status}</p>
                <p>Priority: ${task.priority}</p>
                <p>Tags: ${task.tags.join(", ")}</p>

                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
    }).join("");
}

const filterTasks = () => {
    const search = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const priority = priorityFilter.value;
    const tag = tagFilter.value;

    const result = tasks.filter(task =>
        (task.title.toLowerCase().includes(search) ||
         task.assignee.toLowerCase().includes(search)) &&
        (!status || task.status === status) &&
        (!priority || task.priority === priority) &&
        (!tag || task.tags.includes(tag))
    );

    showTasks(result);
};

function deleteTask(id) {

    const index = tasks.findIndex(function(task) {
        return task.id === id;
    });

    if (index !== -1) {
        tasks.splice(index, 1);
    }
    saveTasks();
    updateDashboard();
    filterTasks();
}

function editTask(id) {

    const task = tasks.find(function(task) {
        return task.id === id;
    });

    const newTitle = prompt("Enter new title:", task.title);
    if (newTitle !== null && newTitle.trim() !== "") {
        task.title = newTitle;
    }
    const newAssignee = prompt("enter new Assignee", task.assignee);
    if(newAssignee != null){
        task.assignee= newAssignee;
    }
    const newStatus = prompt("enter new status", task.status)
    if(newStatus !==null )
        task.status=newStatus;
    const newprioprity = prompt("enter the priority" , task.priority)
    if(newprioprity !==null)
        task.priority=newprioprity;
    saveTasks();
    updateDashboard();
    filterTasks();
}

searchInput.addEventListener("input", filterTasks);
statusFilter.addEventListener("change", filterTasks);
priorityFilter.addEventListener("change", filterTasks);
tagFilter.addEventListener("change", filterTasks);

showTasks(tasks);
updateDashboard();
const form = document.getElementById("taskForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const newTask = {
        id: Number(document.getElementById("taskId").value),
        title: document.getElementById("title").value,
        assignee: document.getElementById("assignee").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        tags: document.getElementById("tags").value.split(",")
    };

    tasks.push(newTask);
    saveTasks();
    form.reset();

    updateDashboard();
    filterTasks();
});