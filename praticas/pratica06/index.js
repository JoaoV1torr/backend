// index.js
const readline = require('readline-sync');
const controlador = require('./controlador');

function menu() {
  console.log(`
================= MENU =================
1 - Adicionar tarefa
2 - Buscar tarefa
3 - Atualizar tarefa
4 - Remover tarefa
5 - Sair
========================================
`);
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1': {
      const nome = readline.question("Nome da tarefa: ");
      await controlador.adicionarTarefa(nome);
      console.log("✔ Tarefa adicionada!");
      break;
    }
    case '2': {
      const nome = readline.question("Nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nome);
      if (tarefa && tarefa.id) {
        console.log(`✔ Encontrada | Nome: ${tarefa.nome} | Concluída: ${tarefa.concluida} | Id: ${tarefa.id}`);
      } else {
        console.log("❌ Tarefa não encontrada.");
      }
      break;
    }
    case '3': {
      const nome = readline.question("Nome da tarefa: ");
      const flag = readline.question("Concluída? (true/false): ").trim().toLowerCase();
      const concluida = (flag === 'true');
      await controlador.atualizarTarefa(nome, concluida);
      console.log("✔ Operação de atualização concluída!");
      break;
    }
    case '4': {
      const nome = readline.question("Nome da tarefa: ");
      await controlador.removerTarefa(nome);
      console.log("✔ Operação de remoção concluída!");
      break;
    }
    case '5':
      console.log("👋 Saindo...");
      process.exit(0);
      break;
    default:
      console.log("⚠ Opção inválida!");
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opção: ");
    await escolherOpcao(opcao);
  }
}

main();