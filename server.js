// required packages
const express = require('express');
const { animals } = require('./data/animals.json')
const fs = require('fs');
const path = require('path');
// fs and path are necessary to actually write and upate the original json file, as opposed to just writing data in server.js

// specify the port, heroku, if not, 3001
const PORT = process.env.PORT || 3001;

// initiate the server and tell it to listen for requests
const app = express();

// make all font end files in the public folder available to the server, like css and JS
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

// set up index.html ('/') to be served from the server --> only job is to respond with the HTML page in the browser
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// set up animals.html to respond when requested in the client browser
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// set up zookeepers.html to respond when requested in the client
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// add a wildcard to respond when a user sends a request that does not exist
// ORDER MATTERS. this should always come last so it does not overwright other get requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// confirm server port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});