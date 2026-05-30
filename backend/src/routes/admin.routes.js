const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=? AND role='admin'",
      [email]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Admin not found" });
    }

    const admin = rows[0];

    if (password !== admin.password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      "bazar_bari_secret",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const [[products]] = await db.query("SELECT COUNT(*) AS total FROM products");
    const [[orders]] = await db.query("SELECT COUNT(*) AS total FROM orders");
    const [[customers]] = await db.query("SELECT COUNT(*) AS total FROM users WHERE role='customer'");
    const [[sales]] = await db.query("SELECT IFNULL(SUM(total_amount),0) AS total FROM orders");

    res.json({
      products: products.total,
      orders: orders.total,
      customers: customers.total,
      sales: sales.total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;