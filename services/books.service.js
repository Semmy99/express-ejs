const defaultBook = [{
  id: "1",
  title: "Дефолтная книга/заглушка 1",
  description: "Описание книги заглушки",
  authors: "Автор книги заглушки",
  favorite: "Автор книги заглушки",
  fileCover: "Автор книги заглушки",
  fileName: "Имя книги заглушки"
}, {
  id: "2",
  title: "Дефолтная книга/заглушка 2",
  description: "Описание книги заглушки",
  authors: "Автор книги заглушки",
  favorite: "Автор книги заглушки",
  fileCover: "Автор книги заглушки",
  fileName: "Имя книги заглушки"
}, {
  id: "3",
  title: "Дефолтная книга/заглушка 3",
  description: "Описание книги заглушки",
  authors: "Автор книги заглушки",
  favorite: "Автор книги заглушки",
  fileCover: "Автор книги заглушки",
  fileName: "Имя книги заглушки"
}
]

class Books {
  constructor(defaulBook) {
    this.books = defaulBook;
  }

  getBooks() {
    return this.books;
  }

  getCurrentBook(id) {
    const match = this.books.find((b) => String(b.id) === String(id));
    if (match) return match;
    return false;
  }

  createBook(data) {
    this.books.push(data);
  }

  updateBook(id, data) {
    let updatedBook = {}
    this.books = this.books.map((b) => {
      if (String(b.id) === String(id)) {
        updatedBook = { id, ...data }
        return { id, ...data };
      }
      return b;
    });
    return updatedBook
  }

  deleteBook(id) {
    this.books = this.books.filter((b) => String(b.id) !== String(id));
  }
}

const books = new Books(defaultBook);

module.exports = books;