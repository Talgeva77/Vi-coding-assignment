const {getCharactersByActorName} = require('../cache');

async function getActorsWithMultipleCharacters(_, res) {
  const actorRolesCache = getCharactersByActorName();
  const result = new Map();
  
  for(const [actor, roles] of actorRolesCache.entries()) {
    if(roles.length > 1) {
      result.set(actor, roles);
    }
  }
  const resultObject = Object.fromEntries(result);
  res.json(resultObject);
}

module.exports = getActorsWithMultipleCharacters;