import { Router } from 'express';
import OrderService from '../services/OrderService';

export default Router()
  .post('/api/v1/orders', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  });

