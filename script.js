document.body.classList.add('bg-dark');
document.body.classList.add('bg-opacity-25');

const header = document.querySelector('header');

const headerTitle = document.createElement('h1');
header.appendChild(headerTitle);
headerTitle.innerText = 'Minha Lista de Tarefas';
headerTitle.classList.add('display-1');

const funcionamento = document.createElement('h2');
// eslint-disable-next-line operator-linebreak
funcionamento.innerText ='Clique duas vezes em um item para marcá-lo como completo';
funcionamento.id = 'funcionamento';
header.appendChild(funcionamento);

const main = document.querySelector('main');
main.classList.add('container-sm');
main.setAttribute('display', 'flex');

let todoContainer = document.createElement('div');
main.appendChild(todoContainer);
todoContainer.id = 'todo-container';
todoContainer.className = 'container-sm';

const inputTarefa = document.createElement('input');
todoContainer.appendChild(inputTarefa);
inputTarefa.type = 'text';
inputTarefa.id = 'texto-tarefa';
inputTarefa.classList.add('form-control');

const buttonCriarTarefa = document.createElement('button');
buttonCriarTarefa.id = 'criar-tarefa';
buttonCriarTarefa.innerText = 'Criar Tarefa';
buttonCriarTarefa.type = 'button';
buttonCriarTarefa.classList.add('btn');
const primary = 'btn-outline-primary';
buttonCriarTarefa.classList.add(primary);
todoContainer.appendChild(buttonCriarTarefa);

const buttonUp = document.createElement('button');
buttonUp.id = 'mover-cima';
buttonUp.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
buttonUp.classList.add('btn');
buttonUp.classList.add(primary);
todoContainer.appendChild(buttonUp);

const buttonDown = document.createElement('button');
buttonDown.id = 'mover-cima';
buttonDown.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
buttonDown.classList.add('btn');
buttonDown.classList.add(primary);
todoContainer.appendChild(buttonDown);

const buttonLimparTarefas = document.createElement('button');
buttonLimparTarefas.id = 'apaga-tudo';
buttonLimparTarefas.innerText = 'Limpar Tarefas';
buttonLimparTarefas.classList.add('btn');
buttonLimparTarefas.classList.add('btn-outline-secondary');
todoContainer.appendChild(buttonLimparTarefas);

const salvarTarefasBtn = document.createElement('button');
salvarTarefasBtn.innerHTML = 'Salvar Tarefas!';
salvarTarefasBtn.id = 'salvar-tarefas';
salvarTarefasBtn.classList.add('btn');
salvarTarefasBtn.classList.add('btn-outline-success');
todoContainer.appendChild(salvarTarefasBtn);

const buttonTarefasConcluidas = document.createElement('button');
buttonTarefasConcluidas.id = 'remover-finalizados';
buttonTarefasConcluidas.innerText = 'Remover Tarefas Concluídas';
buttonTarefasConcluidas.classList.add('btn');
buttonTarefasConcluidas.classList.add('btn-outline-danger');
todoContainer.appendChild(buttonTarefasConcluidas);

const oList = document.createElement('ol');
oList.id = 'lista-tarefas';
oList.className = 'list-group list-group-numbered';
todoContainer.appendChild(oList);

function criarTarefa(event) {
  if (event.target.id === 'criar-tarefa') {
    const tarefaTexto = inputTarefa.value;
    inputTarefa.value = '';
    const novaTarefa = document.createElement('li');
    novaTarefa.innerText = tarefaTexto;
    novaTarefa.className = 'tarefa';
    novaTarefa.classList.add('list-group-item');
    oList.appendChild(novaTarefa);
  }
}
document.addEventListener('click', criarTarefa);

function tarefasClicadas(event) {
  if (event.target.classList.contains('tarefa')) {
    const tarefas = document.querySelectorAll('.tarefa');
    for (let i = 0; i < tarefas.length; i += 1) {
      tarefas[i].classList.remove('tarefa-clicada');
    }
    event.target.classList.add('tarefa-clicada');
  }
}

document.addEventListener('click', tarefasClicadas);

function tarefasConcluidas(event) {
  if (event.target.classList.contains('tarefa')) {
    const concluida = 'completed';
    if (event.target.classList.contains(concluida)) {
      event.target.classList.remove(concluida);
    } else {
      event.target.classList.add(concluida);
    }
  }
}

document.addEventListener('dblclick', tarefasConcluidas);

function limparTarefas() {
  const tarefas = document.querySelectorAll('.tarefa');
  for (let i = 0; i < tarefas.length; i += 1) {
    tarefas[i].remove();
  }
}

buttonLimparTarefas.addEventListener('click', limparTarefas);

function removerConcluidas() {
  const completed = document.querySelectorAll('.completed');
  for (let i = 0; i < completed.length; i += 1) {
    completed[i].remove();
  }
}

buttonTarefasConcluidas.addEventListener('click', removerConcluidas);

function salvarTarefas() {
  const lista = oList.children;
  const tarefaObjArray = [];
  for (let i = 0; i < lista.length; i += 1) {
    let tarefaObj = {};
    tarefaObj.texto = lista[i].innerText;
    tarefaObj.classe = lista[i].className;
    tarefaObjArray[i] = tarefaObj;
  }
  localStorage.clear();
  localStorage.setItem('lista', JSON.stringify(tarefaObjArray));
}

salvarTarefasBtn.addEventListener('click', salvarTarefas);

function carregarTarefas() {
  if (localStorage.length !== 0) {
    const listaRecuperada = JSON.parse(localStorage.getItem('lista'));
    for (let i = 0; i < listaRecuperada.length; i += 1) {
      let novoListItem = document.createElement('li');
      novoListItem.innerText = listaRecuperada[i].texto;
      novoListItem.className = listaRecuperada[i].classe;
      oList.appendChild(novoListItem);
    }
  }
}

window.onload = function onLoad() {
  carregarTarefas();
};

function movesUp() {
  
}

buttonUp.addEventListener('click', movesUp);