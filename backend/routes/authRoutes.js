const express = require('express');
const Router = express.Router();
const { googleAuth } = require('../controllers/authController');

// Default route for /auth
Router.get('/', (req, res) => {
    res.send('Auth service is up and running!');
});

// Route for /auth/google
Router.get('/google', googleAuth);

module.exports = Router;
