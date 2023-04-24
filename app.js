const myLibrary = []; // initialize empty library array

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

  clearForm();
};

// Show snackbar
function showSnackbar() {
  const snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  setTimeout( ()=> {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

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
