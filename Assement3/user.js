class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.borrowedBooks = [];
  }

  getDetails() {
    return `User: ${this.name}, ID: ${this.id}, Borrowed Books: ${this.borrowedBooks.length}`;
  }
}

export default User;
