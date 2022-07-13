const express = require('express');

const router = express.Router();

const {
    CreatePost,
    updatePost,
    updateUserDeletedPost,
    deletePost,
    getAllUserPosts,
    getOneUserPost,
    getUserDeletedPosts,
} = require('../../controlers/userPostsControlers');

// Get user's deleted posts
router.route('/:useruuid/deletedposts').get(getUserDeletedPosts);

// Update user's deleted post
router.route('/:useruuid/deletedposts/:postuuid').put(updateUserDeletedPost);

// Get or create post for specific user
router.route('/:useruuid/posts').get(getAllUserPosts).post(CreatePost);

// Get, update, or delete on post for specific user
router.route('/:useruuid/:postuuid').get(getOneUserPost).put(updatePost).delete(deletePost);

module.exports = router;