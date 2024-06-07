import Book from "./book.js";
import User from "./user.js";

class Library {
  constructor() {
    this.books = [];
    this.users = [];
  }
  // add a boook
  addBook(book) {
    this.books.push(book);
  }

  //remove a boook
  removeBook(isbn) {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }
  // search for a book
  searchBook(query) {
    return this.books.filter(
      (book) =>
        book.title.includes(query) ||
        book.author.includes(query) ||
        book.isbn.includes(query)
    );
  }

  // add user
  addUser(user) {
    this.users.push(user);
  }
  // remove a user
  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }
  // search for a user
  searchUser(query) {
    return this.users.filter(
      (user) => user.name.includes(query) || user.id.includes(query)
    );
  }
  // borrow a book
  borrowBook(userId, isbn) {
    const findUser = this.users.find((user) => user.id === userId);
    const findBook = this.books.find(
      ({ isbn: bookIsbn, isAvailable }) => bookIsbn === isbn && isAvailable
    );

    if (findUser && findBook) {
      findUser.borrowedBooks = [...findUser.borrowedBooks, findBook];
      findBook.isAvailable = false;
      return true;
    }
    return false;
  }
  // return a book
  returnBook(userId, isbn) {
    const findUser = this.users.find((user) => user.id === userId);
    const findBook = this.books.find(({ isbn: bookIsbn }) => bookIsbn === isbn);

    if (findUser && findBook) {
      findUser.borrowedBooks = findUser.borrowedBooks.filter(
        ({ isbn: borrowedIsbn }) => borrowedIsbn !== isbn
      );
      findBook.isAvailable = true;
      return true;
    }
    return false;
  }
  // check if a book is available
  isBookAvailable(isbn) {
    const book = this.books.find(({ isbn: bookIsbn }) => bookIsbn === isbn);
    return book ? book.isAvailable : false;
  }

  getAllBooks() {
    return [...this.books]; // using a spread operator to return a copy of the book array
  }

  getAllUsers() {
    return [...this.users]; //
  }
}

export default Library;
