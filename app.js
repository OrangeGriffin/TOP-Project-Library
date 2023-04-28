let myLibrary = []; // initialize empty library array

// The book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function info() {
    return `${title} by ${author}, ${pages} pages, ${read}.`;
  };
}

// Create existing book objects
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const squeezeMe = new Book("Squeeze Me", "Carl Hiaasen", 353, true);

// Document querSelectors
const booksCards = document.querySelector(".books-cards");
const addBookButtons = document.querySelector(".add-book-buttons");
const addBookButton = document.querySelector(".add-book-button");
const addBookForm = document.querySelector(".add-book-form");

// Place books in array
myLibrary.push(theHobbit);
myLibrary.push(squeezeMe);

/// FUNCTIONS ///////////////////

// Display myLibrary in DOM
const renderCards = (array) => {
  array.forEach((bookObject) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    Object.entries(bookObject).forEach(([key, value]) => {
      const titleElement = document.createElement("p");
      const authorEleemnt = document.createElement("p");
      const pagesElement = document.createElement("p");
      const readElement = document.createElement("p");
      if (typeof value === "function") {
        /* Do nothing */
      } else {
        switch (key) {
          case "title":
            titleElement.innerText = `Title: ${value}`;
            bookCard.appendChild(titleElement);

            break;
          case "author":
            authorEleemnt.innerText = `Author: ${value}`;
            bookCard.appendChild(authorEleemnt);
            break;
          case "pages":
            pagesElement.innerText = `Pages: ${value}`;
            bookCard.appendChild(pagesElement);
            break;
          case "read":
            readElement.innerText = `Read: ${value}`;
            bookCard.appendChild(readElement);
            break;

          default:
          /* Do nothing */
        }
      }
      booksCards.appendChild(bookCard);
    });
  });
};

// Display existing books
renderCards(myLibrary);

// Function to re-render the books array
const reRender = () => {
  booksCards.innerText = "";
  renderCards(myLibrary);
};

const displayAddBookForm = () => {
  addBookButton.style.display = "none";

  addBookForm.style.display = "flex";

  const submitBtn = document.querySelector(".submit-book");
  submitBtn.style.display = "flex";

  const cancelBtn = document.querySelector(".cancel-add-book");
  cancelBtn.style.display = "flex";
};

const addBook = () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  let read = document.querySelector("#hasRead");

  if (read.checked) {
    read = true;
  } else {
    read = false;
  }

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
};

addBookButtons.addEventListener("click", (e) => {
  const submitBtn = document.querySelector(".submit-book");
  const cancelBtn = document.querySelector(".cancel-add-book");

  switch (e.target.className) {
    case "add-book-button":
      displayAddBookForm();
      break;
    case "submit-book":
      addBook();
      reRender();

      submitBtn.style.display = "none";
      cancelBtn.style.display = "none";

      addBookButton.style.display = "flex";
      addBookForm.style.display = "none";
      break;
    case "cancel-add-book":
      submitBtn.style.display = "none";
      cancelBtn.style.display = "none";

      addBookButton.style.display = "flex";
      addBookForm.style.display = "none";
      document.querySelector("#title").value = ""
      document.querySelector("#author").value = ""
      document.querySelector("#pages").value = ""
      document.querySelector("#hasRead").checked = false
      document.querySelector("#notRead").checked = false;
      break;
    default:
    /* Do Nothing */
  }
});
