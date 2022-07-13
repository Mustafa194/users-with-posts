const express = require('express');

const usersRoute = require('./api/usersRoute');
const postsRoute = require('./api/postsRoute');
const userPostsRoute = require('./api/userPostsRoute');

const router = express.Router();

// Routes
router.use('/api/users', usersRoute);
router.use('/api/posts', postsRoute);
router.use('/api/users/user', userPostsRoute);

module.exports = router;