const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');

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

// mongoose and mongo sandbox routes

app.use((req, _, next) => {
  console.log('in the next middleware');
  next();
});

app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.send('<p>About Page</p>');
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});
