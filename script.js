// ===== State =====
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// ===== DOM Elements =====
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const todoTableBody = document.getElementById("todo-table-body");
const todoTable = document.getElementById("todo-table");
const emptyMessage = document.getElementById("empty-message");
const totalCount = document.getElementById("total-count");
const doneCount = document.getElementById("done-count");
const pendingCount = document.getElementById("pending-count");
const updateModal = document.getElementById("update-modal");
const updateForm = document.getElementById("update-form");
const updateInput = document.getElementById("update-input");
const updatePriority = document.getElementById("update-priority");
const updateId = document.getElementById("update-id");
const cancelUpdate = document.getElementById("cancel-update");
const filterButtons = document.querySelectorAll(".btn-filter");

// ===== Helpers =====
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ===== Filtering =====
function getFilteredTodos() {
    if (currentFilter === "completed") {
        return todos.filter(function (t) { return t.complete; });
    }
    if (currentFilter === "pending") {
        return todos.filter(function (t) { return !t.complete; });
    }
    return todos;
}

// ===== Update Counters =====
function updateCounters() {
    var done = todos.filter(function (t) { return t.complete; }).length;
    totalCount.textContent = todos.length;
    doneCount.textContent = done;
    pendingCount.textContent = todos.length - done;
}

// ===== Render =====
function render() {
    var filtered = getFilteredTodos();
    todoTableBody.innerHTML = "";
    updateCounters();

    if (filtered.length === 0) {
        todoTable.style.display = "none";
        emptyMessage.style.display = "block";
        return;
    }

    todoTable.style.display = "table";
    emptyMessage.style.display = "none";

    filtered.forEach(function (todo, index) {
        var row = document.createElement("tr");

        var titleClass = todo.complete ? "task-text completed" : "task-text";
        var statusClass = todo.complete ? "status-badge status-done" : "status-badge status-pending";
        var statusText = todo.complete ? "\u2714 Done" : "\u23F3 Pending";
        var priority = todo.priority || "medium";
        var priorityClass = "priority-badge priority-" + priority;

        row.innerHTML =
            "<td>" + (index + 1) + "</td>" +
            '<td><span class="' + titleClass + '">' + escapeHTML(todo.title) + "</span></td>" +
            '<td><span class="' + priorityClass + '">' + priority + "</span></td>" +
            "<td>" + formatDate(todo.dateCreated) + "</td>" +
            '<td><span class="' + statusClass + '">' + statusText + "</span></td>" +
            "<td>" +
                '<button class="btn btn-blue" onclick="openUpdate(\'' + todo.id + '\')">Edit</button>' +
                '<button class="btn btn-red" onclick="deleteTodo(\'' + todo.id + '\')">Delete</button>' +
                '<button class="btn btn-green" onclick="toggleComplete(\'' + todo.id + '\')">' +
                    (todo.complete ? "Undo" : "Done") +
                "</button>" +
            "</td>";

        todoTableBody.appendChild(row);
    });
}

// ===== Actions =====
function addTodo(title, priority) {
    var todo = {
        id: generateId(),
        title: title.trim(),
        priority: priority,
        complete: false,
        dateCreated: new Date().toISOString()
    };
    todos.push(todo);
    saveTodos();
    render();
}

function deleteTodo(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    saveTodos();
    render();
}

function toggleComplete(id) {
    var todo = todos.find(function (t) { return t.id === id; });
    if (todo) {
        todo.complete = !todo.complete;
        saveTodos();
        render();
    }
}

function openUpdate(id) {
    var todo = todos.find(function (t) { return t.id === id; });
    if (todo) {
        updateInput.value = todo.title;
        updatePriority.value = todo.priority || "medium";
        updateId.value = todo.id;
        updateModal.style.display = "flex";
        updateInput.focus();
    }
}

function closeUpdate() {
    updateModal.style.display = "none";
    updateInput.value = "";
    updateId.value = "";
}

function updateTodo(id, newTitle, newPriority) {
    var todo = todos.find(function (t) { return t.id === id; });
    if (todo) {
        todo.title = newTitle.trim();
        todo.priority = newPriority;
        saveTodos();
        render();
    }
}

// ===== Event Listeners =====

// Add task
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = taskInput.value.trim();
    var priority = prioritySelect.value;
    if (title) {
        addTodo(title, priority);
        taskInput.value = "";
        prioritySelect.value = "medium";
        taskInput.focus();
    }
});

// Update task
updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = updateId.value;
    var newTitle = updateInput.value.trim();
    var newPriority = updatePriority.value;
    if (id && newTitle) {
        updateTodo(id, newTitle, newPriority);
        closeUpdate();
    }
});

// Cancel update
cancelUpdate.addEventListener("click", closeUpdate);

// Close modal on overlay click
updateModal.addEventListener("click", function (e) {
    if (e.target === updateModal) {
        closeUpdate();
    }
});

// Filter buttons
filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        currentFilter = this.getAttribute("data-filter");
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        this.classList.add("active");
        render();
    });
});

// ===== Initial Render =====
render();
