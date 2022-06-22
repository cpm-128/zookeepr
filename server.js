// required packages
const express = require('express');
const { animals } = require('./data/animals.json')
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
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

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// confirm server port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});