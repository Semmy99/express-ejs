const books = require('./services/books.service');
const { booksRouter } = require('./routes/books.router');
const { usersRouter } = require('./routes/users.router');
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use("/api/user", usersRouter);
app.use("/api/books", booksRouter);

app.get("/", function (req, res) {
  res.render('index.ejs', books);
})
app.get("/create", function (req, res) {
  res.render('create.ejs', books);
})

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const currentBook = books.getCurrentBook(id)
  if (!currentBook) {
    res.redirect('/');
    return
  }
  res.render('update.ejs', { book: books.getCurrentBook(id), path:"update" });
})
app.get('/view/:id', (req, res) => {
  const { id } = req.params;
  const currentBook = books.getCurrentBook(id)
  if (!currentBook) {
    res.redirect('/');
    return
  }
  res.render('update.ejs', { book: books.getCurrentBook(id), path:"view" });
})

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});