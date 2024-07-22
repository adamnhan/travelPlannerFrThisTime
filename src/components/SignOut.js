// src/SignOut.js
import React from 'react';
import { auth } from './firebase';

const SignOut = () => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      alert('Signed out successfully!');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
      Sign Out
    </button>
  );
};

export default SignOut;
