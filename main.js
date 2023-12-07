const tarefasDiv = document.getElementById('tarefas');
const finalizadasDiv = document.getElementById('finalizadas');
const tarefas2 = document.getElementById('tarefas2');
const finalizadas2 = document.getElementById('finalizadas2');
const desc = document.getElementById('descricao');

let tarefasStr = '';
let finalizadasStr = '';

function NewTarefa() {
    if (desc.value.trim() == '') {
        alert('Não pode estar inválida');
    } else {
        if (desc.value.trim().length > 100) {
            alert(`O máximo de caracteres é 90 (${desc.value.length - 90} acima)`);
        } else {
            tarefasStr += desc.value.trim() + '|';
            desc.value = '';
            AtualizaTabelas();
        }
    }
}

function RemoveTarefa(tarefa) {
    finalizadasStr += tarefa + '|';
    AtualizaTabelas();
}

function RemoveFinalizada(tarefa) {
    if (confirm('Deseja realmente excluir esta tarefa finalizada?')) {
        finalizadasStr = finalizadasStr.replace(tarefa + '|', '');
        AtualizaTabelas();
    }
}

function AtualizaTabelas() {
    let resultado1 = '';
    const tarefasArray = tarefasStr.split('|').filter(Boolean);
    const finalizadasArray = finalizadasStr.split('|').filter(Boolean);

    if (tarefasArray.length > 1) {
        resultado1 = '<button id="conclui-todos" onclick="ConcluiTodos()">Concluir Todos</button>';
    }
    let resultado2 = '';
    if (finalizadasArray.length > 1) {
        resultado2 = '<button id="delete-todos" onclick="DeleteTodos()">Excluir Todos</button>';
    }

    for (const tarefa of tarefasArray) {
        resultado1 += `<li>${tarefa}&nbsp;<button onclick='RemoveTarefa("${tarefa}")'>Concluir</button></li>`;
    }

    for (const tarefa of finalizadasArray) {
        resultado2 += `<li>${tarefa}&nbsp;<button onclick='RemoveFinalizada("${tarefa}")'>Excluir</button></li>`;
    }

    tarefasDiv.innerHTML = resultado1;
    finalizadasDiv.innerHTML = resultado2;
    tarefas2.innerHTML = `Pendentes (${tarefasArray.length})`;
    finalizadas2.innerHTML = `Finalizadas (${finalizadasArray.length})`;
}

desc.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        NewTarefa();
    }
});
