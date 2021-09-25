const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');
//Cria um Li
function criaLi (){
    const li = document.createElement('li');
    return li;
}
// Evento para capturar tecla e ao mesmo tempo informar a tecla ENTER como válida para envio de informações no input
inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTarefa.value === '') return;
        criaTarefa(inputTarefa.value);
    }
});
// function para após enviar o a informação no input limpar o texto antigo
function limpaInput() {
    inputTarefa.value= '';
    inputTarefa.focus();
}
// function para criar botao de apagar após criar uma lista de tarefas
function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    // botaoApagar.classList.add('apagar');
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

// function para criar uma tarefa nova **aqui chamamamos uma função como "limpaInput" para que de fato ela seja executada ao final da ação // se chama tmb a funcao 'criaBotaoApagar'para que se crie o botao junto com a 'Li'.
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}
// event para adiquirar o click
btnTarefa.addEventListener('click', function(e) {
    if (!inputTarefa.value === '') return;
    criaTarefa(inputTarefa.value);
});
// event para fazer o botao apagar APAGGAR!
document.addEventListener('click', function(e){
    const el = e.target;
    
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});
// function para salvar tarefas
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas () {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();