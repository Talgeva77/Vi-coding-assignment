const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');
const {refreshCache} = require('../src/cache');

const app = express();
app.use('/', routes);

beforeAll(async () => {
  await refreshCache();
});

describe('GET /actorsWithMultipleCharacters', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/actorsWithMultipleCharacters');
    expect(response.status).toBe(200);
  });
  
  it('should return an object', async () => {
    const response = await request(app).get('/actorsWithMultipleCharacters');
    const responseBody = response.body;
    expect(typeof responseBody).toBe('object');
  });
  
  it('should return actors with multiple characters', async () => {
    const response = await request(app).get('/actorsWithMultipleCharacters');
    const responseBody = response.body;
    
    Object.keys(responseBody).forEach(actor => {
      expect(Array.isArray(responseBody[actor])).toBe(true);
      expect(responseBody[actor].length).toBeGreaterThan(1);
    });
  });
  
  it('should return roles with movieName and characterName', async () => {
    const response = await request(app).get('/actorsWithMultipleCharacters');
    const responseBody = response.body;
    
    Object.keys(responseBody).forEach(actor => {
      responseBody[actor].forEach(role => {
        expect(role).toHaveProperty('movieName');
        expect(role).toHaveProperty('characterName');
      });
    });
  });
  
  it('should respond within 1 second', async () => {
    const start = Date.now();
    await request(app).get('/actorsWithMultipleCharacters');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000);
  });
});