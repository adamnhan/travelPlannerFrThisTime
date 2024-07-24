// src/components/GoogleSignIn.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth'; // Import signInWithPopup
import { auth, googleProvider } from './firebase'; // Import auth and googleProvider

const GoogleSignIn = ({ onSuccess }) => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed in with Google successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="bg-red-500 text-white px-4 py-2 rounded">
      Sign In with Google
    </button>
  );
};

export default GoogleSignIn;
