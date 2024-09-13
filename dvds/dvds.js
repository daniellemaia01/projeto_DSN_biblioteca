const BASE_URL_DVDS ='https://parseapi.back4app.com/classes/Dvds';

// Para obter um parametro passado via GET na URL
function getURLParamValue(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

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
            alert('Sucesso na remoção do dvd.');
            location.reload();
        }
    )
    .catch(function (error) {
        // No caso de erro, apresentar na tela
        alert('Erro ao listar dvds: ' + error.message);
        return;
    });
}

function preEditarDvd(){

    let idDvd= getURLParamValue('id');

    // Se está editando. Nesse if ele averigua se tem idDvd. Se tiver edita se não cria
    if(idDvd){ 
        let instanciaAxios= axios.create({
            baseURL: BASE_URL_DVDS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });
        instanciaAxios.get(`?where={"objectId":"${idDvd}"}`).then(
            function (response) {
                // Obtem o dvd
                const dvd = response.data.results[0];
                document.getElementById('titulo').value = dvd.titulo;
                document.getElementById('ano').value = dvd.ano;
                document.getElementById('genero').value = dvd.genero;
    
            }
        )
        .catch(function (error) {
            // No caso de erro, apresentar na tela
            alert('Erro ao obter dvd: ' + error.message);
            return;
        });

    }
}