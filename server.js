// Imports (ES Modules) 
import express from "express";
import mysql from "mysql2/promise";  
import cors from "cors";

//  App & Port 
const app = express();
const PORT = 5000;

// Middleware 
app.use(cors());
app.use(express.json());

//  MySQL Connection 
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sql123db",  // replace with your MySQL password
  database: "online_shopping"
});

console.log("Connected to MySQL Database");

// API ROUTES 

// Get all customers
app.get("/customers", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM CUSTOMER ORDER BY customer_id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new customer
app.post("/customers", async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    await db.query(
      "INSERT INTO CUSTOMER (name, email, phone, address) VALUES (?, ?, ?, ?)",
      [name, email, phone, address]
    );
    res.json({ message: "Customer added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM PRODUCT ORDER BY product_id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new product
app.post("/products", async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    await db.query(
      "INSERT INTO PRODUCT (name, description, price, stock) VALUES (?, ?, ?, ?)",
      [name, description, price, stock]
    );
    res.json({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
