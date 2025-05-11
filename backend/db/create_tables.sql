CREATE DATABASE IF NOT EXISTS webshop;
USE webshop;

-- Skapa tabell för artiklar
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100),
  email VARCHAR(100),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skapa tabell för ordrar
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  article_number VARCHAR(50),
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
