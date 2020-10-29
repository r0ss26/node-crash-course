require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const blogRoutes = require('./routes/blogRoutes');

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

app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('blogs/about', { title: 'About' });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Something broke!');
})


