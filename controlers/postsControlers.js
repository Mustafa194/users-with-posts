const asyncHandler = require('express-async-handler');
const { Post } = require('../models')

const getAllPosts = asyncHandler(
    async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {
                    isDeleted: false,
                },
                // attributes: {
                //     exclude: ['id'],
                // }
            });

            res.status(200).json(posts);
        }
        catch (error) {
            throw error;
        }
    }
);

const getOnePost = asyncHandler(
    async (req, res) => {
        try {
            const post = await Post.findOne({
                where: {
                    uuid: req.params.uuid,
                    isDeleted: false
                }
            });

            if (!post) {
                res.statusCode = 400;
                throw new Error("Post not found");
            }

            res.json(post);
        }
        catch (error) {
            throw error;
        }
    }
);

const adminDeletePost = asyncHandler(
    async (req, res) => {
        try {
            const post = await Post.findOne({
                where: {
                    uuid: req.params.uuid,
                }
            });

            if (!post) {
                res.statusCode = 400;
                throw new Error("Post not found");
            }

            post.set({
                isDeleted: true,
            });

            await post.save();

            res.json(post);
        }
        catch (error) {
            throw error;
        }
    }
);

module.exports = {
    getAllPosts,
    getOnePost,
    adminDeletePost,
};