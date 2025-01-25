const express = require('express');
const router = express.Router();

const getMoviesPerActor = require('./controllers/moviesPerActor');
const getActorsWithMultipleCharacters = require('./controllers/actorsWithMultipleCharacters');
const getCharactersWithMultipleActors = require('./controllers/charactersWithMultipleActors');

router.get('/moviesPerActor', getMoviesPerActor);
router.get('/actorsWithMultipleCharacters', getActorsWithMultipleCharacters);
router.get('/charactersWithMultipleActors', getCharactersWithMultipleActors);

module.exports = router;