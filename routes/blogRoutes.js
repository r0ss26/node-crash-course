const {
  blogIndex,
  blogDetails,
  blogCreateGet,
  blogCreatePost,
  blogDelete,
} = require('../controllers/blogController');

// Blog Routes
const express = require('express');
const router = express.Router();

router.get('/', blogIndex);

router.get('/create', blogCreateGet);

router.post('/', blogCreatePost);

router.get('/:id', blogDetails);

router.delete('/:id', blogDelete);

module.exports = router;
