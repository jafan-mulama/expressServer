"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
// Middleware to log request time
app.use(function (req, res, next) {
    console.log('Request received at:', new Date().toISOString());
    next();
});
// Route: Home
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
// Route: About
app.get('/about', function (req, res) {
    res.send('This is the About page');
});
// Route: Users
app.get('/users', function (req, res) {
    // Simulated data
    var users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' },
    ];
    res.json(users);
});
// Route: User by ID
app.get('/users/:id', function (req, res) {
    var userId = req.params.id;
    // Simulated data
    var user = { id: userId, name: 'User ' + userId };
    res.json(user);
});
// Error handling middleware
app.use(function (err, req, res, next) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
});
// Start the server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
