const {findMoviesCredits} = require('./controllers/findMoviesCredits');
const {
  movies,
  actors
} = require('../dataForQuestions');

let moviesCredits;
let charactersByActorName = new Map();
let actorsByCharacterName = new Map();
let moviesByActorName = new Map();

// This function builds the shared data structure.
// We iterate the movies, and for each cast we fill 3 caches (only for the
// requested actors): moviesByActorName, charactersByActorName,
// actorsByCharacterName.
// In addition, we are using temporary maps to handle the downtime between each
// cache refreshing.

async function refreshCache() {
  const tempCharactersByActorName = new Map();
  const tempActorsByCharacterName = new Map();
  const tempMoviesByActorName = new Map();
  
  const moviesIds = Object.values(movies);
  moviesCredits = await findMoviesCredits(moviesIds);
  for(const [movieName, movieId] of Object.entries(movies)) {
    const cast = moviesCredits.get(movieId);
    
    cast.forEach(member => {
      if(actors.includes(member.name)) {
        
        if(!tempMoviesByActorName.has(member.name)) {
          tempMoviesByActorName.set(member.name, []);
        }
        tempMoviesByActorName.get(member.name).push(movieName);
        
        if(!tempCharactersByActorName.has(member.name)) {
          tempCharactersByActorName.set(member.name, []);
        }
        tempCharactersByActorName.get(member.name).push({
          movieName,
          characterName: member.character
        });
        
        if(!tempActorsByCharacterName.has(member.character)) {
          tempActorsByCharacterName.set(member.character, []);
        }
        tempActorsByCharacterName.get(member.character).push({
          movieName,
          actorName: member.name
        });
      }
    });
  }
  
  // Swap the temporary caches with the actual caches
  charactersByActorName = tempCharactersByActorName;
  actorsByCharacterName = tempActorsByCharacterName;
  moviesByActorName = tempMoviesByActorName;
}

function getCharactersByActorName() {
  return charactersByActorName;
}

function getActorsByCharacterName() {
  return actorsByCharacterName;
}

function getMoviesByActorName() {
  return moviesByActorName;
}

module.exports = {
  refreshCache,
  getCharactersByActorName,
  getActorsByCharacterName,
  getMoviesByActorName
};