import { Router } from 'express';
import Order from '../models/Order';

export default Router()
  .post('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.insert(req.body);
      res.send(order);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });

