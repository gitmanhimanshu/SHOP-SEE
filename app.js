const express = require('express');
const app = express();
require('dotenv').config();  // Load environment variables from .env file
const db = require('./config/mongoose-connection');  // Database connection
const cookieParser = require('cookie-parser');
const ownersRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productRouter');
const index = require('./routes/index.js');  // Import index route
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up express-session with a secret from environment variables
app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET || 'default_secret_key',  // Use environment variable for secret or fallback to default
  resave: false,
  saveUninitialized: false,
}));

// Set up flash messages middleware
app.use(flash());

// Middleware for parsing URL-encoded data (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS for rendering views
app.set('view engine', 'ejs');

// Use the imported index route
app.use(index);

// Use the routes for different resources
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
