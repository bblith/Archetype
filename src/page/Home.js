import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  return (
    <div>
      <nav>
        <p>Welcome Home</p>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Home;
