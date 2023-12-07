    const tarefasDiv = document.getElementById('tarefas');
    const finalizadasDiv = document.getElementById('finalizadas');
    const tarefasT = document.getElementById('tarefasT');           
    const finalizadasT = document.getElementById('finalizadasT');
    const descricao = document.getElementById('descricao')
    let itens = [];
    let finalizadas = [];

    function NewTarefa() {
        if (descricao.value.trim() == '') {
            alert('Não pode estar invalida');
        } else {
            if(descricao.value.trim().length > 100){
                alert(`O maximo de caracteres é 90 (${descricao.value.length - 90} acima)`);
            } else {
            itens.push(descricao.value.trim());
            descricao.value = '';
            AtualizaTabelas();
            }
        }    
    }
    function RemoveTarefa(id) {
        finalizadas.push(itens[id]);
        itens.splice(id, 1);
        AtualizaTabelas();
    }
    function RemoveFinalizada(id){
        if(confirm('Deseja realmente excluir esta tarefa finalizada?')){
        finalizadas.splice(id, 1);
        AtualizaTabelas();
        }
    }  
    function AtualizaTabelas() {
        let r1 = '';
        if(itens.length > 1){r1 = '<button id="conclui-todos" onclick="ConcluiTodos()">Concluir Todos</button>';}
        let r2 = '';
        if(finalizadas.length > 1){r2 = '<button id="delete-todos" onclick="DeleteTodos()">Excluir Todos</button>';}
        for (let index = 0; index < itens.length; index++) {
            r1 += `<li>${itens[index]}&nbsp;<button onclick='RemoveTarefa(${index})'>Concluir</button></li>`;}
        for (let index = 0; index < finalizadas.length; index++) {
            r2 += `<li>${finalizadas[index]}&nbsp;<button onclick='RemoveFinalizada(${index})'>Excluir</button></li>`;}
        tarefasDiv.innerHTML = r1;
        finalizadasDiv.innerHTML = r2;   
        tarefasT.innerHTML = `Tarefas Pendentes (${itens.length})`;
        finalizadasT.innerHTML = `Tarefas Finalizadas (${finalizadas.length})`;
    }
    descricao.addEventListener('keydown', function (event){
        if(event.key == 'Enter'){NewTarefa()}
        console.log(event.key);
    })