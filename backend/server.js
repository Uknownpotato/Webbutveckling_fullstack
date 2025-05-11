const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./db/connection");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "industrial.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Fel vid läsning av industrial.json:", err);
      return res.status(500).json({ error: "Kunde inte läsa produktdata." });
    }

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseError) {
      console.error("Fel i JSON-format:", parseError);
      res.status(500).json({ error: "Ogiltigt JSON-format." });
    }
  });
});

// POST
app.post("/api/order", (req, res) => {
  const { name, email, address, product, quantity } = req.body;

  if (!name || !email || !address || !product || !quantity) {
    return res.status(400).json({ error: "Alla fält är obligatoriska." });
  }

  const orderSql = "INSERT INTO orders (customer_name, email, address) VALUES (?, ?, ?)";
  db.query(orderSql, [name, email, address], (err, orderResult) => {
    if (err) {
      console.error("Fel vid skapande av order:", err);
      return res.status(500).json({ error: "Kunde inte spara order." });
    }

    const orderId = orderResult.insertId;

    const itemSql = "INSERT INTO order_items (order_id, article_number, quantity) VALUES (?, ?, ?)";
    db.query(itemSql, [orderId, product, quantity], (err) => {
      if (err) {
        console.error("Fel vid sparning av orderrad:", err);
        return res.status(500).json({ error: "Kunde inte spara orderrad." });
      }

      res.status(201).json({ message: "Order sparad i databasen!" });
    });
  });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
