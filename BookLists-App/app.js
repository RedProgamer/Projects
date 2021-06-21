class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

// UI Contructor
class UI {
    addBookToLists(book) {
        const bookLists = document.querySelector('#book-list');
        
        const row = document.createElement('tr');

        // Insert Columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `

        bookLists.appendChild(row);
    } 

    static showAlert(msg, classNames) {
        const errorDiv = document.createElement('div');
        errorDiv.className = `alert ${classNames}`;

        // Add text node
        errorDiv.appendChild(document.createTextNode(msg));

        // Get Parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        // Insert Alert
        container.insertBefore(errorDiv, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className == 'delete') {    
            target.parentElement.parentElement.remove();

            UI.showAlert('Book Removed!', 'success');
        }
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
};

class Storage {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else
            books = JSON.parse(localStorage.getItem('books'));
        
        return books;
    }
    
    static displayBooks() {
        const books = Storage.getBooks();

        books.forEach(function(book) {
            const ui = new UI();
            
            // Adding book to the UI List
            ui.addBookToLists(book);
        });
    };

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    };

    static removeBook(isbn) {
        const books = Storage.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn == isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    };
};

// DOM Load Event
document.addEventListener('DOMContentLoaded', Storage.displayBooks);

// Event Listener
document.querySelector('#book-form').addEventListener('submit', function(e) {
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;
    
    console.log(title, author, isbn);

    // Initializing the book
    const book = new Book(title, author, isbn);
    const ui = new UI();

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'error');
    }else {
        // Add books to the lists
        ui.addBookToLists(book);

        // Add Book to localStorage
        Storage.addBook(book);
        
        // Show success alert message
        UI.showAlert('Book Added!', 'success');
        
        // Clear Input Fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for removing book
document.querySelector('#book-list').addEventListener('click', function(e) {    
    const ui = new UI();
    
    ui.deleteBook(e.target);

    // Remove from localStorage
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
});

