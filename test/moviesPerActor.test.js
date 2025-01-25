const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');
const {actors} = require('../dataForQuestions');
const {refreshCache} = require('../src/cache');

const app = express();
app.use('/', routes);

beforeAll(async () => {
  await refreshCache();
});

describe('GET /moviesPerActor', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/moviesPerActor');
    expect(response.status).toBe(200);
  });
  
  it('should return an object', async () => {
    const response = await request(app).get('/moviesPerActor');
    const responseBody = response.body;
    expect(typeof responseBody).toBe('object');
  });
  
  it('should return a list of movies for each actor', async () => {
    const response = await request(app).get('/moviesPerActor');
    const responseBody = response.body;
    
    actors.forEach(actor => {
      if (responseBody.hasOwnProperty(actor)) {
        expect(Array.isArray(responseBody[actor])).toBe(true);
      }
    });
  });
  
  it('should contain only actors from the actors array', async () => {
    const response = await request(app).get('/moviesPerActor');
    const responseBody = response.body;
    
    Object.keys(responseBody).forEach(actor => {
      expect(actors).toContain(actor);
    });
  });
  
  it('should return non-empty arrays for key actors', async () => {
    const response = await request(app).get('/moviesPerActor');
    const responseBody = response.body;
    
    const keyActors = ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"];
    keyActors.forEach(actor => {
      if (responseBody.hasOwnProperty(actor)) {
        expect(responseBody[actor].length).toBeGreaterThan(0);
      }
    });
  });
  
  it('should return correct movie titles for Robert Downey Jr.', async () => {
    const response = await request(app).get('/moviesPerActor');
    const responseBody = response.body;
    
    if (responseBody.hasOwnProperty("Robert Downey Jr.")) {
      const expectedMovies = [
        "Iron Man", "The Incredible Hulk", "Iron Man 2", "The Avengers",
        "Iron Man 3", "Avengers: Age of Ultron", "Captain America: Civil War",
        "Spider-Man: Homecoming", "Avengers: Infinity War", "Avengers: Endgame"
      ];
      expect(responseBody["Robert Downey Jr."]).toEqual(expect.arrayContaining(expectedMovies));
    }
  });
  
  it('should respond within 1 second', async () => {
    const start = Date.now();
    await request(app).get('/moviesPerActor');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000);
  });
});