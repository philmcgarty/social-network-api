const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// GET all users and POST new user - api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// GET one user, PUT, and DELETE - /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;