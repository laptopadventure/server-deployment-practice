'use strict';

const supertest = require('supertest');
const server = require('../src/server');
const { db } = require('../src/db');

const request = supertest(server.app);

//some generic addition to the db to compare to

describe('Models', () => {
  beforeEach(() => {
    db.sync();
  });
  describe('Painting Model', () => {
    let monaLisaId;
    it('can create paintings', async () => {
      const monaLisa = {
        name: 'Mona Lisa',
        paintedDate: '1503',
        author: 'Leonardo da Vinci',
      };

      const created = await request.post('/painting').send(monaLisa);
      expect(created.status).toBe(200);
      expect(created.body.name).toBe('Mona Lisa');
      monaLisaId = created.body.id;
    });
    it('can read paintings', async () => {
      const readArray = await request.get('/painting');
      expect(readArray.status).toBe(200);
      expect(readArray.body[0]).toHaveProperty('name');

      const readIndividual = await request.get(`/painting/${monaLisaId}`);
      expect(readIndividual.status).toBe(200);
      expect(readIndividual.body).toHaveProperty('name');
    });
    it('can update paintings', async () => {
      const original = {
        name: 'Original',
      };
      const updates = {
        name: 'Updated',
      };
      const created = await request.post('/painting').send(original);
      expect(created.body.name).toBe('Original');
      const updated = await request
        .put(`/painting/${created.body.id}`)
        .send(updates);
      expect(updated.body.name).toBe('Updated');
    });
    it('can delete paintings', async () => {
      const deleted = await request.delete(`/painting/${monaLisaId}`);
      expect(deleted.status).toBe(200);
      expect(deleted.text).toBe('Deleted.');
    });
  });
  describe('Antique Models', () => {
    let codexId;
    it('can create antiques', async () => {
      const codex = {
        name: 'Codex Leicester',
        importance: 'historical',
      };

      const created = await request.post('/antique').send(codex);
      expect(created.status).toBe(200);
      expect(created.body.name).toBe('Codex Leicester');
      codexId = created.body.id;
    });
    it('can read antiques', async () => {
      const readArray = await request.get('/antique');
      expect(readArray.status).toBe(200);
      expect(readArray.body[0]).toHaveProperty('name');

      const readIndividual = await request.get(`/antique/${codexId}`);
      expect(readIndividual.status).toBe(200);
      expect(readIndividual.body).toHaveProperty('name');
    });
    it('can update antiques', async () => {
      const original = {
        name: 'Original',
      };
      const updates = {
        name: 'Updated',
      };
      const created = await request.post('/antique').send(original);
      expect(created.body.name).toBe('Original');
      const updated = await request
        .put(`/antique/${created.body.id}`)
        .send(updates);
      expect(updated.body.name).toBe('Updated');
    });
    it('can delete antiques', async () => {
      const deleted = await request.delete(`/antique/${codexId}`);
      expect(deleted.status).toBe(200);
      expect(deleted.text).toBe('Deleted.');
    });
  });
});
