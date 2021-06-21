import { Router } from 'express';
import Order from '../models/Order';
import OrderService from '../services/OrderService';

export default Router()
  .post('/api/v1/orders', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .get('/api/v1/orders', async (req, res, next) => {
    try {
      const order = await Order.findAll();
      res.send(order);
    } catch(err) {
      next(err);
    }
  });

