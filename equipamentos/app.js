const APPLICATION_ID = 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN';
const REST_API_KEY = '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA';
const BASE_URL = 'https://parseapi.back4app.com/classes/Equipamentos';

// Função para buscar equipamentos
function fetchEquipamentos() {
    fetch(BASE_URL, {
        headers: {
            'X-Parse-Application-Id': APPLICATION_ID,
            'X-Parse-REST-API-Key': REST_API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        const listaEquipamentos = document.getElementById('lista-equipamentos');
        if (listaEquipamentos) {
            listaEquipamentos.innerHTML = ''; // Limpa a lista antes de preencher
            data.results.forEach(equipamento => {
                listaEquipamentos.innerHTML += `
                    <div class="list-group-item list-group-item-action">
                        <strong>ID:</strong> ${equipamento.objectId} <br>
                        <strong>Nome:</strong> ${equipamento.nome} <br>
                        <strong>Marca:</strong> ${equipamento.marca} <br>
                        <strong>Preço:</strong> R$${equipamento.preco} <br>
                        <strong>Quantidade:</strong> ${equipamento.quantidade}
                    </div>
                `;
            });
        } else {
            console.error('Elemento #lista-equipamentos não encontrado.');
        }
    })
    .catch(error => console.error('Erro ao buscar equipamentos:', error));
}

// Função para exibir mensagem de sucesso
function exibirMensagemSucesso(mensagem) {
    alert(mensagem);
}

// Função para exibir mensagem de erro
function exibirMensagemErro(mensagem) {
    alert(mensagem);
}

// Função para limpar campos do formulário
function limparCamposFormulario(form) {
    form.reset();
}

// Função para adicionar equipamento
document.addEventListener('DOMContentLoaded', function() {
    const formAdicionar = document.getElementById('form-adicionar');
    if (formAdicionar) {
        formAdicionar.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

            const formData = new FormData(e.target);
            const equipamento = {
                nome: formData.get('nome'),
                marca: formData.get('marca'),
                preco: parseFloat(formData.get('preco')),
                quantidade: parseInt(formData.get('quantidade'), 10)
            };

            console.log('Equipamento:', equipamento);

            // Verifica se todos os campos obrigatórios estão preenchidos
            if (!equipamento.nome || !equipamento.marca || isNaN(equipamento.preco) || isNaN(equipamento.quantidade)) {
                console.error('Todos os campos são obrigatórios.');
                return;
            }

            fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(equipamento)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Erro ao adicionar equipamento:', data.error);
                } else {
                    console.log('Equipamento adicionado com sucesso:', data);
                    exibirMensagemSucesso('Equipamento adicionado com sucesso!');
                    limparCamposFormulario(formAdicionar);
                    fetchEquipamentos(); // Atualiza a lista de equipamentos
                }
            })
            .catch(error => console.error('Erro ao adicionar equipamento:', error));
        });
    }

    const formEditar = document.getElementById('form-editar');
    if (formEditar) {
        formEditar.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

            const formData = new FormData(e.target);
            const equipamentoId = formData.get('id');
            const equipamento = {
                nome: formData.get('nome'),
                marca: formData.get('marca'),
                preco: parseFloat(formData.get('preco')),
                quantidade: parseInt(formData.get('quantidade'), 10)
            };

            // Remove campos não preenchidos
            Object.keys(equipamento).forEach(key => {
                if (!equipamento[key]) {
                    delete equipamento[key];
                }
            });

            console.log('Equipamento:', equipamento);

            fetch(`${BASE_URL}/${equipamentoId}`, {
                method: 'PUT',
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(equipamento)
            })
            .then(response => {
                if (response.status === 404) {
                    throw new Error('Equipamento não encontrado.');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error('Erro ao editar equipamento:', data.error);
                } else {
                    console.log('Equipamento editado com sucesso:', data);
                    exibirMensagemSucesso('Equipamento editado com sucesso!');
                    limparCamposFormulario(formEditar);
                    fetchEquipamentos(); // Atualiza a lista de equipamentos
                }
            })
            .catch(error => {
                console.error('Erro ao editar equipamento:', error);
                exibirMensagemErro(error.message);
            });
        });
    }

    const formRemover = document.getElementById('form-remover');
    if (formRemover) {
        formRemover.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

            const formData = new FormData(e.target);
            const equipamentoId = formData.get('id');

            fetch(`${BASE_URL}/${equipamentoId}`, {
                method: 'DELETE',
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY
                }
            })
            .then(response => {
                if (response.status === 404) {
                    throw new Error('Equipamento não encontrado.');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error('Erro ao remover equipamento:', data.error);
                } else {
                    console.log('Equipamento removido com sucesso:', data);
                    exibirMensagemSucesso('Equipamento removido com sucesso!');
                    limparCamposFormulario(formRemover);
                    fetchEquipamentos(); // Atualiza a lista de equipamentos
                }
            })
            .catch(error => {
                console.error('Erro ao remover equipamento:', error);
                exibirMensagemErro(error.message);
            });
        });
    }
    fetchEquipamentos();
});