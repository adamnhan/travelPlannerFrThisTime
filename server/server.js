// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Initialize Express and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'travelPlanner',
  password: 'Integrity2019!',
  port: 5432,
});

// Endpoint to get all trips
app.get('/api/trips', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trips');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to create a new trip
app.post('/api/trips', async (req, res) => {
  const { name, description, backgroundImage } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO trips (name, description, background_image) VALUES ($1, $2, $3) RETURNING *',
      [name, description, backgroundImage]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
