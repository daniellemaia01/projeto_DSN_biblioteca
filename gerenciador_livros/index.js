const Parse = require('parse/node');

// Configurar o Parse com as credenciais do Back4App
Parse.initialize("Htgt1cI2V7wheRedEfnDi7uue4RtE2L1S8BCtuNp", "hwIBpuEm9aLgqn21bTYBoL0XT0SZxbr5oRtv9iSG");
Parse.serverURL = 'https://parseapi.back4app.com/';

// Exemplo de criação de um novo objeto
const Book = Parse.Object.extend("Book");
const book = new Book();

book.set("title", "O Senhor dos Anéis");
book.set("author", "J.R.R. Tolkien");

book.save().then((book) => {
  console.log('Novo livro salvo com sucesso:', book);
}).catch((error) => {
  console.error('Erro ao salvar o livro:', error);
});
