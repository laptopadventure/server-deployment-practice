// Assertion - check to see if something is what we expect

// expect(true).toBe(true); // SGTM
// expect(3).toBe(5); // ?? sus

// test organization - describe, it
//   describe groups tests
//   it is a single test case
// test setup

const supertest = require('supertest');
const server = require('../src/server');

const request = supertest(server.app);

describe('Node Server', () => {
  it('says hello world', async () => {
    // set up the test so it can do a thing
    // Prepare the server
    // (see above)

    // perform an action, that does the thing
    // request the / route
    const response = await request.get('/'); // The response is a promise

    // assert or expect the result of the action
    // expect the / route to respond with hello
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World');
  });

  it('returns some data', async () => {
    const response = await request.get('/data');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'David',
      role: 'Instructor',
    });
  });
  it('returns 200 if the name is in the person query string, and the object is correct', async () => {
    const response = await request.get('/person?name=polly');
    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      name: 'polly provided',
    });
  });
});
