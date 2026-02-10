let mode = "view"; // view | delete | edit
let editingTaskId = null;

function getTasks() {
    const tasks = localStorage.getItem("myTasks");
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function createNewTask() {
    const input = document.getElementById("input-tarefa");
    const title = input.value.trim();

    if (!title) {
        alert("Digite um título primeiro!");
        return;
    }

    const tasks = getTasks();
    const date = new Date().toLocaleDateString();

    tasks.push({
        id: Date.now(),
        titulo: title,
        concluido: false,
        data_inicio: date,
        data_conclusao: ""
    });

    saveTasks(tasks);
    renderTasks();
    input.value = "";
}

function removeTask(id) {
    const tasks = getTasks().filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

function toggleTaskCompletion(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.concluido = !task.concluido;
    task.data_conclusao = task.concluido
        ? new Date().toLocaleDateString()
        : "";

    saveTasks(tasks);
    renderTasks();
}

function saveEditedTitle(id, newTitle) {
    const title = newTitle.trim();
    if (!title) {
        alert("O título não pode estar vazio!");
        return;
    }

    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.titulo = title;
    saveTasks(tasks);

    editingTaskId = null;
    renderTasks();
}

function renderTasks() {
    const tasks = getTasks();
    const table = document.getElementById("tarefas-lista");

    table.innerHTML = tasks.map(task => taskToHTML(task)).join("");
}

function taskToHTML(task) {
    const isEditing = mode === "edit" && editingTaskId === task.id;

    return `
    <tr data-id="${task.id}">
        <td>
            <p class="titulo-atividade">

                ${mode === "edit" && !isEditing ? `
                    <img 
                        src="images/edit_icon.png"
                        class="editbtn"
                        data-id="${task.id}"
                    >
                ` : ""}

                ${mode === "delete" ? `
                    <img 
                        src="images/remove_icon.png"
                        class="deletebtn"
                        data-id="${task.id}"
                    >
                ` : ""}

                ${
                    isEditing
                        ? `<input 
                            type="text"
                            class="edit-input"
                            data-id="${task.id}"
                            value="${task.titulo}"
                            autofocus
                        >`
                        : task.titulo
                }

            </p>
        </td>
        <td>
            <p>${task.data_inicio}</p>
            <input 
                type="checkbox"
                name="concluido"
                data-id="${task.id}"
                ${task.concluido ? "checked" : ""}
            >
            <p>${task.data_conclusao}</p>
        </td>
    </tr>
    `;
}

const table = document.getElementById("tarefas-lista");

table.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".deletebtn");
    if (deleteBtn) {
        removeTask(Number(deleteBtn.dataset.id));
        return;
    }

    const editBtn = e.target.closest(".editbtn");
    if (editBtn) {
        editingTaskId = Number(editBtn.dataset.id);
        renderTasks();
    }
});

table.addEventListener("change", (e) => {
    const checkbox = e.target.closest('input[name="concluido"]');
    if (!checkbox) return;

    toggleTaskCompletion(Number(checkbox.dataset.id));
});

table.addEventListener("keydown", (e) => {
    const input = e.target.closest(".edit-input");
    if (!input) return;

    if (e.key === "Enter") {
        saveEditedTitle(Number(input.dataset.id), input.value);
    }

    if (e.key === "Escape") {
        editingTaskId = null;
        renderTasks();
    }
});

table.addEventListener("blur", (e) => {
    const input = e.target.closest(".edit-input");
    if (!input) return;

    saveEditedTitle(Number(input.dataset.id), input.value);
}, true);

document.getElementById("addbtn")
    .addEventListener("click", createNewTask);

document.getElementById("removebtn")
    .addEventListener("click", () => {
        mode = "delete";
        editingTaskId = null;
        renderTasks();
    });

document.getElementById("editbtn")
    .addEventListener("click", () => {
        mode = "edit";
        editingTaskId = null;
        renderTasks();
    });

/* =====================
   INIT
===================== */

renderTasks();
