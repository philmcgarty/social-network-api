const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
// set /thoughts route for thought and reaction routes
router.use('/thoughts', thoughtRoutes);
// set /users route for user and friend routes
router.use('/users', userRoutes);

module.exports = router;