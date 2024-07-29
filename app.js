const express = require('express');
const path = require('path'); // Importar o módulo path
const app = express();

app.use(express.json()); // Para entender o corpo das requisições JSON

// Definindo o array de tarefas
let tarefas = [
    { id: 1, descrição: 'Estudar Node.js' },
    { id: 2, descrição: 'Praticar Express' },
    { id: 3, descrição: 'Revisar JavaScript' }
];

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para obter todas as tarefas
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Rota para criar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descrição } = req.body;
    if (!descrição) {
        return res.status(400).json({ erro: 'Descrição é obrigatória' });
    }
    const novaTarefa = {
        id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1,
        descrição
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// Rota para atualizar uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { descrição } = req.body;
    const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(id));
    if (tarefaIndex === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    if (!descrição) {
        return res.status(400).json({ erro: 'Descrição é obrigatória' });
    }
    tarefas[tarefaIndex].descrição = descrição;
    res.json(tarefas[tarefaIndex]);
});

// Rota para deletar uma tarefa existente
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(id));
    if (tarefaIndex === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    tarefas.splice(tarefaIndex, 1);
    res.status(204).send(); // No content
});

// Iniciando o servidor na porta 3010
app.listen(3011, () => {
    console.log('Servidor rodando na porta 3010');
});
