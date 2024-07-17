import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../utility/amadeusApi'; // Adjust the import path as needed

const FlightSearch = ({ origin, setOrigin, destination, setDestination }) => {
  const [flights, setFlights] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [error, setError] = useState('');

  const searchFlights = async () => {
    try {
      setError('');
      const accessToken = await getAccessToken();
      console.log('Access Token:', accessToken);

      const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate,
          adults: 1
        }
      });

      console.log('Flight Search Response:', response.data);
      setFlights(response.data.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data. Please check the input values and try again.');
    }
  };

  return (
    <div>
      <h1>Search Flights</h1>
      <input
        type="text"
        placeholder="Origin (IATA Code)"
        value={origin}
        onChange={e => setOrigin(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Destination (IATA Code)"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="date"
        value={departureDate}
        onChange={e => setDepartureDate(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <button onClick={searchFlights} className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode} - {flight.price.total} {flight.price.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;
