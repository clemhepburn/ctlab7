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

  it('finds an order by id', async () => {
    const order = await Order.insert({
      quantity: '10'
    });
    const res = await request(app).get(`/api/v1/orders/${order.id}`);
    expect(res.body).toEqual(order);
  });

  it('updates an order and sends a text', async () => {

    const order = await Order.insert({
      quantity: 5
    });

    order.quantity = 7;

    const newOrder = {
      id: 1,
      quantity: 7
    };
    
    const res = await request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send({
        quantity: 7
      });
    
    expect(res.body).toEqual(newOrder);
  });

});
