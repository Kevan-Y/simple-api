import request from 'supertest';

import { app } from '../../src/app';

describe('/ app check', () => {
  test('Should have Access-Control-Allow-Origin to *', async () => {
    await request(app).get('/').expect('Referrer-Policy', 'no-referrer');
  });

  test('Should return Access-Control-Allow-Origin: * header', async () => {
    await request(app).get('/').expect('Access-Control-Allow-Origin', '*');
  });

  test('Should return HTTP 404 response on unknown route', async () => {
    await request(app).get('/unknown').expect(404);
  });
});
