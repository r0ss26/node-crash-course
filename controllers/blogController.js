const Blog = require('../models/blog');

const blogIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: 'All Blogs', blogs: result });
      return result;
    })
    .catch(error => {
      return error;
    });
};

const blogDetails = (req, res) => {
  Blog.findById(req.params.id)
    .then(blog =>
      res.render('single_blog', { blog: blog, title: 'Blog Details' })
    )
    .catch(error => console.log(error));
};

const blogCreateGet = (req, res) => {
  res.render('create', { title: 'Create Blog' });
};

const blogCreatePost = (req, res) => {
  const { title, snippet, body } = req.body;
  new Blog({
    title,
    snippet,
    body,
  })
    .save()
    .then(result => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    });
};

const blogDelete = (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .then(response => {
      res.send({ redirect: '/' });
    })
    .catch(error => console.log(error));
};

module.exports = {
  blogIndex,
  blogDetails,
  blogCreateGet,
  blogCreatePost,
  blogDelete,
};
