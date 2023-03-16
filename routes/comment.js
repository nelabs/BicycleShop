const express = require('express');

const router = express.Router();

const { postComment } = require('../controller/comment')
router.post('/comment', postComment);

module.exports = router;
