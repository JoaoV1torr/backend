// test-conn.js (versão verbosa)
console.log("[TEST] Iniciando teste de conexão...");

const { conectarDb } = require('./database');

(async () => {
  try {
    console.log("[TEST] Chamando conectarDb()...");
    const db = await conectarDb();
    console.log("[TEST] Conectado ao banco:", db.databaseName);

    // ping no servidor
    console.log("[TEST] Enviando ping...");
    const admin = db.admin();
    const ping = await admin.command({ ping: 1 });
    console.log("[TEST] Ping OK:", ping);

    // checar coleção
    const col = db.collection('tarefas');
    const count = await col.countDocuments();
    console.log("[TEST] Coleção 'tarefas' - documentos:", count);

    console.log("[TEST] Sucesso total ✅");
    process.exit(0);
  } catch (e) {
    console.error("[TEST] ERRO ❌:", e && e.stack ? e.stack : e);
    process.exit(1);
  }
})();