import request from 'supertest';

import { app } from '../../src/app';

describe('/v1/ping', () => {
  test('Should return HTTP 200 response', async () => {
    await request(app).get('/v1/ping').expect(200);
  });

  test('Should return message with pong', async () => {
    const res = await request(app).get('/v1/ping');
    expect(res.body.message).toEqual('pong');
  });
});
