-- init_db.sql

-- Create the database
CREATE DATABASE your_database;

-- Connect to the database
\c your_database

-- Create the trips table
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  background_image TEXT
);

-- Insert sample data
INSERT INTO trips (name, description, background_image) VALUES 
('Trip to Paris', 'A wonderful trip to Paris', 'path/to/paris.jpg'),
('Weekend in New York', 'A weekend trip to New York', 'path/to/ny.jpg');
