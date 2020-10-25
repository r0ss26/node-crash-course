// Blog Routes
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

router.post('/', (req, res) => {
  const { title, snippet, body } = req.body;
  new Blog({
    title,
    snippet,
    body,
  })
    .save()
    .then(result => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.render('single_blog', { blog: blog, title: 'Blog Details' }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  Blog.deleteOne({_id: req.params.id })
    .then(response => {
      res.send({redirect: '/blogs'})
    })
    .catch(error => console.log(error))
})

module.exports = router;