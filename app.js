let myLibrary = []; // initialize empty library array

const addBookBtn = document.querySelector(".add-book-button"); // Button for add book
const submitBookBtn = document.querySelector(".submit-book"); // Button for submitBook - global

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

const bookCards = document.querySelector(".books-cards"); // Select the books-cards div

// Create elements based on key/value pairs in theHobbit Ojbect, while
// ignoring any functions within the Object
const buildCards = () => {
  let bookIndex = 0; // Set a bookID for easier access to manipulate the array
  myLibrary.forEach((bookOjbect) => {
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
            bookCard.setAttribute("id", `${bookIndex}`);
            bookCard.append(newElement);
            break;
          case "author":
            newElement.innerText = `Author: ${value}`;
            bookCard.append(newElement);
            break;
          case "pages":
            newElement.innerText = `Pages: ${value}`;
            bookCard.append(newElement);
            break;
          case "read": {
            const fragment = document.createDocumentFragment();
            const label = document.createElement("label");
            label.classList.add("switch");
            const input = document.createElement("input");
            input.classList.add("read-status");
            input.setAttribute("type", "checkbox");
            if (value === false) {
              input.checked = false;
            } else if (value === true) {
              input.checked = true;
            }
            label.appendChild(input);
            const span = document.createElement("span");
            span.classList.add("slider");
            label.appendChild(span);
            fragment.append(label);
            bookCard.append(fragment);
            break;
          }

          default:
            newElement.innerText = `${value}`;
        }
      }
      bookCards.appendChild(bookCard);
    });
    bookIndex += 1;
  });
};

buildCards();

// Display a form for add book
const displayAddBookForm = () => {
  // Display from by changing display property
  const addBookForm = document.querySelector(".add-book-form");
  addBookForm.style.display = "flex";

  // Display cancel button by changing display property
  const cancelBtn = document.querySelector(".cancel-add-book");
  cancelBtn.style.display = "inline-block";

  // Display submit button by changing display property
  submitBookBtn.style.display = "inline-block";

  // Remove add button while form is active
  const addButton = document.querySelector(".add-book-button");
  addButton.style.display = "none";
};

const clearForm = () => {
  // Select all inputs in the form
  // clear of entered values from inputs
  // Set radio buttons to unchecked
  const form = document.querySelector(".add-book-form");
  const inputs = form.querySelectorAll("input");
  Object.entries(inputs).forEach(([value]) => {
    switch (inputs[value].type) {
      case "text":
        inputs[value].value = "";
        break;
      case "radio":
        inputs[value].checked = false;
        break;
      default:
      /* do nothing */
    }
  });

  // Hide form
  form.style.display = "none";

  // Hide cancel button
  const cancelBtn = document.querySelector(".cancel-add-book");
  cancelBtn.style.display = "none";

  // Hide submit button by changing display property
  submitBookBtn.style.display = "none";

  // Re-dispaly add book button
  addBookBtn.style.display = "inline-block";
};

// Remove all conents from book-cards
function clearBooksCards() {
  const divElement = document.querySelector(".books-cards");
  while (divElement.firstChild) {
    divElement.removeChild(divElement.firstChild);
  }
}

// Iterate through inputs to obtiain user inputted values
const submitForm = () => {
  const inputs = document.querySelectorAll("input");

  let title;
  let author;
  let pages;
  let read;

  Object.entries(inputs).forEach(([value]) => {
    switch (inputs[value].type) {
      case "text":
        switch (inputs[value].name) {
          case "title":
            title = inputs[value].value;
            break;
          case "author":
            author = inputs[value].value;
            break;
          case "pages":
            pages = Number.parseInt(inputs[value].value, 10);

            break;
          default:
          /* Do Nothing */
        }
        break;
      case "radio":
        if (inputs[value].checked === true) {
          read = inputs[value].value;
        }
        break;
      default:
      /* do nothing */
    }
  });

  // Create new book object based on form inputs
  const newBook = new Book(title, author, pages, read);
  // Place in myLibrary array
  myLibrary.push(newBook);

  clearBooksCards();
  buildCards();
  clearForm();
};

// Show snackbar
function showSnackbar() {
  const snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

// When the read toggle is clicked on the card the 
// read property of the particular book is updated.
// Next, clearBookCards and and buildCards is called
// to refresh the cards
const updateReadStatus = (bookIndex) => {
  const readStatus = myLibrary[bookIndex].read;
  if (readStatus === true) {
    myLibrary[bookIndex].read = false;
  } else {
    myLibrary[bookIndex].read = true;
  }
  clearBooksCards();
  buildCards();
};

const deleteBook = (bookIndex) => {
  myLibrary = myLibrary.filter((item) => item !== bookIndex);
};

// Event listener for add book button
addBookBtn.addEventListener("click", () => {
  displayAddBookForm();
});

const cancelBtn = document.querySelector(".cancel-add-book");
cancelBtn.addEventListener("click", () => {
  clearForm();
});

// Event listener for submit book button
submitBookBtn.addEventListener("click", () => {
  submitForm();
  showSnackbar();
});

const readToggles = document.querySelectorAll(".read-status"); // Toggle for read status
// Event listener for the read toggle
readToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    const bookIndex = e.target.parentElement.parentElement.id;
    updateReadStatus(bookIndex);
  });
});
