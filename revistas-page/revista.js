
    
    Parse.initialize("zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN", "Bpkjzp40fafbzqZ8xGq9vM0TbwBJC5WawcMApOvp");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    // Função para criar uma nova revista
    async function criarRevista() {
      const editora = document.getElementById("editora").value;
      const titulo = document.getElementById("titulo").value;
      const anoPublicacao = parseInt(document.getElementById("anoPublicacao").value);
      
      const Revista = Parse.Object.extend("Revista");
      const revista = new Revista();

      revista.set("Editora", editora);
      revista.set("Titulo", titulo);
      revista.set("anoPublicacao", anoPublicacao);

      try {
        const resultado = await revista.save();
        alert("Revista criada com sucesso!");
        listarRevistas(); // Atualizar a lista de revistas
      } catch (erro) {
        console.error("Erro ao criar revista:", erro);
      }
    }

    // Função para listar as revistas
    async function listarRevistas() {
      const Revista = Parse.Object.extend("Revista");
      const query = new Parse.Query(Revista);

      try {
        const resultados = await query.find();
        const listaRevistas = document.getElementById("listaRevistas");
        listaRevistas.innerHTML = "";

        resultados.forEach((revista) => {
          const item = document.createElement("li");
          item.innerHTML = `
            Editora: ${revista.get("Editora")}, 
            Título: ${revista.get("Titulo")}, 
            Ano: ${revista.get("anoPublicacao")}
            <button onclick="editarRevista('${revista.id}')">Editar</button>
            <button onclick="deletarRevista('${revista.id}')">Deletar</button>
          `;
          listaRevistas.appendChild(item);
        });
      } catch (erro) {
        console.error("Erro ao listar revistas:", erro);
      }
    }

    // Função para editar uma revista
    async function editarRevista(id) {
      const Revista = Parse.Object.extend("Revista");
      const query = new Parse.Query(Revista);
      
      try {
        const revista = await query.get(id);
        document.getElementById("editora").value = revista.get("Editora");
        document.getElementById("titulo").value = revista.get("Titulo");
        document.getElementById("anoPublicacao").value = revista.get("anoPublicacao");

        document.getElementById("form-submit").onclick = function() {
          atualizarRevista(id);
        };
      } catch (erro) {
        console.error("Erro ao editar revista:", erro);
      }
    }

    // Função para atualizar a revista
    async function atualizarRevista(id) {
      const Revista = Parse.Object.extend("Revista");
      const query = new Parse.Query(Revista);

      try {
        const revista = await query.get(id);
        revista.set("Editora", document.getElementById("editora").value);
        revista.set("Titulo", document.getElementById("titulo").value);
        revista.set("anoPublicacao", parseInt(document.getElementById("anoPublicacao").value));
        
        const resultado = await revista.save();
        alert("Revista atualizada com sucesso!");
        listarRevistas();
        document.getElementById("form-submit").onclick = criarRevista; // Reset o botão
      } catch (erro) {
        console.error("Erro ao atualizar revista:", erro);
      }
    }

    // Função para deletar uma revista
    async function deletarRevista(id) {
      const Revista = Parse.Object.extend("Revista");
      const query = new Parse.Query(Revista);

      try {
        const revista = await query.get(id);
        await revista.destroy();
        alert("Revista deletada com sucesso!");
        listarRevistas();
      } catch (erro) {
        console.error("Erro ao deletar revista:", erro);
      }
    }

    // Chama a função listarRevistas ao carregar a página
    window.onload = listarRevistas;
