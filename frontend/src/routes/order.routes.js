const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      customer_name,
      customer_email,
      phone,
      address,
      subtotal,
      delivery_charge,
      total_amount,
      payment_method,
      note,
      items,
    } = req.body;

    const [orderResult] = await db.query(
      `INSERT INTO orders 
      (user_id, customer_name, customer_email, phone, address, subtotal, delivery_charge, total_amount, payment_method, payment_status, order_status, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        customer_name,
        customer_email,
        phone,
        address,
        subtotal,
        delivery_charge,
        total_amount,
        payment_method,
        "Pending",
        "Pending",
        note,
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.query(
        `INSERT INTO order_items 
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    res.json({
      success: true,
      message: "Order placed successfully",
      order_id: orderId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const [orders] = await db.query("SELECT * FROM orders ORDER BY id DESC");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;