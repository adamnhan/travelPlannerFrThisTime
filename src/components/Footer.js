import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box className="bg-gray-800 text-white py-8 mt-12">
      <Box className="max-w-screen-xl mx-auto px-4">
        <Text className="text-center">&copy; 2023 Travel Planner. All rights reserved.</Text>
        <Box className="flex justify-center mt-4">
          <a href="#!" className="text-white mx-2">Privacy Policy</a>
          <a href="#!" className="text-white mx-2">Terms of Service</a>
          <a href="#!" className="text-white mx-2">Contact Us</a>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
