import pool from '../utils/pool';

export default class Order {
  id;
  quantity;

  constructor(row) {
    this.id = Number(row.id);
    this.quantity = row.quantity;
  }

  static async insert({ quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
    );

    return new Order(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM orders'
    );

    return rows.map(row => new Order(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM orders WHERE id=$1'
      , [id]
    );
    
    if (!rows[0]) return null;
    return new Order(rows[0]);
  }

  static async change({ quantity, id }) {
    
    const { rows } = await pool.query(
      `UPDATE orders
       SET quantity = $1
       WHERE id = $2
       RETURNING *`
      , [quantity, id]
    );

    return new Order(rows[0]);
  }

  static async remove({ id }) {
    const { rows } = awaot pool.query(
      `DELETE FROM orders 
      WHERE id = $1
      RETURNING *`
      , [id]
    );

    return new Order(rows[0]);
  }
}
