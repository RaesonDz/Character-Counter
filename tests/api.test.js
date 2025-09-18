// tests/api.test.js
const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server');

describe('Garren API basic tests', () => {
  it('GET /api/data returns json', async () => {
    const res = await request(app).get('/api/data');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('projects');
  });

  it('POST /api/subscribe accepts valid email', async () => {
    const email = 'test+' + Date.now() + '@example.com';
    const res = await request(app).post('/api/subscribe').send({ email });
    expect([200,201]).toContain(res.statusCode);
    const subs = fs.readJsonSync('assets/data/subscribers.json');
    expect(subs.find(s => s.email === email)).toBeDefined();
  });
});
