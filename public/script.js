

document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
});

function carregarTarefas() {
    fetch('/tarefas')
        .then(response => response.json())
        .then(tarefas => {
            const lista = document.getElementById('listaTarefas');
            lista.innerHTML = ''; // Limpa a lista atual
            tarefas.forEach(tarefa => {
                const item = document.createElement('li');
                item.textContent = tarefa.descrição;
                lista.appendChild(item);
            });
        });
}

function adicionarTarefa() {
    const descricao = document.getElementById('novaTarefa').value;
    if (!descricao) {
        alert('Descrição é obrigatória');
        return;
    }
    fetch('/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descrição: descricao })
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('novaTarefa').value = '';
            carregarTarefas();
        });
}
