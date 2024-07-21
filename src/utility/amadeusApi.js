import axios from 'axios';

export const getAccessToken = async () => {
  try {
    console.log('API Key:', process.env.REACT_APP_AMADEUS_API_KEY);
    console.log('API Secret:', process.env.REACT_APP_AMADEUS_API_SECRET);

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.REACT_APP_AMADEUS_API_KEY);
    params.append('client_secret', process.env.REACT_APP_AMADEUS_API_SECRET);

    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('OAuth2 Token Response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

