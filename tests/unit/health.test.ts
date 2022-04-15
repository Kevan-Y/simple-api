import request from 'supertest';

import { app } from '../../src/app';
import { version, author } from '../../package.json';

describe('/ health check', () => {
  test('Should return HTTP 200 response', async () => {
    await request(app).get('/').expect(200);
  });

  test('Should return Cache-Control: no-cache header', async () => {
    await request(app).get('/').expect('Cache-Control', 'no-cache');
  });

  test('Should return status: ok in response', async () => {
    const res = await request(app).get('/');
    expect(res.body.status).toEqual('ok');
  });

  test('Should return correct version, githubUrl, and author in response', async () => {
    const res = await request(app).get('/');
    expect(res.body.author).toEqual(author);
    expect(res.body.version).toEqual(version);
  });
});
