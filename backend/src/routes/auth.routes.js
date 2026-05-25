const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const [exist] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (exist.length > 0) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)",
      [name, email, phone, hashedPassword]
    );

    res.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "bazar_bari_secret",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;