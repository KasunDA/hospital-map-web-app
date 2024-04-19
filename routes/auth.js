// routes/auth.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// GET route for login page
router.get('/', (req, res) => {
    const message = req.flash('error'); // Flash message set by Passport during failed login attempts
    res.render('login', { message }); // Pass the message variable to the login view
});

// POST route for login form submission
router.post('/login', passport.authenticate('local', {
    successRedirect: '/main', // Redirect to main index if login is successful
    failureRedirect: '/login', // Redirect back to login page if login fails
    failureFlash: true
}));

// Route to render the signup form
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Handle form submission for user registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.send(`User ${username} registered successfully!`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
// Other authentication routes (e.g., registration, logout) can go here

module.exports = router;
