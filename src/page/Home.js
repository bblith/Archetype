import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Ensure you have a separate CSS file for Home

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
    <div className="home-container">
      <nav className="home-nav">
        <p>Welcome Home</p>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Home;
