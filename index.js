const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const mapRoutes = require('./routes/map');
const User = require('./models/User');

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mapSatelliteApp';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Passport configuration
require('./config/passport');

// Routes
app.use('/', authRoutes);
app.use('/map', mapRoutes);

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
