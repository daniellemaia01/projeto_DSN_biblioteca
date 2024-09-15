const BASE_URL_LIVROS ='https://parseapi.back4app.com/classes/Livros';

// Para obter um parametro passado via GET na URL
function getURLParamValue(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//Para listar todos os Livros
function listarLivros() {

    let instanciaAxios= axios.create({
        baseURL: BASE_URL_LIVROS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });
    instanciaAxios.get().then(
        function (response) {
            // Na obtencao de Livros
            const livros = response.data.results;

            if (livros.length == 0) {
                alert('Nenhum livro localizado');
                return;
            }

            // Popule a tabela com os dados dos livros
            const tabelaResultadosLivros = document.getElementById('tabela-livros');
            livros.forEach(livro => {
                const row = tabelaResultadosLivros.insertRow();
                row.innerHTML = `
                <td>${livro.titulo}</td>
                <td>${livro.ano}</td>
                <td>${livro.genero}</td>
                <td><a href="edita_livros.html?id=${livro.objectId}" class="btn btn-primary">Editar</a>
                    <a href="javascript:void(0)" onclick="javascript:removerLivro('${livro.objectId}')"  class="btn btn-primary">Apagar</a>
                </td>`;
            });

        }
    )
    .catch(function (error) {
        // No caso de erro, apresentar na tela
        alert('Erro ao listar livros: ' + error.message);
        return;
    });
}

function removerLivro(id) {
    let instanciaAxios= axios.create({
        baseURL: BASE_URL_LIVROS,
        headers: {
            'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
            'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
        }
    });
    instanciaAxios.delete('/'+id).then(
        function (response) {
            alert('Sucesso na remoção do livro.');
            location.reload();
        }
    )
    .catch(function (error) {
        // No caso de erro, apresentar na tela
        alert('Erro ao listar livros: ' + error.message);
        return;
    });
}

function preEditarLivro(){

    let idLivro= getURLParamValue('id');

    // Se está editando. Nesse if ele averigua se tem idLivro. Se tiver edita se não cria
    if(idLivro){ 
        let instanciaAxios= axios.create({
            baseURL: BASE_URL_LIVROS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });
        instanciaAxios.get(`?where={"objectId":"${idLivro}"}`).then(
            function (response) {
                // Obtem o livro
                const livro = response.data.results[0];
                document.getElementById('titulo').value = livro.titulo;
                document.getElementById('ano').value = livro.ano;
                document.getElementById('genero').value = livro.genero;
    
            }
        )
        .catch(function (error) {
            // No caso de erro, apresentar na tela
            alert('Erro ao obter livro: ' + error.message);
            return;
        });

    }
}

function salvarLivro(){

    let idLivro= getURLParamValue('id');

     // Se está editando. Nesse if ele averigua se tem idLivro. Se tiver edita
     if(idLivro){ 
        let instanciaAxios= axios.create({
            baseURL: BASE_URL_LIVROS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });
        instanciaAxios.put(`/${idLivro}`, 
            {
                titulo: document.getElementById('titulo').value,
                ano: parseInt(document.getElementById('ano').value),
                genero: document.getElementById('genero').value
            }
            
        ).then(
            function (response) {
                alert('Sucesso ao editar livro.');
                return;
            }
        )
        .catch(function (error) {
            // No caso de erro, apresentar na tela
            alert('Erro ao editar livro: ' + error.message);
            return;
        });

    } else{
        //criando livro
        let instanciaAxios= axios.create({
            baseURL: BASE_URL_LIVROS,
            headers: {
                'X-Parse-Application-Id': 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN',
                'X-Parse-REST-API-Key': '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA'
            }
        });
        instanciaAxios.post(``, 
            {
                titulo: document.getElementById('titulo').value,
                ano: parseInt(document.getElementById('ano').value),
                genero: document.getElementById('genero').value
            }
            
        ).then(
            function (response) {
                alert('Sucesso ao criar livro.');
                return;
            }
        )
        .catch(function (error) {
            // No caso de erro, apresentar na tela
            alert('Erro ao criar livro: ' + error.message);
            return;
        });
    }
    
}