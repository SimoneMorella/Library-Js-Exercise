const cardBox = document.querySelector("#book-box");
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('#closeBtn');
const showBtn = document.querySelector('#showDialog');

showBtn.addEventListener('click', () => {
    dialog.showModal();
    dialog.classList.add('dialogInit');
    setTimeout(() => {
        dialog.classList.remove('dialogInit');
        dialog.classList.add('dialogActive');
    },50)
})

closeBtn.addEventListener('click', () => {
    dialog.classList.remove('dialogActive');
    dialog.classList.add('dialogExit');
    setTimeout(() => {
        dialog.classList.remove('dialogExit');
        dialog.close();

    },320)
})


let myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(event) {
    event.preventDefault();
    const form = document.querySelector("#form");
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const bookPages = document.querySelector("#pages");
    const bookRead = document.querySelector("#read");
    const isRead = bookRead.checked;
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead);
    myLibrary.push(newBook);
    
    form.reset();
    while(cardBox.firstChild) {
        cardBox.removeChild(cardBox.firstChild);
    }
    showTable();
    dialog.close();
}

function showTable() {
    myLibrary.forEach((book, index) => {
        let card = document.createElement('div');
        card.dataset.index = index;
        card.classList.add('card');
        let cardTitle = document.createElement('div');
        cardTitle.textContent = `Title:  "${book.title}"`;
        cardTitle.classList.add('title');
        let cardAuthor = document.createElement('div');
        cardAuthor.textContent = `Author:   "${book.author}"`;
        cardAuthor.classList.add('title');
        let cardPages = document.createElement('div');
        cardPages.textContent = `Pages:   ${book.pages}`;
        cardPages.classList.add('title');
        let cardBtns = document.createElement('div');
        let cardRead = document.createElement('div');
        cardRead.textContent = book.read ? 'Read' : 'Not Read';
        cardBtns.classList.add('cardBtns');
        cardRead.setAttribute('id', 'read');
        cardRead.setAttribute('class', index);
        cardRead.addEventListener('click', function() {
            cardRead.textContent = cardRead.textContent === 'Read' ? 'Not Read': 'Read';
            myLibrary[index]['read'] = !myLibrary[index]['read'];
        })
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.setAttribute('id', index);
        removeBtn.classList.add('remove');
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        cardBtns.appendChild(cardRead);
        cardBtns.appendChild(removeBtn);
        card.appendChild(cardBtns);
        cardBox.appendChild(card);
        removeBtn.addEventListener('click', function(event) {
            removeCard(event);
        });
    })
}

function removeCard(event) {
    let cardToRemove = document.querySelector(`[data-index = "${event.target.id}"]`)
    cardToRemove.remove();
    myLibrary.splice(event.target.id, 1);
}


if (myLibrary.length !== 0) {
    showTable();
} 