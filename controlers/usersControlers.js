const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const getAllUsers = asyncHandler(
    async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    isDeleted: false,
                },
                // attributes: {
                //     exclude: ['id'],
                // }
            });

            res.status(200).json(users);
        }
        catch (error) {
            throw error;
        }
    }
);

const CreateUser = asyncHandler(
    async (req, res) => {
        const { name, email, role } = req.body;

        try {
            const newUser = await User.create({ name, email, role });

            res.json(newUser);
        }
        catch (error) {
            throw error;
        }
    }
);

const getOneUser = asyncHandler(
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.uuid,
                    isDeleted: false,
                }
            });

            if (!user) {
                res.statusCode = 400;
                throw new Error("User not found");
            }

            res.json(user);
        }
        catch (error) {
            throw error;
        }
    }
);

const updateUser = asyncHandler(
    async (req, res) => {
        const { name: userName, email: userEmail, role: userRole, isDeleted } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.uuid,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            await user.set({
                name: userName ? userName : user.name,
                email: userEmail ? userEmail : user.email,
                role: userRole ? userRole : user.role,
            });

            // only for admins
            if (!req.url.includes('/user')) {
                await user.set({
                    isDeleted: Boolean(isDeleted),
                });
            }

            await user.save();

            res.status(200).json(user);
        }
        catch (error) {
            throw error;
        }
    }
);

const deleteUser = asyncHandler(
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.uuid,
                }
            });

            if (!user) {
                res.status(400);
                throw new Error('User not found');
            }

            user.set({
                isDeleted: true,
            });

            await user.save();

            res.status(200).json(user);
        }
        catch (error) {
            throw error;
        }
    }
);

const getDeletedUsers = asyncHandler(
    async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    isDeleted: true,
                },
            });

            res.status(200).json(users);
        }
        catch (error) {
            throw error;
        }
    }
);

const getOneDeletedUser = asyncHandler(
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    uuid: req.params.uuid,
                    isDeleted: true,
                }
            });

            if (!user) {
                res.statusCode = 400;
                throw new Error("User not found");
            }

            res.json(user);
        }
        catch (error) {
            throw error;
        }
    }
);

module.exports = {
    getAllUsers,
    CreateUser,
    getOneUser,
    updateUser,
    deleteUser,
    getDeletedUsers,
    getOneDeletedUser,
};