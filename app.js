const express = require('express');
const path = require('path');
const app = express();

app.use(express.json()); 
let tarefas = [
    { id: 1, descrição: 'Estudar Node.js' },
    { id: 2, descrição: 'Praticar Express' },
    { id: 3, descrição: 'Revisar JavaScript' }
];


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});


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
