const express = require('express');


const tarefas = [
    { id: 1, nome: "Estudar middleware", concluida: false },
    { id: 2, nome: "Praticar Express", concluida: true }
];


const app = express();

// Utilize o middleware express.json()
app.use(express.json());


app.use((req, res, next) => {
    const dataHora = new Date().toLocaleString();
    console.log(`[${dataHora}] Requisição: ${req.method} ${req.url}`);
    next();
});


const router = express.Router();

// Rota GET /tarefas
router.get('/', (req, res) => {
    return res.json(tarefas);
});

// Rota POST /tarefas
router.post('/', (req, res) => {
    const novaTarefa = req.body;
    tarefas.push(novaTarefa);
    return res.status(201).json(novaTarefa);
});

// Rota GET /tarefas/:tarefaId
router.get('/:tarefaId', (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        // Se a tarefa não for encontrada, chame o próximo middleware com um erro
        
        return next({ message: "Tarefa não localizada" });
    }
    
    return res.json(tarefa);
});

// Rota PUT /tarefas/:tarefaId
router.put('/:tarefaId', (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const dadosAtualizados = req.body;
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        return next({ message: "Tarefa não localizada" });
    }

    const tarefaAtualizada = { ...tarefas[index], ...dadosAtualizados };
    tarefas[index] = tarefaAtualizada;

    return res.json(tarefaAtualizada);
});

// Rota DELETE /tarefas/:tarefaId
router.delete('/:tarefaId', (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const index = tarefas.findIndex(t => t.id === id);
    
    if (index === -1) {
        return next({ message: "Tarefa não localizada" });
    }
    
    tarefas.splice(index, 1);
    return res.status(204).send();
});

// Registre o roteador na aplicação Express
app.use('/tarefas', router);

// Middleware de erro
app.use((err, req, res, next) => {
    if (err.message === "Tarefa não localizada") {
        return res.status(400).json({ mensagem: err.message });
    }
   
    res.status(500).json({ mensagem: "Erro interno do servidor." });
});

// Faça a instância da aplicação Express ouvir a porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});