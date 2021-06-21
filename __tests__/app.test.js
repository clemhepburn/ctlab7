import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';


describe('order routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an order with POST and sends a text message', async () => {
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
  
  it('finds all orders via GET', async () => {

    const orderOne = await Order.insert({ quantity: 3 });
    const orderTwo = await Order.insert({ quantity: 4 });
    const res = await request(app).get('/api/v1/orders');  

    expect(res.body).toEqual([orderOne, orderTwo]);
  });
});
