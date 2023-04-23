let myLibrary = []; // initialize empty library array

const addBookBtn = document.querySelector(".add-book-button"); // Button for add book

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function info() {
    return `${title} by ${author}, ${pages} pages, ${read}.`;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const squeezeMe = new Book("Squeeze Me", "Carl Hiaasen", 353, true);

const bookCards = document.querySelector(".books-cards"); // Select the books-cards div

// Create elements based on key/value pairs in theHobbit Ojbect, while
// ignoring any functions within the Object
const buildCard = (bookOjbect) => {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  Object.entries(bookOjbect).forEach(([key, value]) => {
    if (typeof value === "function") {
      /* Do Nothing */
    } else {
      const newElement = document.createElement("p");
      newElement.classList.add(`${key}`);
      switch (`${key}`) {
        case "title":
          newElement.innerText = `Title: ${value}`;
          break;
        case "author":
          newElement.innerText = `Author: ${value}`;
          break;
        case "pages":
          newElement.innerText = `Pages: ${value}`;
          break;
        case "read":
          if (value === false) {
            newElement.innerText = "Not Read";
            break;
          } else {
            newElement.innerText = "Read";
            break;
          }
        default:
          newElement.innerText = `${value}`;
      }
      bookCard.append(newElement);
    }
    bookCards.appendChild(bookCard);
  });
};

buildCard(theHobbit);
buildCard(squeezeMe);

// Display a form for add book
const displayAddBookForm = () => {

};

// Event listner for add book button
addBookBtn.addEventListener("click", () => {
  displayAddBookForm();
});
