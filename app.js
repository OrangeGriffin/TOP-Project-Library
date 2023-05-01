const myLibrary = []; // initialize empty library array

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
const addBookInputs = document.querySelector(".add-book-inputs");

// Place books in array
myLibrary.push(theHobbit);
myLibrary.push(squeezeMe);

/// FUNCTIONS ///////////////////

// Display myLibrary in DOM
const renderCards = (array) => {
  let bookId = 0;
  array.forEach((bookObject) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    Object.entries(bookObject).forEach(([key, value]) => {
      const titleElement = document.createElement("p");
      const authorEleemnt = document.createElement("p");
      const pagesElement = document.createElement("p");
      const readDiv = document.createElement("div")
      const readElementText = document.createElement("p");
      const readElement = document.createElement("label");

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
            readDiv.classList.add("read-div")
            readElementText.innerText = "Read:";
            readElement.classList.add("read-status");
            readElement.classList.add("switch");
            if (value === true) {
              readElement.classList.add("switch-on");
            }
            readDiv.appendChild(readElementText)
            readDiv.appendChild(readElement);
            bookCard.appendChild(readDiv);
            break;

          default:
          /* Do nothing */
        }
      }
    });
    const trashIcon = document.createElement("img");
    trashIcon.classList.add("delete-book");
    trashIcon.src = "./images/trash-can-outline.svg";
    bookCard.setAttribute("id", bookId);
    bookCard.appendChild(trashIcon);
    booksCards.appendChild(bookCard);
    bookId += 1;
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

  addBookInputs.style.display = "flex";

  const submitBtn = document.querySelector(".submit-book");
  submitBtn.style.display = "flex";

  const cancelBtn = document.querySelector(".cancel-add-book");
  cancelBtn.style.display = "flex";
};

const isValid = (input) => input.validity.valid;

const checkInputs = (inputs) => {
  const inputsArray = Array.from(inputs);
  return inputsArray.every(isValid);
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

const deleteBook = (bookIndex) => {
  myLibrary.splice(bookIndex, 1);
  reRender();
};

const updateReadStatus = (target, bookIndex) => {
  if (target.classList.contains("switch-on")) {
    target.classList.remove("switch-on");
    myLibrary[bookIndex].read = false;
  } else {
    target.classList.add("switch-on");
    myLibrary[bookIndex].read = true;
  }
};

addBookButtons.addEventListener("click", (e) => {
  e.preventDefault();
  const submitBtn = document.querySelector(".submit-book");
  const cancelBtn = document.querySelector(".cancel-add-book");
  const inputs = document.querySelectorAll("input");

  switch (e.target.className) {
    case "add-book-button":
      displayAddBookForm();
      break;
    case "submit-book":
      if (!checkInputs(inputs)) {
        break;
      } else {
        addBook();
        reRender();
        inputs.forEach((input) => {
          const blankValue = input;
          blankValue.value = "";
          blankValue.checked = false;
        });
      }

      submitBtn.style.display = "none";
      cancelBtn.style.display = "none";

      addBookButton.style.display = "flex";
      addBookInputs.style.display = "none";

      break;
    case "cancel-add-book":
      submitBtn.style.display = "none";
      cancelBtn.style.display = "none";

      addBookButton.style.display = "flex";
      addBookInputs.style.display = "none";
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      document.querySelector("#pages").value = "";
      document.querySelector("#hasRead").checked = false;
      document.querySelector("#notRead").checked = false;
      break;
    default:
    /* Do Nothing */
  }
});

booksCards.addEventListener("click", (e) => {
  const bookIndex = e.target.parentElement.id;
  if (e.target.className === "delete-book") {
    deleteBook(bookIndex);
  } else if (e.target.classList.contains("switch")) {
    updateReadStatus(e.target, bookIndex);
  }
});
