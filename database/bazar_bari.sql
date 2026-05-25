CREATE DATABASE IF NOT EXISTS bazar_bari;

USE bazar_bari;

-- =========================
-- USERS
-- =========================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password VARCHAR(255) NOT NULL,
    role ENUM('customer','admin') DEFAULT 'customer',
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CATEGORIES
-- =========================

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    image VARCHAR(255),
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PRODUCTS
-- =========================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,
    sku VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    stock INT DEFAULT 0,
    short_description TEXT,
    description LONGTEXT,
    image VARCHAR(255),
    featured TINYINT(1) DEFAULT 0,
    flash_sale TINYINT(1) DEFAULT 0,
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE SET NULL
);

-- =========================
-- PRODUCT GALLERY
-- =========================

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    image VARCHAR(255),

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================
-- CART
-- =========================

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================
-- ORDERS
-- =========================

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,

    customer_name VARCHAR(120),
    customer_email VARCHAR(120),
    phone VARCHAR(30),
    address TEXT,

    subtotal DECIMAL(10,2) DEFAULT 0,
    delivery_charge DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,

    payment_method VARCHAR(50),
    payment_status ENUM('Pending','Paid','Failed')
    DEFAULT 'Pending',

    order_status ENUM(
        'Pending',
        'Confirmed',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled'
    ) DEFAULT 'Pending',

    note TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

-- =========================
-- ORDER ITEMS
-- =========================

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,

    quantity INT DEFAULT 1,
    price DECIMAL(10,2),

    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================
-- WISHLIST
-- =========================

CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================
-- BANNERS
-- =========================

CREATE TABLE banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    image VARCHAR(255),
    link VARCHAR(255),
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- COUPONS
-- =========================

CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(100) UNIQUE,
    discount_type ENUM('fixed','percent')
    DEFAULT 'fixed',

    amount DECIMAL(10,2),
    minimum_amount DECIMAL(10,2) DEFAULT 0,

    expiry_date DATE,
    status TINYINT(1) DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SETTINGS
-- =========================

CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(255),
    logo VARCHAR(255),
    phone VARCHAR(100),
    email VARCHAR(120),
    address TEXT,
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    youtube VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SAMPLE CATEGORIES
-- =========================

INSERT INTO categories
(name,slug,image)
VALUES
('Grocery','grocery','grocery.jpg'),
('Fish & Meat','fish-meat','fish.jpg'),
('Fruits','fruits','fruits.jpg'),
('Vegetables','vegetables','vegetables.jpg'),
('Beverages','beverages','beverages.jpg'),
('Baby Care','baby-care','baby.jpg');

-- =========================
-- SAMPLE PRODUCTS
-- =========================

INSERT INTO products
(
category_id,
name,
slug,
sku,
price,
old_price,
stock,
short_description,
description,
image,
featured,
flash_sale
)
VALUES

(
1,
'Premium Miniket Rice 5KG',
'premium-miniket-rice-5kg',
'RICE001',
420,
450,
50,
'High quality premium rice',
'Fresh and premium quality miniket rice for daily use.',
'rice.jpg',
1,
1
),

(
1,
'Soybean Oil 5L',
'soybean-oil-5l',
'OIL001',
820,
850,
40,
'Fresh soybean oil',
'Pure soybean oil for healthy cooking.',
'oil.jpg',
1,
0
),

(
3,
'Fresh Apple 1KG',
'fresh-apple-1kg',
'APPLE001',
280,
320,
25,
'Imported fresh apple',
'Fresh imported apples directly from supplier.',
'apple.jpg',
1,
1
),

(
2,
'Fresh Beef 1KG',
'fresh-beef-1kg',
'BEEF001',
780,
850,
15,
'Fresh halal beef',
'Premium fresh halal beef.',
'beef.jpg',
0,
1
);

-- =========================
-- ADMIN USER
-- =========================

INSERT INTO users
(name,email,phone,password,role)
VALUES
(
'Admin',
'admin@bazarbari.com',
'01700000000',
'$2b$10$Y9mQ3Jd4Q4Q7W6Q3hK8F3e9P9T7m7mJ7z3s9k3j4k5l6m7n8o9p0q',
'admin'
);

-- Password:
-- 123456