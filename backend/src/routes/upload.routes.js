const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/product-image", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    filename: `products/${req.file.filename}`,
    image_url: `http://localhost:5000/uploads/products/${req.file.filename}`,
  });
});

module.exports = router;