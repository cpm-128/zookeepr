const path = require('path');
const router = require('express').Router();

// set up index.html ('/') to be served from the server --> only job is to respond with the HTML page in the browser
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// set up animals.html to respond when requested in the client browser
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

// set up zookeepers.html to respond when requested in the client
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// add a wildcard to respond when a user sends a request that does not exist
// ORDER MATTERS. this should always come last so it does not overwright other get requests
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;