'use strict';

const supertest = require('supertest');
const server = require('../src/server');
const { db } = require('../src/db');

const request = supertest(server.app);

//fyi: this was an interesting test. with it now done, I dunno if I can say I'm the biggest fan of having done it.

describe('Models', () => {
  //testData for museums
  const museum = {
    name: 'Louvre Museum',
  };
  //museums have a special test for relations.
  const museumAssocTest = async () => {
    const createdMuseum = await request.post('/museum').send(museum);
    const relatedPainting = {
      name: 'Mona Lisa',
      paintedDate: '1503',
      author: 'Leonardo da Vinci',
      MuseumId: createdMuseum.body.id,
    };
    const associated = await request.post('/painting').send(relatedPainting);
    expect(associated.status).toBe(200);
    const fetchedMuseum = await request.get(
      `/museum/${associated.body.MuseumId}`
    );
    expect(fetchedMuseum.body.id).toBe(createdMuseum.body.id);
  };

  //testData for paintings
  const monaLisa = {
    name: 'Mona Lisa',
    paintedDate: '1503',
    author: 'Leonardo da Vinci',
  };
  //testData for Antiques
  const codex = {
    name: 'Codex Leicester',
    importance: 'historical',
  };

  describe.each([
    ['museum', museum, museumAssocTest],
    ['painting', monaLisa, null],
    ['antique', codex, null],
  ])(`can CRUD`, (routeName, testData, assocTest) => {
    beforeEach(async () => {
      await db.sync();
    });
    //first created item used in subsequent tests
    let testId;

    let firstKey = Object.keys(testData)[0];
    it('can create', async () => {
      const created = await request.post(`/${routeName}`).send(testData);
      expect(created.status).toBe(200);

      expect(created.body[firstKey]).toBe(testData[firstKey]);
      testId = created.body.id;
    });
    it('can read many', async () => {
      const readArray = await request.get(`/${routeName}`);
      expect(readArray.status).toBe(200);
      expect(readArray.body[0]).toHaveProperty(firstKey);
    });
    it('can read one', async () => {
      const readIndividual = await request.get(`/${routeName}/${testId}`);
      expect(readIndividual.status).toBe(200);
      expect(readIndividual.body).toHaveProperty(firstKey);
    });
    it('can update', async () => {
      const original = {};
      original[firstKey] = 'Original';
      const updates = {};
      updates[firstKey] = 'Updated';
      const created = await request.post(`/${routeName}`).send(original);
      expect(created.body[firstKey]).toBe('Original');
      const updated = await request
        .put(`/${routeName}/${created.body.id}`)
        .send(updates);
      expect(updated.body[firstKey]).toBe('Updated');
    });
    it('can delete', async () => {
      const deleted = await request.delete(`/${routeName}/${testId}`);
      expect(deleted.status).toBe(200);
      expect(deleted.text).toBe('Deleted.');
    });
    // only run if the model has relationships that need testing. also known as "overengineering"
    if (assocTest) {
      it('has working associations', assocTest);
    }
  });
});
