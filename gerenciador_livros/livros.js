document.addEventListener('DOMContentLoaded', function() {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const bookIdInput = document.getElementById('bookId');

    // Função para criar um item de lista de livro
    function createBookItem(id, title, author) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.dataset.id = id;

        listItem.innerHTML = `
            <span>${title} por ${author}</span>
            <button class="btn btn-danger btn-sm">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        listItem.querySelector('button').addEventListener('click', function() {
            removeBook(id);
        });

        return listItem;
    }

    // Função para adicionar um livro à lista
    function addBook(event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const id = bookIdInput.value ? bookIdInput.value : Date.now();

        if (title && author) {
            if (bookIdInput.value) {
                // Editar livro existente
                const existingItem = document.querySelector(`li[data-id="${id}"]`);
                existingItem.innerHTML = `
                    <span>${title} por ${author}</span>
                    <button class="btn btn-danger btn-sm">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                existingItem.querySelector('button').addEventListener('click', function() {
                    removeBook(id);
                });
            } else {
                // Adicionar novo livro
                const bookItem = createBookItem(id, title, author);
                bookList.appendChild(bookItem);
            }

            // Limpar o formulário
            titleInput.value = '';
            authorInput.value = '';
            bookIdInput.value = '';
        }
    }

    // Função para remover um livro
    function removeBook(id) {
        const itemToRemove = document.querySelector(`li[data-id="${id}"]`);
        if (itemToRemove) {
            itemToRemove.remove();
        }
    }

    // Adicionar evento de submit ao formulário
    bookForm.addEventListener('submit', addBook);
});
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o Parse com as credenciais do Back4App
    Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY"); // Substitua com seu APP_ID e JAVA_SCRIPT_KEY
    Parse.serverURL = 'https://parseapi.back4app.com/';

    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const bookIdInput = document.getElementById('bookId');

    // Função para criar um item de lista de livro
    function createBookItem(book) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.dataset.id = book.id;

        listItem.innerHTML = `
            <span>${book.get('title')} por ${book.get('author')}</span>
            <button class="btn btn-danger btn-sm">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        listItem.querySelector('button').addEventListener('click', function() {
            removeBook(book.id);
        });

        return listItem;
    }

    // Função para adicionar um livro à lista
    async function addBook(event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const id = bookIdInput.value;

        if (title && author) {
            const Book = Parse.Object.extend("Book");
            const query = new Parse.Query(Book);

            if (id) {
                // Editar livro existente
                try {
                    const book = await query.get(id);
                    book.set("title", title);
                    book.set("author", author);
                    await book.save();
                    updateBookItem(book);
                } catch (error) {
                    console.error('Erro ao atualizar o livro:', error);
                }
            } else {
                // Adicionar novo livro
                try {
                    const book = new Book();
                    book.set("title", title);
                    book.set("author", author);
                    await book.save();
                    const bookItem = createBookItem(book);
                    bookList.appendChild(bookItem);
                } catch (error) {
                    console.error('Erro ao salvar o livro:', error);
                }
            }

            // Limpar o formulário
            titleInput.value = '';
            authorInput.value = '';
            bookIdInput.value = '';
        }
    }

    // Função para atualizar um item de livro na lista
    function updateBookItem(book) {
        const existingItem = document.querySelector(`li[data-id="${book.id}"]`);
        if (existingItem) {
            existingItem.innerHTML = `
                <span>${book.get('title')} por ${book.get('author')}</span>
                <button class="btn btn-danger btn-sm">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            existingItem.querySelector('button').addEventListener('click', function() {
                removeBook(book.id);
            });
        }
    }

    // Função para remover um livro
    async function removeBook(id) {
        const Book = Parse.Object.extend("Book");
        const query = new Parse.Query(Book);

        try {
            const book = await query.get(id);
            await book.destroy();
            const itemToRemove = document.querySelector(`li[data-id="${id}"]`);
            if (itemToRemove) {
                itemToRemove.remove();
            }
        } catch (error) {
            console.error('Erro ao remover o livro:', error);
        }
    }

    // Função para carregar todos os livros ao iniciar a página
    async function loadBooks() {
        const Book = Parse.Object.extend("Book");
        const query = new Parse.Query(Book);

        try {
            const results = await query.find();
            results.forEach(book => {
                const bookItem = createBookItem(book);
                bookList.appendChild(bookItem);
            });
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }

    // Adicionar evento de submit ao formulário
    bookForm.addEventListener('submit', addBook);

    // Carregar todos os livros ao iniciar a página
    loadBooks();
});
