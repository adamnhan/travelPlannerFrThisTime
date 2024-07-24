// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const Amadeus = require('amadeus');
const admin = require('firebase-admin');
const serviceAccount = require('../travel-planner-82f03-firebase-adminsdk-e16zt-b8969aa3e6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
  clientId: 'dfjleZRmATkTuOZml4WrfkvQmtW0VfGu',
  clientSecret: 'yGsDc4pVAVgsbxIk'
});

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

// Endpoint to get all trips
app.get('/api/trips',verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const result = await pool.query('SELECT * FROM trips WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to create a new trip
app.post('/api/trips', verifyToken, async (req, res) => {
  const { name, description, backgroundImage} = req.body;
  const userId = req.user.uid
  try {
    const result = await pool.query(
      'INSERT INTO trips (name, description, background_image, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, backgroundImage, userId]
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
