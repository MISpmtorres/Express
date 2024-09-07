// Conditionally load environment variables from .env file if not in production
if (process.env.NONE_ENV !== 'production') {
    require('dotenv').config(); // Load environment variables into process.env from a .env file
}

// Import the Express module to create an Express application
const express = require('express');
const app = express(); // Create an Express application instance

// Import express-ejs-layouts for EJS layout support
const expressLayouts = require('express-ejs-layouts');

// Import the router for handling routes defined in './routes/index'
const indexRouter = require('./routes/index');

// Configure the view engine for rendering templates
app.set('view engine', 'ejs'); // Set EJS as the view engine for rendering templates

// Define the directory where view templates are located
app.set('views', __dirname + '/views'); // Set the directory for EJS view templates

// Specify the default layout for EJS templates
app.set('layout', 'layouts/layout'); // Set the layout template that will be used for all views

// Use express-ejs-layouts middleware to handle layout rendering
app.use(expressLayouts); // Enable layout support for EJS templates

// Serve static files (e.g., CSS, JavaScript, images) from the 'public' directory
app.use(express.static('public')); // Serve static files from the 'public' directory

// Import the Mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.DATABASE_URL); // Connect to the MongoDB database

// Handle MongoDB connection events
const db = mongoose.connection;
db.on('error', error => console.error(error)); // Log errors if the connection fails
db.once('open', () => console.log('Connected to Mongoose')); // Log success message once connected

// Use the imported router to handle routes starting with '/'
app.use('/', indexRouter); // Set up the router for handling root routes

// Define the port to listen on, using environment variable or default to 3000
const port = process.env.PORT || 3000;

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log a message when the server starts
});
