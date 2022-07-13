const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    CreateUser,
    getOneUser,
    updateUser,
    deleteUser,
    getDeletedUsers,
    getOneDeletedUser,
} = require('../../controlers/usersControlers');

// Get all users, or create new user
router.route('/').get(getAllUsers).post(CreateUser);

// Get all deleted users
router.route('/deletedusers').get(getDeletedUsers);

// Get specific deleted users
router.route('/deletedusers/:uuid').get(getOneDeletedUser);

// Get, Delete, or Update one user from admin
router.route('/:uuid').get(getOneUser).delete(deleteUser).put(updateUser);

// Get, Delete, or Update one user from user
router.route('/user/:uuid').get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;