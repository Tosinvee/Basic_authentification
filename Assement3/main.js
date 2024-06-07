import Book from "./book.js";
import User from "./user.js";
import Library from "./library.js";

const myLibrary = new Library();

// Add Books
const book1 = new Book("The Story of my life", "Bayode_oluwatosin", "81699203");
const book2 = new Book("jesus loves you", "Folashade_Feranmi", "20039188");

myLibrary.addBook(book1);
myLibrary.addBook(book2);

// Add Users
const user1 = new User("Busayo", "001");
const user2 = new User("Tunde", "002");

myLibrary.addUser(user1);
myLibrary.addUser(user2);

// Borrow a Book
myLibrary.borrowBook("001", "81699203");

// Check Book Availability
console.log(myLibrary.isBookAvailable("81699203")); // false

// Return a Book
myLibrary.returnBook("001", "81699203");

// Check Book Availability
console.log(myLibrary.isBookAvailable("81699203")); // true

// Search for a Book
//console.log(myLibrary.searchBook("Gatsby")); // [ book1 ]

// Search for a User
//console.log(myLibrary.searchUser("Tunde")); // [ user1 ]

// Output Book and User Details using template literals
console.log(book1.getDetails());
console.log(user1.getDetails());

// Get all books and users
console.log(myLibrary.getAllBooks()); // [ book1, book2 ]
console.log(myLibrary.getAllUsers()); // [ user1, user2 ]
