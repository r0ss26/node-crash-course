const express = require('express');
const morgan = require('morgan');
// express app
const app = express();

// register template engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.use(morgan('dev'))

app.use((req, _, next) => {
 console.log('in the next middleware');
 next(); 
})

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
  res.status(404).render('404', { title: '404'});
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});
