const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [product] = await db.query(
      "SELECT * FROM products WHERE id=?",
      [req.params.id]
    );

    res.json(product[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      category_id,
      name,
      slug,
      price,
      old_price,
      stock,
      description,
      image,
    } = req.body;

    await db.query(
      `INSERT INTO products 
      (category_id,name,slug,price,old_price,stock,description,image)
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        category_id,
        name,
        slug,
        price,
        old_price,
        stock,
        description,
        image,
      ]
    );

    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM products WHERE id=?",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Product deleted",
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