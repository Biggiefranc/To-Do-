// Array para armazenar as tarefas
let tarefas = [];
// Seletores
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
// Variável para controlar filtro atual
let filtroAtual = 'todas';

// Função para adicionar tarefa
function adicionarTarefa() {
 const texto = taskInput.value.trim();
 if (texto === '') {
   alert('insira a tarefa a ser cumprida!.');
   return;
 }

 const tarefa = {
   id: Date.now(),
   texto,
   concluida: false,
 };

 tarefas.push(tarefa);
 taskInput.value = '';
 renderizarTarefas();
}

// Função para renderizar tarefas
function renderizarTarefas() {
 taskList.innerHTML = '';

 const tarefasVisiveis = tarefas.filter(tarefa => {
   if (filtroAtual === 'ativas') return !tarefa.concluida;
   if (filtroAtual === 'concluidas') return tarefa.concluida;
   return true;
 });

 tarefasVisiveis.forEach(tarefa => {
   const li = document.createElement('li');
   li.className = tarefa.concluida ? 'task concluida' : 'task';

   const span = document.createElement('span');
   span.textContent = tarefa.texto;
   span.addEventListener('click', () => toggleConcluida(tarefa.id));

     const concluirBtn = document.createElement('button');
  concluirBtn.textContent = tarefa.concluida ? 'Desmarcar' : '✔';
  concluirBtn.className = 'concluir-btn';
  concluirBtn.addEventListener('click', () => toggleConcluida(tarefa.id));


   const removeBtn = document.createElement('button');
   removeBtn.textContent = '✖';
   removeBtn.className = 'remove-btn';
   removeBtn.addEventListener('click', () => removerTarefa(tarefa.id));

   li.appendChild(span);
   li.appendChild(concluirBtn);
   li.appendChild(removeBtn);
   taskList.appendChild(li);
 });
}

// Função para remover tarefa
function removerTarefa(id) {
 tarefas = tarefas.filter(tarefa => tarefa.id !== id);
 renderizarTarefas();
}

// Função para alternar conclusão
function toggleConcluida(id) {
 tarefas = tarefas.map(tarefa => {
   if (tarefa.id === id) {
     return { ...tarefa, concluida: !tarefa.concluida };
   }
   return tarefa;
 });
 renderizarTarefas();
}

// Event Listeners
addBtn.addEventListener('click', adicionarTarefa);
filterBtns.forEach(btn => {
 btn.addEventListener('click', () => {
   filterBtns.forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
   filtroAtual = btn.dataset.filter;
   renderizarTarefas();
 });
});

// Permitir adicionar tarefa ao pressionar Enter
taskInput.addEventListener('keydown', event => {
 if (event.key === 'Enter') {
   adicionarTarefa();
 }
});