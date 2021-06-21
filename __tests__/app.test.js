import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('order routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an order with POST', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({
        quantity: 4
      });
    expect(res.body).toEqual({
      id: 1,
      quantity: 4
    });
  });
});
