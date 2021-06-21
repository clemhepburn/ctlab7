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
}
