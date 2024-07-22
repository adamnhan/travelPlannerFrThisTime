import React from 'react';
import SignUp from '../components/SignUp';
import SignOut from '../components/SignOut';
import SignIn from '../components/SignIn';
import GoogleSignIn from '../components/GoogleSignIn';

const LoginPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <GoogleSignIn /> {/* Add GoogleSignIn button */}
            <SignUp />
            <SignIn />
            <SignOut />
        </div>
  );
};

export default LoginPage;