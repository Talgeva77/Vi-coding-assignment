const {getActorsByCharacterName} = require('../cache');

async function getCharactersWithMultipleActors(_, res) {
  const characterActorsCache = getActorsByCharacterName();
  const result = new Map();
  
  for(const [character, actors] of characterActorsCache.entries()) {
    if(actors.length > 1) {
      result.set(character, actors);
    }
  }
  const resultObject = Object.fromEntries(result);
  res.json(resultObject);
}

module.exports = getCharactersWithMultipleActors;