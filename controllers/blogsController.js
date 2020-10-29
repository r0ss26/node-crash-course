const Blog = require('../models/blog');

const blogIndex = (req, res, next) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render('blogs/index2', { title: 'All Blogs', blogs: result });
      return result;
    })
    .catch(next);
};

const blogDetails = (req, res) => {
  Blog.findById(req.params.id)
    .then(blog =>
      res.render('blogs/single_blog', { blog: blog, title: 'Blog Details' })
    )
    .catch(err => res.status(404).render('404', { title: 'Blog not found' }));
};

const blogCreateGet = (req, res) => {
  res.render('blogs/create', { title: 'Create Blog' });
};

const blogCreatePost = (req, res) => {
  const { title, snippet, body } = req.body;
  new Blog({
    title,
    snippet,
    bod,
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
