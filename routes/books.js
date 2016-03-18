var express = require('express');
var router = express.Router();

var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://localhost/library'
  });

function books() {
  return knex('books');
}

router.get('/books', function(req, res) {
  books().select().then(function(results){
    res.render('books/index', {books: results});
  });
});

router.get('/books/new', function(req, res) {
  res.render('books/new', {book: {}});
});

router.post('/books', function(req, res) {
  var book = {
    author: req.body.author,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description
  }
  books().insert(book).then(function(result){
    res.redirect('/books');
  });
});


router.get('/books/:id', function (req, res) {
  books().where('id', req.params.id).first().then(function(result){
    res.render('books/show', { book: result });
  });
})

router.get('/books/:id/edit', function (req, res) {
  books().where('id', req.params.id).first().then(function(result){
    res.render('books/edit', { book: result });
  });
})

router.post('/books/:id', function (req, res) {
  books().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/books');
  });
});

router.post('/books/:id/delete', function (req, res) {
  books().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/books');
  })
})

module.exports = router;
