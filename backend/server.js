require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_management",
  password: "yourpassword", // Change this!
  port: 5432,
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, "secret123", { expiresIn: "1h" });
  res.json({ token });
});

// Get users (protected route)
app.get("/api/users", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    jwt.verify(token, "secret123");
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
