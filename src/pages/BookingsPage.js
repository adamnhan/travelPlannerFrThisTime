import React, { useState } from 'react';
import Modal from 'react-modal';
import FlightSearch from '../components/FlightSearch'; // Adjust the import path as needed

// Setting the modal root element for accessibility
Modal.setAppElement('#root');

const BookingsPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-6">
      <div className="w-full text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bookings Page</h1>
      </div>
      <button 
        className="bg-white text-gray-800 border-2 border-gray-800 px-6 py-2 text-lg font-bold rounded-md hover:bg-gray-800 hover:text-white transition duration-300"
        onClick={openModal}
      >
        Flights
      </button>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%',
            zIndex: 1001,
          },
        }}
      >
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <button 
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Close
          </button>
          <FlightSearch
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BookingsPage;

