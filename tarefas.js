function getTasks() {
    const tasks = localStorage.getItem("myTasks");
    return tasks ? JSON.parse(tasks) : [];
}

function showButtons(isDeleting) {
    const htmlTasks = document.getElementById("tarefas-lista");
    const tasks = getTasks();

    htmlTasks.innerHTML = "";
    
    html = tasks.map(task => converterParaHTMLButton(task, isDeleting));
    htmlTasks.innerHTML = html.join("");

}

function createNewTask() {
        let inputText = document.getElementById("input-tarefa");
        const novoTitulo = inputText.value.trim();

        if (novoTitulo === "") {
            alert("Digite um título primeiro!");
            return;
        }

        const data = new Date().toLocaleDateString();
        
        const newTask = {
            titulo: novoTitulo,
            concluido: false,
            data_inicio: data,
            data_conclusao: ""
        };
        
        let tasks = getTasks();
        tasks.push(newTask);
        localStorage.setItem("myTasks", JSON.stringify(tasks));

        renderTasks();
        inputText.value = "";
}

function converterTaskParaHTML(task) {
    return `<tr>
        <td>
            <p class="titulo-atividade">
                ${task.titulo}
            </p>
        </td>
        <td>
            <p>${task.data_inicio}</p>
            <input type="checkbox" ${task.concluido ? "checked": ""}></input>
        </td>
    </tr>`
}

function converterParaHTMLButton(task, isDeleting) {
    return isDeleting ? `<tr>
        <td>
            <p class="titulo-atividade">
                ${task.titulo}
                <img src="images/remove_icon.png" class="deletebtn">
            </p>
        </td>
        <td>
            <p>${task.data_inicio}</p>
            <input type="checkbox" ${task.concluido ? "checked": ""}></input>
        </td>
    </tr>` : `<tr>
        <td>
            <p class="titulo-atividade"> 
                <img src="images/edit_icon.png" class="deletebtn">
                ${task.titulo}
            </p>
        </td>
        <td>
            <p>${task.data_inicio}</p>
            <input type="checkbox" ${task.concluido ? "checked": ""}></input>
        </td>
    </tr>`;
}

function renderTasks() {
    if (localStorage.getItem("myTasks") != null) {
        let htmlTasks = document.getElementById("tarefas-lista");
        let tasks = getTasks();

        html = tasks.map(task => converterTaskParaHTML(task));
        htmlTasks.innerHTML = html.join("");
    }
}


const addbtn = document.getElementById("addbtn");
const removebtn = document.getElementById("removebtn");
const editbtn = document.getElementById("editbtn");
const checkboxes = document.querySelectorAll("concluido");

addbtn.addEventListener("click", createNewTask);
removebtn.addEventListener("click", () => showButtons(true));
editbtn.addEventListener("click", () => showButtons(false));

renderTasks();