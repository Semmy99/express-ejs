const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');
const multer = require('multer')
const path = require('path')
const fs = require('fs');

const filesPath = path.resolve('uploads/');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(filesPath)) {
      fs.mkdirSync(filesPath, { recursive: true });
    }
    cb(null, filesPath)
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

router.get('/', (req, res) => {
  booksController.getBooks(req, res)
})

router.get('/:id/download', (req, res) => {
  booksController.getFile(req, res)
})

router.get('/:id', (req, res) => {
  booksController.getCurrentBook(req, res)
})

router.post('/', upload.single("file"), (req, res) => {
  booksController.createBook(req, res);
})

router.put('/:id',  upload.single("file"), (req, res) => {
  booksController.updateBook(req, res)
})

router.delete('/:id', (req, res) => {
  booksController.deleteBook(req, res)
});

module.exports = { booksRouter: router };

