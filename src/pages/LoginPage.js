import React from 'react';
import SignUp from '../components/SignUp';
import SignOut from '../components/SignOut';
import SignIn from '../components/SignIn';
import GoogleSignIn from '../components/GoogleSignIn';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/dashboard');
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <GoogleSignIn onSuccess={handleLoginSuccess} /> {/* Add GoogleSignIn button */}
            <SignUp onSuccess={handleLoginSuccess}/>
            <SignIn onSuccess={handleLoginSuccess}/>
            <SignOut />
        </div>
  );
};

export default LoginPage;