import React, { useState } from 'react';
import TripCard from '../components/Card'; // Adjust the import path as needed
import Modal from 'react-modal'; // Import a modal library

// Setting the modal root element for accessibility
Modal.setAppElement('#root');

const TripDashboard = () => {
  const [trips, setTrips] = useState([
    { id: 1, name: 'Trip to Paris', description: 'A wonderful trip to Paris', backgroundImage: 'path/to/paris.jpg' },
    { id: 2, name: 'Weekend in New York', description: 'A weekend trip to New York', backgroundImage: 'path/to/ny.jpg' }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({ name: '', description: '', backgroundImage: '' });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewTrip({ ...newTrip, backgroundImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleCreateTrip = () => {
    setTrips([...trips, { ...newTrip, id: trips.length + 1 }]);
    setNewTrip({ name: '', description: '', backgroundImage: '' });
    closeModal();
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-6">
      <div className="w-full text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome user!</h1>
      </div>
      <button 
        className="bg-white text-gray-800 border-2 border-gray-800 px-6 py-2 text-lg font-bold rounded-md hover:bg-gray-800 hover:text-white transition duration-300 mb-6"
        onClick={openModal}
      >
        Create Trip
      </button>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map(trip => (
          <TripCard 
            key={trip.id}
            title={trip.name}
            description={trip.description}
            buttonText="View Trip"
            backgroundImage={trip.backgroundImage}
          />
        ))}
      </div>

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
          <h2 className="text-2xl font-bold mb-4">Create a New Trip</h2>
          <input 
            type="text"
            name="name"
            value={newTrip.name}
            onChange={handleInputChange}
            placeholder="Trip Name"
            className="border p-2 mb-4 w-full"
          />
          <textarea
            name="description"
            value={newTrip.description}
            onChange={handleInputChange}
            placeholder="Trip Description"
            className="border p-2 mb-4 w-full"
          />
          <input 
            type="file"
            name="backgroundImage"
            onChange={handleFileChange}
            className="mb-4"
          />
          <div className="flex justify-end">
            <button 
              onClick={handleCreateTrip}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
            <button 
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TripDashboard;
