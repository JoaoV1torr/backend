// controlador.js
const { Tarefa } = require('./modelo');

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.inserir();
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    await tarefa.alterar();
  } else {
    console.log("Tarefa não encontrada para atualizar.");
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  if (tarefa.id) {
    await tarefa.deletar();
  } else {
    console.log("Tarefa não encontrada para remover.");
  }
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};