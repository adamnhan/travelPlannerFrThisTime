// src/SignUp.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUp = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      await updateProfile(user, {
        displayName: firstName
      });
      
      alert('Account created successfully!');
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label htmlFor='firstName' className='block text-gray-700'>First Name:</label>
          <input
            type='text'
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div>
          <label htmlFor='lastName' className='block text-gray-700'>Last Name:</label>
          <input
            type='text'
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor='confirmPassword' className='block text-gray-700'>Confirm Password:</label>
          <input
            type='password'
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
