// required functions
const { filterByQuery , findById , createNewAnimal , validateAnimal } = require ('../../lib/animals');
const { animals } = require('../../data/animals');
const router = require('express').Router();

// get data
router.get('/animals', (req,res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query , results);
    }
    res.json(results);
});

// a param route MUST come after the get route above
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// set up a route on the server that acceps data to be used or stored server-side
router.post('/animals', (req, res) => {

    // set Id basaed on what the next index of the array will be (LENGTH) and convert it to a string value
    req.body.id = animals.length.toString();

    // if any data in the req.body is incorrect or missing (as defined in the validation method), send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;