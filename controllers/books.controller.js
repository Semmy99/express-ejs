const books = require('../services/books.service');
const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const keys = [
  "id",
  "title",
  "description",
  "authors",
  "favorite",
  "fileCover",
  "fileName",
  "fileBook",
]

class BooksController {
  getBooks(req, res) {
    return res.status(200).send(books.getBooks())
  }

  getCurrentBook(req, res) {
    const { id } = req.params
    if (!id) {
      res.status(400).send({ status: 400, message: "Укажите id книги" });
      return
    }
    const hasId = books.getBooks().find(b => String(b.id) === String(id))
    if (!hasId) {
      res.status(400).send({ status: 400, message: "id с такой книгой не сущесвует" });
      return
    }

    res.send(books.getCurrentBook(id))
  }

  getFile(req, res) {
    const { id } = req.params
    if (!id) {
      res.status(400).send({ status: 400, message: "Укажите id книги" });
      return
    }
    const hasId = books.getBooks().find(b => String(b.id) === String(id))
    if (!hasId) {
      res.status(400).send({ status: 400, message: "id с такой книгой не сущесвует" });
      return
    }

    if (!hasId.extFile) return
    res.download(path.resolve(`./uploads/${id}.${hasId.extFile}`));
  }

  createBook(req, res) {
    let isErr = false
    Object.keys(req.body).forEach(d => {
      if (isErr) return
      const hasOtherKey = keys.includes(d)
      if (!hasOtherKey) isErr = true
    })
    if (isErr) {
      res.status(400).send({ status: 400, message: "Некорректные данные" });
      return
    }
    const hasId = books.getBooks().find(b => String(b.id) === String(req.body.id))
    console.log("req.body", req.body);
    console.log("hasId", hasId);
    if (hasId) {
      res.status(400).send({ status: 400, message: "Книга с таким id уже существует" });
      return
    }
    let body = req.body
    if (req?.file) {
      const { originalname } = req?.file;
      const lastEl = originalname?.split(".").length - 1
      const extFile = originalname.split(".")[lastEl]
      body = { ...body, extFile };
    }
    books.createBook(body)
    res.send({ status: 200, message: "Книга создана" });
  }

  updateBook(req, res) {
    const { id } = req.params
    if (!id) {
      res.status(400).send({ status: 400, message: "Укажите id книги" });
      return
    }
    const hasId = books.getBooks().find(b => String(b.id) === String(id))

    if (!hasId) {
      res.status(400).send({ status: 400, message: "id с такой книгой не сущесвует" });
      return
    }
    res.send(books.updateBook(id, req.body))
  }

  deleteBook(req, res) {
    const { id } = req.params
    if (!id) {
      res.status(400).send({ status: 400, message: "Укажите id книги" });
      return
    }
    const hasId = books.getBooks().find(b => String(b.id) === String(id))
    if (!hasId) {
      res.status(400).send({ status: 400, message: "id с такой книгой не сущесвует" });
      return
    }

    books.deleteBook(id)
    res.send({ status: 200, message: "Книга удалена" });
  }
}

const booksController = new BooksController()

module.exports = booksController