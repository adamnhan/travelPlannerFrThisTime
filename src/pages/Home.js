import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import Slideshow from '../components/Slideshow';
import Card from '../components/Card';
import img1 from '../materials/cardimg1.jpg';
import img2 from '../materials/cardimg2.jpg';
import img3 from '../materials/cardimg3.jpg';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <Box>
      <Box className="relative w-full mx-auto h-screen overflow-hidden mt-10 px-10"> {/* Added padding */}
        <Slideshow />
        <Box className='absolute inset-0 z-10'>
            <Box className='absolute top-0 left-0 p-4'>
                <h1 className='text-9xl font-bold text-gray-800 pl-10 pt-10'>Trip <span className='bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent'>Planning</span></h1>
            </Box>
            <Box className='absolute bottom-0 right-0 p-4'>
                <h1 className='text-9xl font-bold text-white pr-10 pb-10'>Just Got <span className='bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent'>Easier.</span></h1>
            </Box>
          <Link to="/login">
            <Button
              className='absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-600 to-blue-500 text-white rounded-full px-10 py-4 text-xl'
              style={{ top: '50%', zIndex: 11 }}
            >
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
      {/* Card Section */}
      <Box className="mt-8 px-4 py-10">
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className=''
            title="Activites"
            description="Get the best deals on activies. Book now!"
            buttonText="View Deals"
            backgroundImage={img1}
          />
          <Card
            title="Flights"
            description="Get the best deals on flights. Book now!"
            buttonText="View Deals"
            backgroundImage={img2}
          />
          <Card
            title="Hotels"
            description="Get the best deals on hotels. Book now!"
            buttonText="View Deals"
            backgroundImage={img3}
          />
        </Box>
      </Box>
      <Box className="flex flex-col md:flex-row mt-12 px-4">
        <Box className="md:w-1/3 pl-40 pb-10 border-4 border-blue-500 p-4 rounded-lg">
          <h2 className="text-4xl font-bold mb-10">What is Travel Planner?</h2>
          <p className="text-gray-700 text-xl pr-4">
            Ever had trouble getting your trip out of the groupchat? We know we have.
            We built this website to streamline travel planning all in one place.
            Travel planner's signature feature is a collaborative event planner which allows you
            to see all your events, flights, and hotel bookings in one application. 
            No more planning trips on shared documents, spreadsheets or calendars. Travel
            Planner lets you do all of that with your friends with our voting system. We're
            Expedia, Google Calendar, and Spreadsheets all in one!
          </p>
        </Box>
        <Box className="md:w-1/2 p-4 flex justify-center items-center">
          <img src="path/to/your/image.jpg" alt="" className="w-full h-auto rounded-lg shadow-md" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;


