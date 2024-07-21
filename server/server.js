// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const Amadeus = require('amadeus');



console.log('Amadeus API Key:', process.env.REACT_APP_AMADEUS_API_KEY); // Debugging line
console.log('Amadeus API Secret:', process.env.REACT_APP_AMADEUS_API_SECRET); //

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

const amadeus = new Amadeus({
  clientId: process.env.REACT_APP_AMADEUS_API_KEY,
  clientSecret: process.env.REACT_APP_AMADEUS_API_SECRET
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

// New endpoint to fetch city suggestions
app.get('/api/city-suggestions', async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: 'CITY,AIRPORT'
    });
    const suggestions = response.data.map(location => ({
      value: location.iataCode,
      label: `${location.name} (${location.iataCode})`
    }));
    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch city suggestions' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
