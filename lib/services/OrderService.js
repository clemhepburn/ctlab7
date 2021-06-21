import { sendSms } from '../utils/twilio.js';
import Order from '../models/Order.js';

export default class OrderService {
  static async create({ quantity }) {
    const order = await Order.insert({ quantity });
    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `New Order received for ${quantity}`
    );

    return order;
  }

  static async update({ quantity }) {
    const order = await Order.change({ quantity });
    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Number of items updated to ${quantity}`
    );

    return order;
  }
}
