var express = require('express');
var router = express.Router();

var knex = require('knex')({
    client: 'pg',
    connection: 'postgres://localhost/library'
  });

function books() {
  return knex('books');
}

router.get('/books', function(req, res, next) {
  books().select().then(function(results){
    res.render('books/index', {books: results});
  }, next);
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/books', function(req, res, next) {
  var book = {
    author: req.body.author,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description
  }
  books().insert(book).then(function(result){
    res.redirect('/books');
  }, next);
});


router.get('/books/:id', function (req, res, next) {
  books().where('id', req.params.id).first().then(function(result){
    res.render('books/show', { book: result });
  }, next);
})

router.get('/books/:id/edit', function (req, res, next) {
  books().where('id', req.params.id).first().then(function(result){
    res.render('books/edit', { book: result });
  }, next);
})

router.post('/books/:id', function (req, res, next) {
  books().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/books');
  }, next);
});

router.post('/books/:id/delete', function (req, res, next) {
  books().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/books');
  }, next)
})

module.exports = router;
