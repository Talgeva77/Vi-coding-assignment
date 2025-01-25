const {getMoviesByActorName} = require('../cache');

async function getMoviesPerActor(_, res) {
  const moviesPerActorCache = getMoviesByActorName();
  const moviesPerActorObject = Object.fromEntries(moviesPerActorCache);
  res.json(moviesPerActorObject);
}

module.exports = getMoviesPerActor;