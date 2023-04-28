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
  addBookForm.style.display = "flex";
};

addBookButton.addEventListener("click", displayAddBookForm);
