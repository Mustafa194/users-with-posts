const express = require('express');
const router = express.Router();

const {
    getAllPosts,
    getOnePost,
    adminDeletePost,
} = require('../../controlers/postsControlers');

// Get all posts
router.route('/').get(getAllPosts);

// Get one post by uuid or admin deletes one post by uuid
router.route('/:uuid').get(getOnePost).delete(adminDeletePost);

module.exports = router;