const BASE_URL_REVISTAS ='https://parseapi.back4app.com/classes/Revistas';

// Para obter um parametro passado via GET na URL
function getURLParamValue(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function listarRevistas() {

    let instanciaAxios= axios.create({
        baseURL: BASE_URL_REVISTAS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });
    instanciaAxios.get().then(
        function (response) {
            const revistas = response.data.results;

            if (revistas.length == 0) {
                alert('Nenhuma revista localizada');
                return;
            }
            const tabelaResultadosRevistas = document.getElementById('tabela-revistas');
            revistas.forEach(revista => {
                const row = tabelaResultadosRevistas.insertRow();
                row.innerHTML = `
                <td>${revista.Titulo}</td>
                <td>${revista.anoPublicacao}</td>
                <td>${revista.Editora}</td>
                <td><a href="Criar&EditarRevista.html?id=${revista.objectId}" class="btn btn-primary">Editar</a>
                    <a href="javascript:void(0)" onclick="javascript:removerRevista('${revista.objectId}')"  class="btn btn-primary">Apagar</a>
                </td>`;
            });

        }
    )
    .catch(function (error) {
        alert('Erro ao listar revistas: ' + error.message);
        return;
    });
}

function removerRevista(id) {
    let instanciaAxios= axios.create({
        baseURL: BASE_URL_REVISTAS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });
    instanciaAxios.delete('/'+id).then(
        function (response) {
            alert('Sucesso na remoção da revista.');
            location.reload();
        }
    )
    .catch(function (error) {
        alert('Erro ao listar revistas: ' + error.message);
        return;
    });
}

function preEditarRevista(){

    let idRevista= getURLParamValue('id');
    if(idRevista){ 
        let instanciaAxios= axios.create({
            baseURL: BASE_URL_REVISTAS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });
        instanciaAxios.get(`?where={"objectId":"${idRevista}"}`).then(
            function (response) {
                const revista = response.data.results[0];
                document.getElementById('titulo').value = revista.Titulo;
                document.getElementById('editora').value = revista.Editora;
                document.getElementById('anoPublicacao').value = revista.anoPublicacao;  // Corrigido o campo "anoPublicacao"

            }
        )
        .catch(function (error) {
            alert('Erro ao obter revista: ' + error.message);
            return;
        });

    }
}
function salvarRevista() {
    let idRevista = getURLParamValue('id');
    
    // Configurando a instância Axios
    let instanciaAxios = axios.create({
        baseURL: BASE_URL_REVISTAS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });

    // Coleta de dados do formulário

    if (idRevista) {
        // Editar Revista (PUT)
        instanciaAxios.put(`/${idRevista}`, {
            Titulo: titulo,  // Corrigido para "Titulo"
            Editora: editora,  // Corrigido para "Editora"
            anoPublicacao: anoPublicacao  // Já está correto
        })
        .then(function (response) {
            alert('Sucesso ao editar revista.');
            return;
        })
        .catch(function (error) {
            alert('Erro ao editar revista: ' + error.message);
            return;
        });
    
    } else {
        // Criar Revista (POST)
        instanciaAxios.post('', {
            Titulo: document.getElementById('Titulo').value,
            anoPublicacao: parseInt(document.getElementById('anoPublicacao').value),
            Editora: document.getElementById('Editora').value 
        })
        .then(function (response) {
            alert('Sucesso ao criar revista.');
            return
        })
        .catch(function (error) {
            alert('Erro ao criar revista: ' + error.message);
            return
        });
    }
}

