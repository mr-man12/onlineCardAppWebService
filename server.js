const express = require("express");
const mysql = require("mysql2/promise");
require('dotenv').config();
const port = 3000;

// Use createPool instead of just config objects for better performance
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/addcard", async (req, res) => {
    const { card_name, card_pic } = req.body;

    // Basic validation to ensure data exists
    if (!card_name || !card_pic) {
        return res.status(400).json({ message: "Missing card_name or card_pic" });
    }

    try {
        // With a pool, you can execute directly; it handles opening/closing for you
        await pool.execute(
            "INSERT INTO cards (card_name, card_pic) VALUES(?,?)",
            [card_name, card_pic]
        );
        res.status(201).json({ message: `Card ${card_name} added successfully` });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});