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

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

// take the req.query as an argument and filter through the animals accordinly, returning the new filtered array
function filterByQuery(query , animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array
        // If personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entires that contain the trait,
            // so at the end we'll have an array of animals that have every on
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    // return the filtered results
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// take data from req.body and add it to animals.json file
function createNewAnimal(body, animalsArray) {

    // function's main code here
    const animal = body;
    animalsArray.push(animal);
    // write the newAnimal in the data file
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return body;
}

// validate keys and values entered with newAnimal
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

// get data
app.get('/api/animals', (req,res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query , results);
    }
    res.json(results);
});

// a param route MUST come after the get route above
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// set up a route on the server that acceps data to be used or stored server-side
app.post('/api/animals', (req, res) => {

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

// confirm server port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});