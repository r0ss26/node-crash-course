const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { urlencoded } = require('express');

// express app
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    console.log('MongoDB connected');
    app.listen(3000);
  })
  .catch(error => {
    console.log(error);
  });

// register template engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
// mongoose and mongo sandbox routes
// app.get('/blogs/new', (req, res) => {
//   const blog = new Blog({
//     title: 'New Blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });
//   blog
//     .save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(error => console.log(error));
// });

// app.get('/blogs', (req, res) => {
//   Blog.find()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(error => console.log(error));
// });

// app.get('/blogs/single', (req, res) => {
//   Blog.findById('5f7fc4e2ff229164890b669d')
//     .then((result) => {
//       res.send(result)
//     })
//     .catch(error => console.log(error))
// })

app.get('/', (req, res) => {
  // const blogs = [
  //   {
  //     title: 'Yoshi finds eggs',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'Mario finds stars',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'How to defeat bowser',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  // ];
  // res.render('index', { title: 'Home', blogs });
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>About Page</p>');
  res.render('about', { title: 'About' });
});

// Blog Routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      console.log(result);
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

app.post('/blogs', (req, res) => {
  const { title, snippet, body } = req.body;

  new Blog({
    title,
    snippet,
    body,
  })
    .save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch(error => {
      console.log(error);
    })
});

app.get('/blog/:id', (req, res) => {
  console.log(req.params.id)
  Blog.findById(req.params.id)
    .then(blog => res.render('single_blog', { blog: blog, title: 'Blog Details' }))
    .catch(error => console.log(error))
})

app.delete('/blog/:id', (req, res) => {
  console.log(req.params.id)
  Blog.deleteOne({_id: req.params.id })
    .then(response => {
      result => console.log(result)
      res.send({redirect: '/blogs'})
    })
    .catch(error => console.log(error))
})

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


