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

// Place books in array
myLibrary.push(theHobbit);
myLibrary.push(squeezeMe);

// Display myLibrary in DOM
const renderCards = (array) => {
  const booksCards = document.querySelector(".books-cards");

  array.forEach((bookObject) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    Object.entries(bookObject).forEach(([key, value]) => {
      const titleElement = document.createElement("p");
      if (typeof value === "function") {
        /* Do nothing */
      } else {
        switch (key) {
          case "title":
            titleElement.innerText = `Title: ${value}`;
            bookCard.appendChild(titleElement);

            break;
          default:
          //console.log("default");
        }
      }
      booksCards.appendChild(bookCard);
    });
  });
};

renderCards(myLibrary);
