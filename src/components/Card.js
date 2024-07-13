import React from 'react';

const Card = ({ title, description, buttonText, backgroundImage }) => {
  return (
    <div 
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between h-full bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="p-6 bg-black bg-opacity-50">
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-gray-200 text-base">{description}</p>
      </div>
      <div className="flex justify-center p-4 bg-black bg-opacity-50">
        <button className="bg-blue-500 text-white rounded-full px-6 py-2">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
