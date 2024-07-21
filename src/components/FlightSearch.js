import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../utility/amadeusApi'; // Adjust the import path as needed
import AsyncSelect from 'react-select/async';

const FlightSearch = ({ origin, setOrigin, destination, setDestination }) => {
  const [flights, setFlights] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('EUR');
  
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
          adults: 1,
          currencyCode: currency
        }
      });

      console.log('Flight Search Response:', response.data);
      // Filter for direct flights only
      const directFlights = response.data.data.filter(flight => {
        return flight.itineraries[0].segments.length === 1;
      });

      setFlights(directFlights);
      if (directFlights.length === 0) {
        setError('No direct flights available for the selected locations.');
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data. Please check the input values and try again.');
    }
  };

  const fetchCitySuggestions = async (inputValue) => {
    console.log('Fetching suggestions for:', inputValue); // Debugging line
    if (!inputValue) {
      console.log('No input value provided.'); // Debugging line
      return [];
    }

    try {
      const response = await axios.get('http://localhost:5000/api/city-suggestions', {
        params: { keyword: inputValue }
      });
      console.log('Suggestions response:', response.data); // Debugging line
      return response.data;
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      return [];
    }
  };

  const handleOriginChange = (selectedOption) => {
    console.log('Selected origin:', selectedOption);
    setOrigin(selectedOption ? selectedOption.value : '');
  };

  const handleDestinationChange = (selectedOption) => {
    console.log('Selected Destination:', selectedOption);
    setDestination(selectedOption ? selectedOption.value : '');
  };

  const toggleCurrency = () => {
    setCurrency(prevCurrency => (prevCurrency === 'EUR' ? 'USD' : 'EUR'));
  };

  return (
    <div>
      <h1>Search Flights</h1>
      <div className="mb-4">
        <label htmlFor="origin" className="block text-gray-700">Origin</label>
        <AsyncSelect
          id="origin"
          value={origin ? { value: origin, label: origin } : null}
          onChange={handleOriginChange}
          loadOptions={(inputValue, callback) => fetchCitySuggestions(inputValue).then(callback)}
          placeholder="Enter origin city"
          defaultOptions
        />
      </div>
      <div className="mb-4">
        <label htmlFor="destination" className="block text-gray-700">Destination</label>
        <AsyncSelect
          id="destination"
          value={destination ? { value: destination, label: destination } : null}
          onChange={handleDestinationChange}
          loadOptions={(inputValue, callback) => fetchCitySuggestions(inputValue).then(callback)}
          placeholder="Enter destination city"
          defaultOptions
        />
      </div>
      <input
        type="date"
        value={departureDate}
        onChange={e => setDepartureDate(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <button onClick={searchFlights} className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Currency Toggle Button */}
      <div className="mt-4 flex items-center">
        <span className="mr-2">Currency:</span>
        <button onClick={toggleCurrency} className="bg-gray-300 px-4 py-2 rounded">
          {currency === 'EUR' ? 'Switch to USD' : 'Switch to EUR'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {flights.map(flight => (
          <div key={flight.id} className="bg-white p-4 border border-gray-200 rounded shadow">
            <div className="mb-2 font-semibold text-lg">
              {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}
            </div>
            <div className="text-blue-600 font-bold">
              {flight.price.total} {flight.price.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSearch;