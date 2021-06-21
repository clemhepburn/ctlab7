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

  static async update({ quantity }, id) {
    
    const order = await Order.change({ quantity, id });
    
    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Order quantity has changed to x${quantity}`
    );

    return order;
  }

  static async delete({ quantity }, id) {
    
    const order = await Order.remove({ quantity, id });

    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Order #${id} has been obliterated`
    );

    return order;
  }
}
