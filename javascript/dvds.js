const BASE_URL_DVDS ='https://parseapi.back4app.com/classes/Dvds';

//Para listar todos os Dvds
function listarDvds() {

    let instanciaAxios= axios.create({
        baseURL: BASE_URL_DVDS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });
    instanciaAxios.get().then(
        function (response) {
            // Na obtencao de dvds
            const dvds = response.data.results;

            if (dvds.length == 0) {
                alert('Nenhum dvd localizado');
                return;
            }

            // Popule a tabela com os dados dos dvds
            const tabelaResultadosDvds = document.getElementById('tabela-dvds');
            dvds.forEach(dvd => {
                const row = tabelaResultadosDvds.insertRow();
                row.innerHTML = `
                <td>${dvd.titulo}</td>
                <td>${dvd.ano}</td>
                <td>${dvd.genero}</td>
                <td><a href="edita_dvds.html?id=${dvd.objectId}" class="btn btn-primary">Editar</a>
                    <a href="javascript:void(0)" onclick="javascript:removerDvd('${dvd.objectId}')"  class="btn btn-primary">Apagar</a>
                </td>`;
            });

        }
    )
    .catch(function (error) {
        // No caso de erro, apresentar na tela
        alert('Erro ao listar dvds: ' + error.message);
        return;
    });
}

function removerDvd(id) {
    let instanciaAxios= axios.create({
        baseURL: BASE_URL_DVDS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });
    instanciaAxios.delete('/'+id).then(
        function (response) {
            alert('Sucesso na remoção.')
        }
    )
    .catch(function (error) {
        // No caso de erro, apresentar na tela
        alert('Erro ao listar dvds: ' + error.message);
        return;
    });
}