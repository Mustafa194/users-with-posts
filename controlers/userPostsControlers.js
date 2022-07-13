const asyncHandler = require('express-async-handler');
const { User, Post } = require('../models');

const CreatePost = asyncHandler(
    async (req, res) => {
        const { title, body } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.useruuid,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            const newPost = await Post.create({
                title,
                body,
                userId: user.id
            });

            res.status(200).json(newPost);
        }
        catch (error) {
            throw error;
        }
    }
);

const updatePost = asyncHandler(
    async (req, res) => {
        const { title, body } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    isDeleted: false,
                    uuid: req.params.useruuid,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            const post = await Post.findOne({
                where: {
                    isDeleted: false,
                    userId: user.id,
                    uuid: req.params.postuuid,
                }
            });

            if (!post) {
                res.status(400);
                throw new Error('Post not found');
            }

            await post.set({
                title: title ? title : post.title,
                body: body ? body : post.body,
                isDeleted: false,
            });

            await post.save();

            res.status(200).json(post);
        }
        catch (error) {
            throw error;
        }
    }
);

const updateUserDeletedPost = asyncHandler(
    async (req, res) => {
        const { title, body, isDeleted } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    isDeleted: false,
                    uuid: req.params.useruuid,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            const post = await Post.findOne({
                where: {
                    isDeleted: true,
                    userId: parseInt(user.id),
                }
            });

            if (!post) {
                res.status(400);
                throw new Error('Post not found');
            }

            await post.set({
                title: title ? title : post.title,
                body: body ? body : post.body,
                isDeleted: Boolean(isDeleted),
            });

            await post.save();

            res.status(200).json(post);
        }
        catch (error) {
            throw error;
        }
    }
);

const deletePost = asyncHandler(
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.useruuid,
                    isDeleted: false,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            const post = await Post.findOne({
                where: {
                    uuid: req.params.postuuid,
                    userId: user.id,
                    isDeleted: false,
                    include: [User],
                }
            });

            if (!post) {
                res.status(400);
                throw new Error('Post not found');
            }

            await post.set({
                isDeleted: true,
            });

            await post.save();

            res.status(200).json(post);
        }
        catch (error) {
            throw error;
        }
    }
);

const getAllUserPosts = asyncHandler(
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.useruuid,
                    isDeleted: false,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            const posts = await Post.findAll({
                where: {
                    userId: parseInt(user.id),
                    isDeleted: false,
                }
            });

            res.status(200).json(posts);
        }
        catch (error) {
            throw error;
        }
    }
);

const getOneUserPost = asyncHandler(
    async (req, res) => {

        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.useruuid,
                    isDeleted: false,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            const post = await Post.findOne({
                where: {
                    uuid: req.params.postuuid,
                    userId: parseInt(user.id),
                    isDeleted: false,
                    include: [{ model: User }],
                },
            });

            if (!post) {
                res.status(400);
                throw new Error('Post not found');
            }

            res.status(200).json(post);
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
);

const getUserDeletedPosts = asyncHandler(
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.useruuid,
                    isDeleted: false,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            const posts = await Post.findAll({
                where: {
                    userId: parseInt(user.id),
                    isDeleted: true,
                },
            });

            res.status(200).json(posts);
        }
        catch (error) {
            throw error;
        }
    }
);

module.exports = {
    CreatePost,
    updatePost,
    updateUserDeletedPost,
    deletePost,
    getAllUserPosts,
    getOneUserPost,
    getUserDeletedPosts,
};