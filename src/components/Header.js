import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box className="bg-white p-4 mb-4 shadow-md">
      <Flex className="max-w-screen-xl mx-auto justify-between items-center">
        <Text fontSize="2xl" color="gray">Travel Planner</Text>
        <Flex gap={200}>
          <Button as={Link} to="/" variant="link" className="text-black">
            Home
          </Button>
          <Button as={Link} to="/dashboard" variant="link" className="text-black">
            Dashboard
          </Button>
          <Button as={Link} to="/bookings" variant="link" className="text-black">
            Bookings
          </Button>
          <Button as={Link} to="/about" variant="link" className="text-black">
            About
          </Button>
          <Button as={Link} to="/contact" variant="link" className="text-black">
            Contact
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;


