const BASE_URL_MONOGRAFIAS = 'https://parseapi.back4app.com/classes/Monografias';

// Para obter um parâmetro passado via GET na URL
function getURLParamValue(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Para listar todas as Monografias
function listarMonografias() {

    let instanciaAxios = axios.create({
        baseURL: BASE_URL_MONOGRAFIAS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });

    instanciaAxios.get().then(
        function (response) {
            // Na obtenção de monografias
            const monografias = response.data.results;

            if (monografias.length == 0) {
                alert('Nenhuma monografia localizada');
                return;
            }

            // Popule a tabela com os dados das monografias
            const tabelaResultadosMonografias = document.getElementById('tabela-monografias');
            monografias.forEach(monografia => {
                const row = tabelaResultadosMonografias.insertRow();
                row.innerHTML = `
                <td>${monografia.titulo}</td>
                <td>${monografia.autor}</td>
                <td>${monografia.ano}</td>
                <td>${monografia.resumo}</td>
                <td><a href="edita_monografia.html?id=${monografia.objectId}" class="btn btn-primary">Editar</a>
                    <a href="javascript:void(0)" onclick="javascript:removerMonografia('${monografia.objectId}')" class="btn btn-primary">Apagar</a>
                </td>`;
            });

        }
    )
    .catch(function (error) {
        // No caso de erro, apresentar na tela
        alert('Erro ao listar monografias: ' + error.message);
        return;
    });
}

function removerMonografia(id) {
    let instanciaAxios = axios.create({
        baseURL: BASE_URL_MONOGRAFIAS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });

    instanciaAxios.delete('/' + id).then(
        function (response) {
            alert('Sucesso na remoção da monografia.');
            location.reload();
        }
    )
    .catch(function (error) {
        // No caso de erro, apresentar na tela
        alert('Erro ao remover monografia: ' + error.message);
        return;
    });
}

function preEditarMonografia(){

    let idMonografia = getURLParamValue('id');

    // Se está editando
    if (idMonografia) { 
        let instanciaAxios = axios.create({
            baseURL: BASE_URL_MONOGRAFIAS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });

        instanciaAxios.get(`?where={"objectId":"${idMonografia}"}`).then(
            function (response) {
                // Obter a monografia
                const monografia = response.data.results[0];
                document.getElementById('titulo').value = monografia.titulo;
                document.getElementById('autor').value = monografia.autor;
                document.getElementById('ano').value = monografia.ano;
                document.getElementById('resumo').value = monografia.resumo;
            }
        )
        .catch(function (error) {
            // No caso de erro, apresentar na tela
            alert('Erro ao obter monografia: ' + error.message);
            return;
        });

    }
}

function salvarMonografia(){

    let idMonografia = getURLParamValue('id');

    // Se está editando
    if (idMonografia) { 
        let instanciaAxios = axios.create({
            baseURL: BASE_URL_MONOGRAFIAS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });

        instanciaAxios.put(`/${idMonografia}`, 
            {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                ano: parseInt(document.getElementById('ano').value),
                resumo: document.getElementById('resumo').value
            }
        ).then(
            function (response) {
                alert('Sucesso ao editar monografia.');
                return;
            }
        )
        .catch(function (error) {
            // No caso de erro, apresentar na tela
            alert('Erro ao editar monografia: ' + error.message);
            return;
        });

    } else {
        // Criando nova monografia
        let instanciaAxios = axios.create({
            baseURL: BASE_URL_MONOGRAFIAS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });

        instanciaAxios.post('', 
            {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                ano: parseInt(document.getElementById('ano').value),
                resumo: document.getElementById('resumo').value
            }
        ).then(
            function (response) {
                alert('Sucesso ao criar monografia.');
                return;
            }
        )
        .catch(function (error) {
            // No caso de erro, apresentar na tela
            alert('Erro ao criar monografia: ' + error.message);
            return;
        });
    }
}
