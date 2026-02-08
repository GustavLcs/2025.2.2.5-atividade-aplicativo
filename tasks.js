let dados = [
    {
      titulo: "Estudar para prova de Matemática Discreta",
      concluido: true,
      data_inicio: "20/01/2026",
      data_conclusao: "06/02/2026"
    },
    {
        titulo: "Atividade de Web Design",
        concluido: false,
        data_inicio: "03/02/2026",
        data_conclusao: ""
    },
    {
        titulo: "Criar aplicação em Java",
        concluido: false,
        data_inicio: "03/02/2026",
        data_conclusao: ""
    },
];

function createNewTask() {
    let textInput = document.getElementById("input-tarefa");
    let novoTitulo = textInput.value
    let data = "";

    let newTask = {
        titulo: novoTitulo,
        concluido: false,
        data_inicio: data,
        data_conclusao: ""
    }

    console.log(newTask)
    dados.push(newTask)
    renderTasks()
}

function converterParaHTML(task) {
    return `<tr>
        <td>${task.titulo}</td>
        <td>
            <p>${task.data_inicio}</p>
            <input type="checkbox" ${task.concluido ? "checked": ""}></input>
        </td>
    </tr>`;
}

function renderTasks() {
    let htmlTarefas = document.getElementById("tarefas-lista");
    htmlTarefas.innerHTML = "";

    //console.log(dados);
    
    let html = dados.map(task => converterParaHTML(task));
    //console.log(html);
    let htmlTexto = html.join("");
    //console.log(htmlTexto);

    htmlTarefas.innerHTML = htmlTexto;
}

renderTasks();