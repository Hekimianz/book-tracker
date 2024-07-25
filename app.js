const searchBookForm = document.querySelector("#searchBookForm");
const newBookBtn = document.querySelector("#newBookBtn");
const confirmBookBtn = document.querySelector("#addBookBtn");
const shelf = document.querySelector("#shelf");
const books = JSON.parse(localStorage.getItem("books")) || [];
let deleteBtns = document.querySelectorAll(".deleteBtn");
let readChecks = shelf.querySelectorAll("input");
if (books) renderBooks(books);

function Book(title, author, pages, status, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = id;
}

newBookBtn.addEventListener("click", () => {
  searchBookForm.style.display = "flex";
  newBookBtn.style.display = "none";
});

searchBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInp = document.querySelector("#bookTitleInp").value;
  const authInp = document.querySelector("#bookAuthInp").value;
  const pageInp = document.querySelector("#bookPageInp").value;
  if (!titleInp || !authInp || !pageInp) return null;
  const newBook = new Book(
    titleInp,
    authInp,
    pageInp,
    0,
    books.length <= 0 ? 0 : books.length
  );
  searchBookForm.style.display = "none";
  newBookBtn.style.display = "block";
  books.push(newBook);
  renderBooks(books);
  searchBookForm.reset();
});

function renderBooks(books) {
  shelf.innerHTML = "";
  books.forEach((book) => {
    const cont = document.createElement("div");
    cont.classList.add("book");
    const title = document.createElement("h2");
    title.innerText = book.title;
    const author = document.createElement("p");
    author.innerText = book.author;
    const pages = document.createElement("span");
    pages.innerText = `${book.pages} pages`;
    const bookBtns = document.createElement("div");
    bookBtns.classList.add("bookBtns");
    const readCheck = document.createElement("input");
    readCheck.setAttribute("type", "checkbox");
    readCheck.setAttribute("name", "readStatus");
    readCheck.checked = book.status === 1;
    readCheck.classList.add(`${book.id}`);
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("material-symbols-outlined");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.classList.add(`${book.id}`);
    deleteBtn.innerText = "delete_forever";
    cont.appendChild(title);
    cont.appendChild(author);
    cont.appendChild(pages);
    cont.appendChild(bookBtns);
    bookBtns.appendChild(readCheck);
    bookBtns.appendChild(deleteBtn);
    shelf.appendChild(cont);
    localStorage.setItem("books", JSON.stringify(books));
    deleteBtns = document.querySelectorAll(".deleteBtn");
    readChecks = shelf.querySelectorAll("input");
    addDeleteHandlers();
    addCheckHandlers();
  });
}

function addDeleteHandlers() {
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      books.splice(btn.classList[2], 1);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks(books);
    });
  });
}

function addCheckHandlers() {
  readChecks.forEach((check) => {
    check.addEventListener("change", () => {
      const id = check.classList[0];
      check.checked ? (books[id].status = 1) : (books[id].status = 0);
      localStorage.setItem("books", JSON.stringify(books));
    });
  });
}
