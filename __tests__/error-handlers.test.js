const supertest = require('supertest');
const server = require('../src/server');

const request = supertest(server.app);

describe('Error Handlers', () => {
  it('404 on a bad route/method', async () => {
    const badRoute = await request.get('/this-is-not-real');
    const badMethod = await request.get('/person!name=hugo');

    expect(badRoute.status).toBe(404);
    expect(badMethod.status).toBe(404);
  });
  it('500 if no name in the query string', async () => {
    const response = await request.get('/person');

    expect(response.status).toBe(500);
  });
});
