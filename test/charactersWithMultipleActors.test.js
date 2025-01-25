const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');
const {refreshCache} = require('../src/cache');

const app = express();
app.use('/', routes);

beforeAll(async () => {
  await refreshCache();
});

describe('GET /charactersWithMultipleActors', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/charactersWithMultipleActors');
    expect(response.status).toBe(200);
  });
  
  it('should return an object', async () => {
    const response = await request(app).get('/charactersWithMultipleActors');
    const responseBody = response.body;
    expect(typeof responseBody).toBe('object');
  });
  
  it('should return characters played by multiple actors', async () => {
    const response = await request(app).get('/charactersWithMultipleActors');
    const responseBody = response.body;
    
    Object.keys(responseBody).forEach(character => {
      expect(Array.isArray(responseBody[character])).toBe(true);
      expect(responseBody[character].length).toBeGreaterThan(1);
    });
  });
  
  it('should return actors with movieName and actorName', async () => {
    const response = await request(app).get('/charactersWithMultipleActors');
    const responseBody = response.body;
    
    Object.keys(responseBody).forEach(character => {
      responseBody[character].forEach(actor => {
        expect(actor).toHaveProperty('movieName');
        expect(actor).toHaveProperty('actorName');
      });
    });
  });
  
  it('should respond within 1 second', async () => {
    const start = Date.now();
    await request(app).get('/charactersWithMultipleActors');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000);
  });
});