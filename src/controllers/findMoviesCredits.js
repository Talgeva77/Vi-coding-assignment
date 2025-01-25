const axios = require('axios').default;

const apiKey = 'ac505a02032a33d65dd28b41f72182e1';
const baseUrl = 'https://api.themoviedb.org/3';

const findMoviesCredits = async (moviesIds) => {
  const creditsByMovie = new Map();
  for(const movieId of moviesIds) {
    try {
      const response = await axios.get(`${baseUrl}/movie/${movieId}/credits`, {
        params: {
          api_key: apiKey
        }
      });
      creditsByMovie.set(movieId, response.data.cast);
    }
    catch(error) {
      console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    }
  }
  return creditsByMovie;
};

module.exports = {
  findMoviesCredits
};